import { supabase } from '../../lib/supabase'
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { nom, email, prestation, message } = req.body

  // 1. Enregistrement Supabase
  const { error } = await supabase
    .from('devis')
    .insert([{ nom, email, prestation, message }])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  // 2. Envoi mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: `"AvConcept31" <${process.env.MAIL_USER}>`,
    to: 'avconcept31@gmail.com',
    subject: `Nouveau message — ${prestation || 'Sans catégorie'}`,
    text: `Nom : ${nom}\nEmail : ${email}\nProjet : ${prestation}\n\n${message}`,
  })

  return res.status(200).json({ success: true })
}
