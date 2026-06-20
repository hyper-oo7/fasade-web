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
        <h1>Welcome to Fasade</h1>
        <p>You're officially on the waitlist.</p>
        <p>We'll let you know when we launch.</p>
      `
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error })
  }
}