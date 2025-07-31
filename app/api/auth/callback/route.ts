import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const code = searchParams.get('code');
    if (!code) {
        return new NextResponse(
            `<script>window.opener.postMessage("authorization:github:error:{\\"error\\":\\"No code provided\\"}","*");window.close();</script>`,
            { status: 400, headers: { "Content-Type": "text/html" } }
        );
    }

    const data: Record<string, string> = {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    };

    try {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!tokenRes.ok) {
            throw new Error(`HTTP error! status: ${tokenRes.status}`);
        }

        const body = await tokenRes.json();
        const content = {
            token: body.access_token,
            provider: 'github',
        };

        const script = `
          <script>
            const receiveMessage = (message) => {
              window.opener.postMessage(
                'authorization:${content.provider}:success:${JSON.stringify(content)}',
                message.origin
              );
              window.removeEventListener("message", receiveMessage, false);
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:${content.provider}", "*");
          </script>
        `;

        return new NextResponse(script, {
            status: 200,
            headers: { "Content-Type": "text/html" },
        });
    } catch (err) {
        return new NextResponse('<script>window.close();</script>', {
            status: 500,
            headers: { "Content-Type": "text/html" },
        });
    }
} 