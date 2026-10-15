import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
  const [devis, setDevis] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('devis')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setDevis(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Demandes de devis</h1>
      {loading && <p>Chargement…</p>}
      {!loading && devis.length === 0 && <p>Aucune demande.</p>}
      {devis.map(d => (
        <div key={d.id} style={{ border: '1px solid #333', borderRadius: '6px', padding: '1.2rem', marginBottom: '1rem' }}>
          <p><strong>{d.nom}</strong> — <a href={`mailto:${d.email}`}>{d.email}</a></p>
          <p style={{ color: '#e07b2a', fontSize: '.85rem', margin: '.3rem 0' }}>{d.prestation}</p>
          <p style={{ margin: 0 }}>{d.message}</p>
          <p style={{ fontSize: '.75rem', color: '#888', marginTop: '.5rem' }}>{new Date(d.created_at).toLocaleString('fr-FR')}</p>
        </div>
      ))}
    </div>
  )
}