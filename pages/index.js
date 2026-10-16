import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  function copy(text, btn) {
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement('textarea')
      el.value = text
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }).finally(() => {
      btn.textContent = 'Copié !'
      btn.classList.add('copied')
      setTimeout(() => { btn.textContent = 'Copier'; btn.classList.remove('copied') }, 2000)
    })
  }

  const [form, setForm] = useState({ nom: '', email: '', prestation: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'ok' | 'error'

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      setForm({ nom: '', email: '', prestation: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Head>
        <title>AvConcept31 — Électronique sur mesure, Impression 3D, Informatique</title>
        <meta name="description" content="Microcontrôleurs, cartes PCB, impression 3D et dépannage informatique en Haute-Garonne (31). Alain Vidal — AvConcept31." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300&display=swap" rel="stylesheet" />
      </Head>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="46" viewBox="0 0 280 62">
    <text fontFamily="Syne, sans-serif" fontWeight="800" fontSize="36" fill="currentColor" x="0" y="36" letterSpacing="-1">Av</text>
    <text fontFamily="Syne, sans-serif" fontWeight="700" fontSize="36" fill="currentColor" x="52" y="36" letterSpacing="-1">Concept</text>
    <text fontFamily="Syne, sans-serif" fontWeight="800" fontSize="36" fill="#e07b2a" x="224" y="36">31</text>
    <line x1="224" y1="44" x2="258" y2="44" stroke="#e07b2a" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="258" y1="44" x2="258" y2="54" stroke="#e07b2a" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="258" y1="54" x2="270" y2="54" stroke="#e07b2a" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="270" cy="54" r="6" fill="#e07b2a"/>
    <circle cx="270" cy="54" r="2.5" fill="#0f0f0f"/>
  </svg>
</a>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#realisations">Réalisations</a></li>
            <li><a href="#experience">Expérience</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#projets">Vos projets</a></li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-inner">
          <div>
            <p className="hero-eyebrow">Électronique · Impression 3D · Informatique</p>
            <h1>Conception sur mesure,<br /><em>du circuit à la pièce</em></h1>
            <p className="hero-lead">
              Microcontrôleurs, cartes électroniques, prototypes imprimés en 3D,
              dépannage informatique et surveillance IP — un technicien expérimenté
              en Haute-Garonne (31).
            </p>
            <a href="#contact" className="hero-cta">
              Prendre contact
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="hero-photo-wrap">
            <span className="hero-photo-label">Atelier</span>
            <img className="hero-photo-main" src="/images/coffret.jpg" alt="Coffret électronique câblé AvConcept31 — Arduino Nano, relais, connectique" />
            <img className="hero-photo-badge" src="/images/cnc.jpg" alt="Gravure PCB sur CNC" />
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="section-inner">
          <h2 className="section-title">Mes services</h2>
          <div className="section-rule" aria-hidden="true" />
          <div className="services-grid">

            <div className="service-item">
              <img className="service-photo" src="/images/pcb-logiciel.jpg" alt="PCB en cours de conception sous Sprint Layout" />
              <svg className="service-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="4" y="10" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <line x1="4" y1="17" x2="36" y2="17" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="10" cy="13.5" r="1.5" fill="currentColor"/>
                <path d="M10 24 H22 M10 28 H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M25 22 L28 25 L25 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="service-name">Programmation de microcontrôleurs</h3>
              <p className="service-desc">En C++ ou Python, depuis le cahier des charges jusqu&apos;à l&apos;injection du programme dans la puce. Tests en atelier de prototypage inclus.</p>
            </div>

            <div className="service-item">
              <img className="service-photo" src="/images/pcb-assemble.jpg" alt="Carte électronique assemblée dans son coffret blanc" />
              <svg className="service-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="6" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="13" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="13" cy="18" r=".8" fill="currentColor"/>
                <path d="M18 14 H30 M18 18 H28 M18 22 H25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M10 28 V34 M20 28 V34 M30 28 V34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="6" y1="34" x2="34" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <h3 className="service-name">Fabrication de cartes électroniques</h3>
              <p className="service-desc">Développement du circuit imprimé, câblage et mise en coffret pour installation sur site. Du prototype au produit fini.</p>
            </div>

            <div className="service-item">
              <img className="service-photo" src="/images/anemometre.jpg" alt="Anémomètre WiFi imprimé en 3D avec LED bleue" />
              <svg className="service-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M8 30 L20 10 L32 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 24 H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 34 H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="20" r="2" fill="currentColor"/>
              </svg>
              <h3 className="service-name">Impression 3D sur demande</h3>
              <p className="service-desc">Pièces conçues en CAO et imprimées sur mesure — boîtiers, supports, composants mécaniques. Liées à vos projets ou indépendantes.</p>
            </div>

            <div className="service-item">
              <img className="service-photo" src="/images/laptop.jpg" alt="Laptop ouvert en cours de réparation informatique" />
              <svg className="service-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect x="6" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="10" y="22" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M14 20 V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="28" cy="10" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M26 10 L27.5 11.5 L30.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="service-name">Informatique et surveillance IP</h3>
              <p className="service-desc">Dépannage, assemblage de serveurs et stations de travail, configuration Linux / Windows / macOS, imprimantes, caméras IP.</p>
            </div>

          </div>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section className="section section-alt" id="realisations">
        <div className="section-inner">
          <h2 className="section-title">Quelques réalisations</h2>
          <div className="section-rule" aria-hidden="true" />
          <p style={{fontSize:'.95rem', color:'var(--fg-soft)', maxWidth:'58ch', marginBottom:'.5rem'}}>
            Chaque projet est conçu, câblé et testé en atelier avant livraison.
          </p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/coffret.jpg" alt="Coffret électronique avconcept31 câblé" />
              <span className="gallery-item-label">Coffret câblé</span>
            </div>
            <div className="gallery-item">
              <img src="/images/pcb-assemble.jpg" alt="PCB assemblé dans coffret blanc" />
              <span className="gallery-item-label">PCB sur mesure</span>
            </div>
            <div className="gallery-item">
              <img src="/images/cad-moteur.jpg" alt="Rendu CAO — support moteur imprimé 3D" />
              <span className="gallery-item-label">CAO & 3D</span>
            </div>
            <div className="gallery-item">
              <img src="/images/pompe.jpg" alt="Rendu CAO — assemblage pompe/vanne" />
              <span className="gallery-item-label">Assemblages</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPÉRIENCE */}
      <section className="section" id="experience">
        <div className="section-inner">
          <h2 className="section-title">Expérience</h2>
          <div className="section-rule" aria-hidden="true" />
          <div className="xp-block">
            <span className="xp-year">Passé</span>
            <div className="xp-text">
              <strong>Technicien systèmes informatiques &amp; photocopieurs</strong>
              Longue expérience au sein d&apos;une grande entreprise, en maintenance de systèmes informatiques et de photocopieurs professionnels.
            </div>
          </div>
          <div className="xp-block">
            <span className="xp-year">Depuis</span>
            <div className="xp-text">
              <strong>Électronique embarquée sur mesure</strong>
              Conception de cartes PCB, programmation de microcontrôleurs Arduino, ESP8266, PIC et autres — en C++ et Python. Atelier de prototypage et de test.
            </div>
          </div>
          <div className="xp-block">
            <span className="xp-year">Continu</span>
            <div className="xp-text">
              <strong>Impression 3D &amp; fabrication numérique</strong>
              Parc de machines modifiées, conception CAO intégrée, réalisations variées (domotique, instrumentation, pièces mécaniques).
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-band" id="contact">
        <div className="contact-inner">
          <div>
            <h2 className="contact-title">Parlons de votre projet</h2>
            <div className="contact-rule" aria-hidden="true" />
            <p className="contact-lead">
              Un besoin en électronique sur mesure, une pièce à imprimer,
              un dépannage informatique ? Contactez-moi directement.
            </p>
          </div>
          <div className="contact-items">
            <div className="contact-item">
              <svg className="contact-item-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M3 8l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <div>
                <span className="contact-label">E-mail</span>
                <span className="contact-value">avconcept31@gmail.com</span>
                <button className="copy-btn" onClick={e => copy('avconcept31@gmail.com', e.currentTarget)}>Copier</button>
              </div>
            </div>
            <div className="contact-item">
              <svg className="contact-item-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5.5A1.5 1.5 0 014.5 4h1.379a1 1 0 01.958.713l.849 2.546a1 1 0 01-.23 1.025L6.3 9.3a11.04 11.04 0 004.4 4.4l1.016-1.156a1 1 0 011.025-.23l2.546.849A1 1 0 0116 14.12V15.5A1.5 1.5 0 0114.5 17C8.149 17 3 11.851 3 5.5z" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              <div>
                <span className="contact-label">Téléphone</span>
                <span className="contact-value">07 89 61 56 19</span>
                <button className="copy-btn" onClick={e => copy('0789615619', e.currentTarget)}>Copier</button>
                <p className="contact-hours">Lundi – Vendredi · 9h–12h / 14h–18h</p>
              </div>
            </div>
            <div className="contact-item">
              <svg className="contact-item-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              <div>
                <span className="contact-label">Zone d&apos;intervention</span>
                <span className="contact-value">Odars (31450) — Haute-Garonne</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOS PROJETS */}
      <section className="section" id="projets">
        <div className="section-inner">
          <h2 className="section-title">Vos projets</h2>
          <div className="section-rule" aria-hidden="true" />
          <p style={{fontSize:'.95rem', color:'var(--fg-soft)', maxWidth:'58ch', marginBottom:'2rem'}}>
            Une idée, un projet à concrétiser ? Décrivez-le, je vous réponds rapidement.
          </p>

          {status === 'ok' ? (
            <p style={{color:'#4caf50', fontFamily:'Syne, sans-serif', fontWeight:'600'}}>
              ✓ Message envoyé ! Je vous recontacte rapidement.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'1.2rem', maxWidth:'560px'}}>
              <div style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
                <div style={{flex:'1', minWidth:'200px', display:'flex', flexDirection:'column', gap:'.4rem'}}>
                  <label htmlFor="nom" style={{fontSize:'.8rem', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg-soft)'}}>Nom *</label>
                  <input
                    id="nom"
                    type="text"
                    required
                    value={form.nom}
                    onChange={e => setForm({...form, nom: e.target.value})}
                    style={{padding:'.65rem .9rem', border:'1px solid var(--border)', borderRadius:'4px', background:'var(--bg)', color:'var(--fg)', fontSize:'1rem'}}
                  />
                </div>
                <div style={{flex:'1', minWidth:'200px', display:'flex', flexDirection:'column', gap:'.4rem'}}>
                  <label htmlFor="email" style={{fontSize:'.8rem', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg-soft)'}}>E-mail *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    style={{padding:'.65rem .9rem', border:'1px solid var(--border)', borderRadius:'4px', background:'var(--bg)', color:'var(--fg)', fontSize:'1rem'}}
                  />
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:'.4rem'}}>
                <label htmlFor="prestation" style={{fontSize:'.8rem', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg-soft)'}}>Type de projet</label>
                <select
                  id="prestation"
                  value={form.prestation}
                  onChange={e => setForm({...form, prestation: e.target.value})}
                  style={{padding:'.65rem .9rem', border:'1px solid var(--border)', borderRadius:'4px', background:'var(--bg)', color:'var(--fg)', fontSize:'1rem'}}
                >
                  <option value="">— Choisir —</option>
                  <option value="Électronique / PCB">Électronique / PCB</option>
                  <option value="Programmation microcontrôleur">Programmation microcontrôleur</option>
                  <option value="Impression 3D">Impression 3D</option>
                  <option value="Informatique / Dépannage">Informatique / Dépannage</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:'.4rem'}}>
                <label htmlFor="message" style={{fontSize:'.8rem', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg-soft)'}}>Votre projet *</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  style={{padding:'.65rem .9rem', border:'1px solid var(--border)', borderRadius:'4px', background:'var(--bg)', color:'var(--fg)', fontSize:'1rem', resize:'vertical'}}
                />
              </div>

              {status === 'error' && (
                <p style={{color:'#e53935', fontSize:'.9rem', margin:0}}>
                  Une erreur s&apos;est produite. Réessayez ou contactez-moi par e-mail.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="hero-cta"
                style={{alignSelf:'flex-start'}}
              >
                {status === 'sending' ? 'Envoi…' : 'Envoyer'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <p className="footer-copy">© 2026 AvConcept31 — Alain Vidal</p>
          <ul className="footer-links">
            <li><a href="/legal">Mentions légales</a></li>
            <li><a href="#">Confidentialité</a></li>
          </ul>
        </div>
      </footer>
    </>
  )
}
