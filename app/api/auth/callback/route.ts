import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        const errorScript = `
            <!DOCTYPE html>
            <html>
            <head><title>Auth Error</title></head>
            <body>
                <script>
                    if (window.opener) {
                        window.opener.postMessage("authorization:github:error:{\\"error\\":\\"No code provided\\"}", "*");
                    }
                    window.close();
                </script>
            </body>
            </html>
        `;
        return new NextResponse(errorScript, { 
            status: 400, 
            headers: { "Content-Type": "text/html" } 
        });
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
        
        if (!body.access_token) {
            throw new Error('No access token received');
        }

        const content = {
            token: body.access_token,
            provider: 'github',
        };

        // Format exactly as Decap CMS expects
        const contentStr = JSON.stringify(content).replace(/"/g, '\\"');
        const message = `authorization:github:success:${contentStr}`;

        const successScript = `
            <!DOCTYPE html>
            <html>
            <head><title>Authorization Successful</title></head>
            <body>
                <p>Authorization successful. This window will close automatically.</p>
                <script>
                    (function() {
                        console.log('Sending auth success to Decap CMS...');
                        
                        function sendMessage() {
                            if (window.opener && !window.opener.closed) {
                                try {
                                    window.opener.postMessage("${message}", "*");
                                    console.log('Message sent successfully');
                                    return true;
                                } catch (e) {
                                    console.error('Failed to send message:', e);
                                    return false;
                                }
                            }
                            return false;
                        }
                        
                        // Try to send immediately
                        if (sendMessage()) {
                            setTimeout(function() { window.close(); }, 100);
                        } else {
                            // Retry a few times if opener isn't ready
                            let attempts = 0;
                            const retry = setInterval(function() {
                                attempts++;
                                if (sendMessage() || attempts >= 10) {
                                    clearInterval(retry);
                                    setTimeout(function() { window.close(); }, 100);
                                }
                            }, 100);
                        }
                    })();
                </script>
            </body>
            </html>
        `;

        return new NextResponse(successScript, {
            status: 200,
            headers: { "Content-Type": "text/html" },
        });

    } catch (err) {
        console.error('OAuth callback error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        const errorScript = `
            <!DOCTYPE html>
            <html>
            <head><title>Auth Error</title></head>
            <body>
                <script>
                    if (window.opener) {
                        window.opener.postMessage("authorization:github:error:{\\"error\\":\\"${errorMessage.replace(/"/g, '\\"')}\\"}", "*");
                    }
                    window.close();
                </script>
            </body>
            </html>
        `;
        return new NextResponse(errorScript, {
            status: 500,
            headers: { "Content-Type": "text/html" },
        });
    }
}