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
      subject: 'Welcome to Fasade ✨',
      html: `
        <h1>Welcome to Fasade ✨</h1>
        <p>You're officially on the Fasade early access waitlist.</p>
        <p>We're building an AI beauty companion that helps you understand your skin, track progress, and improve your confidence through daily face analysis.</p>
        <p>As an early member you'll receive:</p>
        <ul>
        <li>Early beta access</li>
        <li>New feature previews</li>
        <li>Founder updates</li>
        <li>Special launch rewards</li>
        </ul>
        <p>Please fill the survey form on the website to help us build the best product for you.</p>
        <p>Your feedback will directly shape what we build next.</p>

        <p>
          <a
            href="https://www.fasade.online/#resarch"
            style="
              background:#e8b4b8;
              color:#ffffff;
              padding:12px 24px;
              text-decoration:none;
              border-radius:8px;
              display:inline-block;
              font-weight:bold;
            "
         >
           Fill Survey Now
          </a>
</p>
        <p>Thanks for joining us.</p>
        <p>— Team Fasade</p>
      `
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error })
  }
}