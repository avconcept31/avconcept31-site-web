import Database from 'better-sqlite3'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

// Dossier data hors repo, persistent même après git pull
const DATA_DIR = '/home/alain/data'
const DB_PATH  = path.join(DATA_DIR, 'devis.db')

// Crée le dossier si besoin
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

// Ouvre (ou crée) la base et crée la table si elle n'existe pas encore
const db = new Database(DB_PATH)
db.exec(`
  CREATE TABLE IF NOT EXISTS devis (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nom        TEXT,
    email      TEXT,
    prestation TEXT,
    message    TEXT,
    traite     INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )
`)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { nom, email, prestation, message } = req.body

  // 1. Enregistrement SQLite
  try {
    db.prepare(
      'INSERT INTO devis (nom, email, prestation, message) VALUES (?, ?, ?, ?)'
    ).run(nom, email, prestation, message)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }

  // 2. Envoi mail (inchangé)
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