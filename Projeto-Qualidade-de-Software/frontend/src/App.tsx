import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

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
    const response = await fetch('http://localhost:3333/characters')

    const data = await response.json()

    setCharacters(data)
  }

  async function createCharacter() {
    if (!form.name || !form.race || !form.class) {
      alert('Preencha todos os campos')
      return
    }

    await fetch('http://localhost:3333/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })

    setForm({
      name: '',
      race: '',
      class: '',
      level: 1
    })

    loadCharacters()
  }

  async function deleteCharacter(id: string) {
    await fetch(`http://localhost:3333/characters/${id}`, {
      method: 'DELETE'
    })

    loadCharacters()
  }

  useEffect(() => {
    loadCharacters()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>🧙 Characters</h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 300
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          placeholder="Race"
          value={form.race}
          onChange={(e) =>
            setForm({
              ...form,
              race: e.target.value
            })
          }
        />

        <input
          placeholder="Class"
          value={form.class}
          onChange={(e) =>
            setForm({
              ...form,
              class: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Level"
          value={form.level}
          onChange={(e) =>
            setForm({
              ...form,
              level: Number(e.target.value)
            })
          }
        />

        <button onClick={createCharacter}>
          Create Character
        </button>
      </div>

      <hr />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20
        }}
      >
        {characters.map((character) => (
          <div
            key={character.id}
            style={{
              border: '1px solid gray',
              padding: 15,
              borderRadius: 10,
              width: 200
            }}
          >
            <h3>{character.name}</h3>

            <p>
              <strong>Race:</strong> {character.race}
            </p>

            <p>
              <strong>Class:</strong> {character.class}
            </p>

            <p>
              <strong>Level:</strong> {character.level}
            </p>

            <button
              onClick={() =>
                deleteCharacter(character.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function Monsters() {
  const monsters = [
    {
      name: 'Dragon',
      type: 'Boss',
      level: 20
    },
    {
      name: 'Goblin',
      type: 'Minion',
      level: 2
    },
    {
      name: 'Orc',
      type: 'Warrior',
      level: 5
    }
  ]

  return (
    <div style={{ padding: 20 }}>
      <h1>👹 Monsters</h1>

      <div
        style={{
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap'
        }}
      >
        {monsters.map((monster, index) => (
          <div
            key={index}
            style={{
              border: '1px solid gray',
              padding: 20,
              borderRadius: 10,
              width: 200
            }}
          >
            <h3>{monster.name}</h3>

            <p>
              <strong>Type:</strong> {monster.type}
            </p>

            <p>
              <strong>Level:</strong> {monster.level}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Builds() {
  const builds = [
    {
      title: 'Fire Mage',
      author: 'Samuel',
      rating: 5
    },
    {
      title: 'Tank Warrior',
      author: 'Player 2',
      rating: 4
    },
    {
      title: 'Stealth Rogue',
      author: 'Player 3',
      rating: 5
    }
  ]

  return (
    <div style={{ padding: 20 }}>
      <h1>⚔️ Builds</h1>

      <div
        style={{
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap'
        }}
      >
        {builds.map((build, index) => (
          <div
            key={index}
            style={{
              border: '1px solid gray',
              padding: 20,
              borderRadius: 10,
              width: 220
            }}
          >
            <h3>{build.title}</h3>

            <p>
              <strong>Author:</strong> {build.author}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {build.rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Reviews() {
  const [review, setReview] = useState('')

  const [reviews, setReviews] = useState<string[]>([])

  function addReview() {
    if (!review) return

    setReviews([...reviews, review])

    setReview('')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>⭐ Reviews</h1>

      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
        style={{
          width: 300,
          height: 100
        }}
      />

      <br />
      <br />

      <button onClick={addReview}>
        Send Review
      </button>

      <hr />

      {reviews.map((item, index) => (
        <div
          key={index}
          style={{
            border: '1px solid gray',
            padding: 10,
            marginBottom: 10,
            borderRadius: 10
          }}
        >
          {item}
        </div>
      ))}
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
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/builds" element={<Builds />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}