import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const API = 'http://localhost:3333'

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🎲 EpicForge</h1>

      <p>
        Sistema Fullstack para gerenciamento de campanhas D&D 5e.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 20,
          marginTop: 20
        }}
      >
        <div
          style={{
            border: '1px solid gray',
            padding: 20,
            borderRadius: 10,
            width: 200
          }}
        >
          <h3>🧙 Characters</h3>
          <p>Crie e gerencie personagens.</p>
        </div>

        <div
          style={{
            border: '1px solid gray',
            padding: 20,
            borderRadius: 10,
            width: 200
          }}
        >
          <h3>👹 Monsters</h3>
          <p>Cadastre monstros customizados.</p>
        </div>

        <div
          style={{
            border: '1px solid gray',
            padding: 20,
            borderRadius: 10,
            width: 200
          }}
        >
          <h3>⚔️ Builds</h3>
          <p>Compartilhe builds públicas.</p>
        </div>
      </div>
    </div>
  )
}

function Characters() {
  const [characters, setCharacters] = useState<any[]>([])

  const [form, setForm] = useState({
    name: '',
    race: '',
    class: '',
    level: 1
  })

  async function loadCharacters() {
    const response = await fetch(`${API}/characters`)
    const data = await response.json()
    setCharacters(data)
  }

  async function createCharacter() {
    if (!form.name || !form.race || !form.class) {
      alert('Preencha todos os campos')
      return
    }

    await fetch(`${API}/characters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setForm({ name: '', race: '', class: '', level: 1 })
    loadCharacters()
  }

  async function deleteCharacter(id: string) {
    await fetch(`${API}/characters/${id}`, { method: 'DELETE' })
    loadCharacters()
  }

  useEffect(() => {
    loadCharacters()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>🧙 Characters</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Race"
          value={form.race}
          onChange={(e) => setForm({ ...form, race: e.target.value })}
        />
        <input
          placeholder="Class"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
        />
        <input
          type="number"
          placeholder="Level"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
        />
        <button onClick={createCharacter}>Create Character</button>
      </div>

      <hr />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {characters.map((character) => (
          <div
            key={character.id}
            style={{ border: '1px solid gray', padding: 15, borderRadius: 10, width: 200 }}
          >
            <h3>{character.name}</h3>
            <p><strong>Race:</strong> {character.race}</p>
            <p><strong>Class:</strong> {character.class}</p>
            <p><strong>Level:</strong> {character.level}</p>
            <button onClick={() => deleteCharacter(character.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Monsters() {
  const [monsters, setMonsters] = useState<any[]>([])

  const [form, setForm] = useState({
    name: '',
    type: '',
    cr: 1,
    hp: 10
  })

  async function loadMonsters() {
    const response = await fetch(`${API}/monsters`)
    const data = await response.json()
    setMonsters(data)
  }

  async function createMonster() {
    if (!form.name || !form.type) {
      alert('Preencha nome e tipo')
      return
    }

    await fetch(`${API}/monsters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setForm({ name: '', type: '', cr: 1, hp: 10 })
    loadMonsters()
  }

  async function deleteMonster(id: string) {
    await fetch(`${API}/monsters/${id}`, { method: 'DELETE' })
    loadMonsters()
  }

  useEffect(() => {
    loadMonsters()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>👹 Monsters</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Type (ex: Humanoide, Dragão)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Challenge Rating"
          value={form.cr}
          onChange={(e) => setForm({ ...form, cr: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="HP"
          value={form.hp}
          onChange={(e) => setForm({ ...form, hp: Number(e.target.value) })}
        />
        <button onClick={createMonster}>Create Monster</button>
      </div>

      <hr />

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {monsters.map((monster) => (
          <div
            key={monster.id}
            style={{ border: '1px solid gray', padding: 20, borderRadius: 10, width: 200 }}
          >
            <h3>{monster.name}</h3>
            <p><strong>Type:</strong> {monster.type}</p>
            <p><strong>CR:</strong> {monster.cr}</p>
            <p><strong>HP:</strong> {monster.hp}</p>
            <button onClick={() => deleteMonster(monster.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Builds() {
  const [builds, setBuilds] = useState<any[]>([])

  const [form, setForm] = useState({
    title: '',
    author: '',
    rating: 5
  })

  async function loadBuilds() {
    const response = await fetch(`${API}/builds`)
    const data = await response.json()
    setBuilds(data)
  }

  async function createBuild() {
    if (!form.title || !form.author) {
      alert('Preencha título e autor')
      return
    }

    await fetch(`${API}/builds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setForm({ title: '', author: '', rating: 5 })
    loadBuilds()
  }

  async function deleteBuild(id: string) {
    await fetch(`${API}/builds/${id}`, { method: 'DELETE' })
    loadBuilds()
  }

  useEffect(() => {
    loadBuilds()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>⚔️ Builds</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 300 }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={form.rating}
          min={1}
          max={5}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        />
        <button onClick={createBuild}>Create Build</button>
      </div>

      <hr />

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {builds.map((build) => (
          <div
            key={build.id}
            style={{ border: '1px solid gray', padding: 20, borderRadius: 10, width: 220 }}
          >
            <h3>{build.title}</h3>
            <p><strong>Author:</strong> {build.author}</p>
            <p><strong>Rating:</strong> {'⭐'.repeat(build.rating)}</p>
            <button onClick={() => deleteBuild(build.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Reviews() {
  const [reviews, setReviews] = useState<any[]>([])
  const [text, setText] = useState('')

  async function loadReviews() {
    const response = await fetch(`${API}/reviews`)
    const data = await response.json()
    setReviews(data)
  }

  async function addReview() {
    if (!text) return

    await fetch(`${API}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })

    setText('')
    loadReviews()
  }

  async function deleteReview(id: string) {
    await fetch(`${API}/reviews/${id}`, { method: 'DELETE' })
    loadReviews()
  }

  useEffect(() => {
    loadReviews()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>⭐ Reviews</h1>

      <textarea
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: 300, height: 100 }}
      />

      <br /><br />

      <button onClick={addReview}>Send Review</button>

      <hr />

      {reviews.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid gray',
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            maxWidth: 400
          }}
        >
          <div>
            <p style={{ margin: 0 }}>{item.text}</p>
            <small style={{ color: 'gray' }}>{new Date(item.createdAt).toLocaleString('pt-BR')}</small>
          </div>
          <button onClick={() => deleteReview(item.id)} style={{ marginLeft: 10 }}>✕</button>
        </div>
      ))}
    </div>
  )
}

function Compendium() {
  const [races, setRaces] = useState<any[]>([])
  const [classes, setClasses] = useState<any[]>([])
  const [spells, setSpells] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [rRes, cRes, sRes] = await Promise.all([
        fetch(`${API}/api-external/races`),
        fetch(`${API}/api-external/classes`),
        fetch(`${API}/api-external/spells`),
      ])
      const rData = await rRes.json()
      const cData = await cRes.json()
      const sData = await sRes.json()
      setRaces(rData.results || [])
      setClasses(cData.results || [])
      setSpells((sData.results || []).slice(0, 20))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p style={{ padding: 20 }}>Carregando compêndio...</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>📖 Compêndio D&D 5e</h1>

      <h2>🧬 Raças</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {races.map((r: any) => (
          <span key={r.index} style={{ background: '#eee', padding: '4px 12px', borderRadius: 20 }}>{r.name}</span>
        ))}
      </div>

      <h2>⚔️ Classes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {classes.map((c: any) => (
          <span key={c.index} style={{ background: '#dde', padding: '4px 12px', borderRadius: 20 }}>{c.name}</span>
        ))}
      </div>

      <h2>🔮 Magias (primeiras 20)</h2>
      <ul>
        {spells.map((s: any) => (
          <li key={s.index}>{s.name}</li>
        ))}
      </ul>
    </div>
  )
}


export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <nav style={{ display: 'flex', gap: 10 }}>
          <Link to="/">Home</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/monsters">Monsters</Link>
          <Link to="/builds">Builds</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/compendium">Compêndio</Link>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/builds" element={<Builds />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/compendium" element={<Compendium />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
