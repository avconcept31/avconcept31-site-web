import Database from 'better-sqlite3'
import path from 'path'

const DB_PATH = path.join('/home/alain/data', 'devis.db')

function getDb() {
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
  return db
}

export default function handler(req, res) {
  const db = getDb()

  // GET — liste toutes les demandes
  if (req.method === 'GET') {
    const rows = db.prepare(
      'SELECT * FROM devis ORDER BY created_at DESC'
    ).all()
    return res.status(200).json(rows)
  }

  // DELETE — supprime une demande par id
  if (req.method === 'DELETE') {
    const { id } = req.query
    db.prepare('DELETE FROM devis WHERE id = ?').run(id)
    return res.status(200).json({ success: true })
  }

  // PATCH — toggle traite
  if (req.method === 'PATCH') {
    const { id } = req.query
    const { traite } = req.body
    db.prepare('UPDATE devis SET traite = ? WHERE id = ?').run(traite ? 1 : 0, id)
    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ error: 'Méthode non autorisée' })
}