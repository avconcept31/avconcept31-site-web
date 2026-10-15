import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { nom, email, prestation, message } = req.body

  const { error } = await supabase
    .from('devis')
    .insert([{ nom, email, prestation, message }])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true })
}