import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: any, res: any) {
if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' })
}

try {
const { email } = req.body

const data = await resend.emails.send({
  from: 'Fasade <hello@fasade.online>',
  to: [email],
  subject: 'Thank you for helping build Fasade 💜',
  html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">
      <h1>Thank you 💜</h1>

      <p>
        We just received your survey response.
      </p>

      <p>
        Most people join waitlists and disappear.
        You took the extra step to tell us what you actually want.
      </p>

      <p>
        We're personally reviewing responses and using them to decide what Fasade builds first.
      </p>

      <p>
        As an early supporter you'll receive:
      </p>

      <ul>
        <li>Early beta access</li>
        <li>Founder updates</li>
        <li>Feature previews</li>
        <li>Launch invitations</li>
      </ul>

      <p>
        We'll keep you posted as we build.
      </p>

      <p>
        — Team Fasade
      </p>
    </div>
  `,
})

return res.status(200).json(data)

} catch (error) {
return res.status(500).json({ error })
}
}