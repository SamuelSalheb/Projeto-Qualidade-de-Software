import { useState, type ChangeEvent } from 'react';

// Define o formato de uma magia vinda da API
interface Spell {
  index: string;
  name: string;
  url: string;
}

export default function SpellSearch() {
  const [search, setSearch] = useState('');
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função que vai na internet buscar as magias
  const fetchSpells = async () => {
    if (!search.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      // Faz a requisição para a API oficial de D&D
      const response = await fetch('https://www.dnd5eapi.co/api/spells');
      if (!response.ok) throw new Error('Erro ao conectar na API');
      
      const data = await response.json();
      
      // Filtra as magias com base no que você digitou no input
      const filtered = (data.results as Spell[]).filter(spell =>
        spell.name.toLowerCase().includes(search.toLowerCase())
      );
      
      setSpells(filtered.slice(0, 10)); // Mostra no máximo as 10 primeiras para ficar organizado
      if (filtered.length === 0) setError('Nenhuma magia encontrada com esse nome.');
    } catch (err) {
      setError('Houve um erro ao buscar as magias. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
      <h2>🔮 Biblioteca Arcana (Busca de Magias)</h2>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Consumindo dados em tempo real da D&D 5e API</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', marginTop: '10px' }}>
        <input 
          type="text" 
          placeholder="Digite em inglês (Ex: Fireball, Cure Wounds, Bless...)" 
          value={search}
          onChange={handleInputChange}
          style={{ padding: '10px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={fetchSpells}
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'Buscando...' : '🔍 Buscar'}
        </button>
      </div>

      {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>}

      {/* RESULTADOS DA BUSCA */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {spells.map(spell => (
          <li key={spell.index} style={{ padding: '12px', border: '1px solid #eee', borderRadius: '4px', marginBottom: '8px', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>✨ {spell.name}</span>
            <a 
              href={`https://www.dnd5eapi.co${spell.url}`} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.85rem', border: '1px solid #007bff', padding: '4px 8px', borderRadius: '4px' }}
            >
              Ver Detalhes da API ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}