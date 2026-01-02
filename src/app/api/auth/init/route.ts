// API Route: Initialize admin user
import { NextResponse } from 'next/server';
import { initializeAdminUser } from '@/lib/auth';

// GET /api/auth/init - Initialize admin user (via browser)
export async function GET() {
  try {
    const result = await initializeAdminUser();
    
    return new NextResponse(
      `<html>
        <head>
          <title>Admin Initialization</title>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              padding: 3rem;
              border-radius: 12px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              max-width: 500px;
              text-align: center;
            }
            .success { color: #10b981; font-size: 48px; margin-bottom: 1rem; }
            .error { color: #ef4444; font-size: 48px; margin-bottom: 1rem; }
            h1 { color: #1f2937; margin-bottom: 1rem; }
            p { color: #6b7280; line-height: 1.6; margin-bottom: 1.5rem; }
            .credentials { 
              background: #f3f4f6; 
              padding: 1rem; 
              border-radius: 8px; 
              margin: 1.5rem 0;
              text-align: left;
            }
            .credentials strong { color: #1f2937; }
            .credentials code { 
              background: #e5e7eb; 
              padding: 2px 6px; 
              border-radius: 4px; 
              font-family: monospace;
            }
            a {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              transition: background 0.3s;
            }
            a:hover { background: #5568d3; }
          </style>
        </head>
        <body>
          <div class="container">
            ${result.created ? `
              <div class="success">✅</div>
              <h1>Admin User Created!</h1>
              <p>Initial admin user has been successfully created.</p>
              <div class="credentials">
                <div><strong>Email:</strong> <code>${result.email}</code></div>
                <div style="margin-top: 0.5rem;"><strong>Password:</strong> <code>${process.env.ADMIN_PASSWORD}</code></div>
              </div>
              <p style="color: #ef4444; font-size: 14px;">⚠️ Please change the password after first login!</p>
            ` : `
              <div class="error">ℹ️</div>
              <h1>Admin Already Exists</h1>
              <p>Admin user is already initialized.</p>
              <div class="credentials">
                <div><strong>Email:</strong> <code>${result.email}</code></div>
              </div>
            `}
            <a href="/admin/login">Go to Login Page →</a>
          </div>
        </body>
      </html>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (error) {
    console.error('Init admin error:', error);
    
    return new NextResponse(
      `<html>
        <head>
          <title>Initialization Error</title>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              margin: 0;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }
            .container {
              background: white;
              padding: 3rem;
              border-radius: 12px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
              max-width: 500px;
              text-align: center;
            }
            .error { color: #ef4444; font-size: 48px; margin-bottom: 1rem; }
            h1 { color: #1f2937; margin-bottom: 1rem; }
            p { color: #6b7280; line-height: 1.6; }
            code {
              display: block;
              background: #fef2f2;
              color: #991b1b;
              padding: 1rem;
              border-radius: 8px;
              margin: 1rem 0;
              font-family: monospace;
              font-size: 14px;
              text-align: left;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error">❌</div>
            <h1>Initialization Failed</h1>
            <p>An error occurred while creating the admin user:</p>
            <code>${error instanceof Error ? error.message : 'Unknown error'}</code>
          </div>
        </body>
      </html>`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }
}

// POST /api/auth/init - Initialize admin user (via API)
export async function POST() {
  try {
    const result = await initializeAdminUser();
    return NextResponse.json({ 
      success: true, 
      message: result.created ? 'Admin user created' : 'Admin already exists',
      email: result.email,
      created: result.created
    });
  } catch (error) {
    console.error('Init admin error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
