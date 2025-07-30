import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

const callbackScriptResponse = (status: string, token: string) => {
    return new NextResponse(
        `
<html>
<head>
    <script>
        console.log('Direct approach - sending success immediately');
        
        function sendSuccessMessage() {
            if (window.opener && !window.opener.closed) {
                const authMessage = 'authorization:github:${status}:${JSON.stringify({ token })}';
                console.log('Sending:', authMessage);
                window.opener.postMessage(authMessage, '*');
                return true;
            }
            return false;
        }
        
        // Send immediately
        if (sendSuccessMessage()) {
            setTimeout(() => window.close(), 1000);
        } else {
            // Retry a few times
            let attempts = 0;
            const retry = setInterval(() => {
                attempts++;
                if (sendSuccessMessage() || attempts >= 5) {
                    clearInterval(retry);
                    setTimeout(() => window.close(), 1000);
                }
            }, 500);
        }
    </script>
</head>
<body>
    <p>Authorization successful!</p>
    <p>This window should close automatically...</p>
</body>
</html>
`,
        { headers: { 'Content-Type': 'text/html' } }
    );
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Handle OAuth errors (user denied access, etc.)
    if (error) {
        return callbackScriptResponse('error', JSON.stringify({ error }));
    }

    if (!code) {
        return callbackScriptResponse('error', JSON.stringify({ error: 'No code provided' }));
    }

    try {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 
                Accept: 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
        });

        if (!tokenRes.ok) {
            throw new Error(`HTTP error! status: ${tokenRes.status}`);
        }

        const body = await tokenRes.json();
        
        if (body.error) {
            throw new Error(body.error_description || body.error);
        }

        if (!body.access_token) {
            throw new Error('No access token received');
        }

        // Return success response with token
        return callbackScriptResponse('success', body.access_token);

    } catch (err) {
        console.error('OAuth callback error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return callbackScriptResponse('error', JSON.stringify({ error: errorMessage }));
    }
}