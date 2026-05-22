import CharacterCrud from './characterCrud'
import MonsterCrud from './monstercrud.tsx'
import SpellSearch from './spellsearch' // Importa a nova tela de magias
import './App.css'

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.5rem', marginBottom: '10px' }}>⚔️ EpicForge Dashboard</h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>Ambiente de Desenvolvimento - Qualidade de Software</p>
        <hr style={{ border: '0', borderTop: '2px solid #eee', marginTop: '20px' }} />
      </header>

      <main>
        {/* Tela 1: Personagens */}
        <section style={{ marginBottom: '40px' }}>
          <CharacterCrud />
        </section>

        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '40px 0' }} />

        {/* Tela 2: Monstros */}
        <section style={{ marginBottom: '40px' }}>
          <MonsterCrud />
        </section>

        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '40px 0' }} />

        {/* Tela 3: Busca de Magias */}
        <section style={{ marginBottom: '40px' }}>
          <SpellSearch />
        </section>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '60px', color: '#bdc3c7', fontSize: '0.9rem' }}>
        <p>EpicForge © 2026 - Sprint 2</p>
      </footer>
    </div>
  )
}

export default App