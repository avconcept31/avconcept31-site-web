import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const MOT_DE_PASSE = 'Nod2026$!.'  // ← change ici

export default function Admin() {
  const [auth, setAuth]       = useState(false)
  const [input, setInput]     = useState('')
  const [erreur, setErreur]   = useState(false)
  const [devis, setDevis]     = useState([])
  const [loading, setLoading] = useState(true)

  // Chargement des demandes depuis Supabase
  async function load() {
    setLoading(true)
    const { data, error } = await supabase
      .from('devis')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setDevis(data)
    setLoading(false)
  }

  useEffect(() => {
    if (auth) load()
  }, [auth])

  // Vérification mot de passe
  function login(e) {
    e.preventDefault()
    if (input === MOT_DE_PASSE) {
      setAuth(true)
      setErreur(false)
    } else {
      setErreur(true)
    }
  }

  // Suppression d'une demande
  async function supprimer(id) {
    if (!confirm('Supprimer cette demande ?')) return
    const { error } = await supabase.from('devis').delete().eq('id', id)
    if (!error) setDevis(prev => prev.filter(d => d.id !== id))
  }

  // Toggle traité / non traité
  // Nécessite une colonne "traite" boolean dans la table Supabase.
  // Si elle n'existe pas encore : ALTER TABLE devis ADD COLUMN traite boolean DEFAULT false;
  async function toggleTraite(id, valeurActuelle) {
    const { error } = await supabase
      .from('devis')
      .update({ traite: !valeurActuelle })
      .eq('id', id)
    if (!error) setDevis(prev =>
      prev.map(d => d.id === id ? { ...d, traite: !valeurActuelle } : d)
    )
  }

  // --- Écran de connexion ---
  if (!auth) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0e1520', fontFamily: 'system-ui'
      }}>
        <form onSubmit={login} style={{
          background: '#1a2332', padding: '2rem', borderRadius: '8px',
          display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '280px'
        }}>
          <h2 style={{ color: '#e8dfc8', margin: 0 }}>Admin</h2>
          <input
            type="password"
            placeholder="Mot de passe"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{
              padding: '.6rem .8rem', borderRadius: '4px',
              border: erreur ? '1px solid #e05a2a' : '1px solid #334',
              background: '#0e1520', color: '#e8dfc8', fontSize: '1rem'
            }}
          />
          {erreur && <p style={{ color: '#e05a2a', margin: 0, fontSize: '.85rem' }}>Mot de passe incorrect</p>}
          <button type="submit" style={{
            background: '#b87333', color: '#fff', border: 'none',
            padding: '.65rem', borderRadius: '4px', cursor: 'pointer',
            fontWeight: '700', fontSize: '.95rem'
          }}>Accéder</button>
        </form>
      </div>
    )
  }

  // --- Interface admin ---
  return (
    <div style={{
      padding: '2rem', fontFamily: 'system-ui',
      maxWidth: '900px', margin: '0 auto',
      background: '#0e1520', minHeight: '100vh', color: '#e8dfc8'
    }}>
      <h1 style={{ marginBottom: '.5rem' }}>Demandes de devis</h1>
      <p style={{ color: '#8a9ab0', marginBottom: '1.5rem', fontSize: '.85rem' }}>
        {devis.length} demande{devis.length !== 1 ? 's' : ''}
      </p>

      {loading && <p>Chargement…</p>}
      {!loading && devis.length === 0 && <p>Aucune demande.</p>}

      {devis.map(d => (
        <div key={d.id} style={{
          border: d.traite ? '1px solid #2a4a2a' : '1px solid #4a3a2a',
          borderRadius: '6px', padding: '1.2rem', marginBottom: '1rem',
          background: d.traite ? '#1a2a1a' : '#1a2332',
          opacity: d.traite ? 0.65 : 1
        }}>
          {/* En-tête */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '.5rem' }}>
            <div>
              <p style={{ margin: 0, fontWeight: '700' }}>{d.nom}</p>
              <a href={`mailto:${d.email}`} style={{ color: '#b87333', fontSize: '.85rem' }}>{d.email}</a>
            </div>
            <p style={{ fontSize: '.75rem', color: '#8a9ab0', margin: 0 }}>
              {new Date(d.created_at).toLocaleString('fr-FR')}
            </p>
          </div>

          {/* Prestation */}
          <p style={{ color: '#d4934a', fontSize: '.85rem', margin: '.6rem 0 .4rem' }}>{d.prestation}</p>

          {/* Message */}
          <p style={{ margin: '0 0 1rem', lineHeight: 1.6 }}>{d.message}</p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '.75rem' }}>
            <button
              onClick={() => toggleTraite(d.id, d.traite)}
              style={{
                background: d.traite ? '#2a4a2a' : '#1e3a1e',
                color: d.traite ? '#5cb85c' : '#8a9ab0',
                border: '1px solid currentColor',
                padding: '.3rem .8rem', borderRadius: '4px',
                cursor: 'pointer', fontSize: '.8rem', fontWeight: '600'
              }}
            >
              {d.traite ? '✓ Traité' : 'Marquer traité'}
            </button>
            <button
              onClick={() => supprimer(d.id)}
              style={{
                background: 'transparent', color: '#e05a2a',
                border: '1px solid #e05a2a',
                padding: '.3rem .8rem', borderRadius: '4px',
                cursor: 'pointer', fontSize: '.8rem', fontWeight: '600'
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}