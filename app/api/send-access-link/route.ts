import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

async function sendViaSendGrid(to: string, magicLink: string) {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) throw new Error('SENDGRID_API_KEY not set')

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.10);">
        <tr>
          <td style="background:#0b1d3a;padding:36px;text-align:center;">
            <div style="display:inline-block;border:2px solid #fff;padding:10px 16px;border-radius:4px;">
              <span style="font-size:22px;font-weight:900;color:#fff;letter-spacing:2px;">BT</span>
            </div>
            <p style="color:rgba(255,255,255,0.65);font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:14px 0 0;">Bear Team Real Estate</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 48px;">
            <p style="font-size:18px;font-weight:700;color:#0b1d3a;margin:0 0 12px;">Your BearTeamOS access link is ready.</p>
            <p style="font-size:14px;color:#4b5563;line-height:1.7;margin:0 0 28px;">
              Click the button below to set up your account and access the Bear Team operating system.
              This link expires in 24 hours.
            </p>
            <div style="text-align:center;margin:0 0 28px;">
              <a href="${magicLink}" style="display:inline-block;background:#0b1d3a;color:#fff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:6px;text-decoration:none;">
                Access BearTeamOS →
              </a>
            </div>
            <p style="font-size:12px;color:#9ca3af;margin:0 0 4px;">
              ⚠️ Use your Bear Team email: <strong>FIRSTNAME@BearTeam.com</strong>
            </p>
            <p style="font-size:12px;color:#9ca3af;margin:0;">
              If you didn't request this, ignore this email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="border-top:1px solid #f3f4f6;padding:20px 48px;">
            <p style="font-size:12px;color:#9ca3af;margin:0;">
              Tom Songer · Team Lead · Bear Team Real Estate · Orlando, FL
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'thomas.songer@gmail.com', name: 'Tom Songer | Bear Team' },
      reply_to: { email: 'thomas.songer@gmail.com' },
      subject: 'Your BearTeamOS Access Link',
      content: [{ type: 'text/html', value: html }],
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`SendGrid error ${res.status}: ${body}`)
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const supabase = getAdminClient()

    // Generate magic link server-side — bypasses Supabase email rate limit entirely
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email.trim().toLowerCase(),
      options: {
        redirectTo: 'https://bearteam-os-dashboard.vercel.app/onboarding',
      },
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    const magicLink = data?.properties?.action_link
    if (!magicLink) return NextResponse.json({ error: 'Failed to generate link' }, { status: 500 })

    // Send via SendGrid — no rate limit
    await sendViaSendGrid(email.trim().toLowerCase(), magicLink)

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error('[send-access-link]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
