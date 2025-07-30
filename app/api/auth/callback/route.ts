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
        console.log('Callback loaded, status:', '${status}', 'token:', '${token ? 'present' : 'missing'}');
        
        let messageReceived = false;
        
        const receiveMessage = (message) => {
            console.log('Received message from parent:', message);
            if (messageReceived) return; // Prevent duplicate messages
            messageReceived = true;
            
            const authMessage = 'authorization:github:${status}:${JSON.stringify({ token })}';
            console.log('Sending message to parent:', authMessage);
            
            window.opener.postMessage(authMessage, '*');
            window.removeEventListener("message", receiveMessage, false);
            
            setTimeout(() => {
                console.log('Closing popup...');
                window.close();
            }, 500);
        }
        
        window.addEventListener("message", receiveMessage, false);
        
        // Send the authorizing message immediately
        console.log('Sending authorizing message...');
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage("authorizing:github", "*");
        } else {
            console.error('No opener window found!');
        }
        
        // FALLBACK: If no response after 3 seconds, send success anyway
        setTimeout(() => {
            if (!messageReceived) {
                console.log('No response from parent, sending success message anyway...');
                const authMessage = 'authorization:github:${status}:${JSON.stringify({ token })}';
                console.log('Fallback sending:', authMessage);
                
                if (window.opener && !window.opener.closed) {
                    window.opener.postMessage(authMessage, '*');
                }
                
                setTimeout(() => {
                    console.log('Fallback: Closing popup...');
                    window.close();
                }, 500);
            }
        }, 3000);
        
        // Final fallback: close after 10 seconds no matter what
        setTimeout(() => {
            console.log('Final timeout reached, closing popup');
            window.close();
        }, 10000);
    </script>
</head>
<body>
    <p>Authorizing Decap...</p>
    <p>Status: ${status}</p>
    <p>If this window doesn't close automatically, you can close it manually.</p>
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