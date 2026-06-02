import { useState, type ChangeEvent, type FormEvent } from 'react';

// Formato do Personagem para o TypeScript
interface Character {
  id: number | null;
  name: string;
  characterClass: string;
  hpMax: number;
  armorClass: number;
  strength: number;
  dexterity: number;
}

export default function CharacterCrud() {
  const [characters, setCharacters] = useState<Character[]>([]);
  
  const [formData, setFormData] = useState<Character>({
    id: null,
    name: '',
    characterClass: '',
    hpMax: 10,
    armorClass: 10,
    strength: 10,
    dexterity: 10,
  });

  // Atualiza os dados do formulário enquanto você digita (com os tipos do TypeScript)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // O TypeScript exige que os campos numéricos sejam convertidos de texto para número
    const isNumberField = ['hpMax', 'armorClass', 'strength', 'dexterity'].includes(name);
    
    setFormData({ 
      ...formData, 
      [name]: isNumberField ? Number(value) : value 
    });
  };

  // Função para CRIAR ou EDITAR o personagem
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      // Editar existente
      setCharacters(characters.map(char => char.id === formData.id ? formData : char));
    } else {
      // Criar novo com um ID temporário
      const newCharacter = { ...formData, id: Date.now() };
      setCharacters([...characters, newCharacter]);
    }
    resetForm();
  };

  // Preenche o formulário com os dados do personagem para edição
  const handleEdit = (character: Character) => {
    setFormData(character);
  };

  // Deleta o personagem da lista
  const handleDelete = (id: number | null) => {
    if (!id) return;
    setCharacters(characters.filter(char => char.id !== id));
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', characterClass: '', hpMax: 10, armorClass: 10, strength: 10, dexterity: 10 });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
      <h2>🛡️ Gerenciador de Builds (Personagens)</h2>
      
      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>{formData.id ? '✏️ Editar Personagem' : '➕ Novo Personagem'}</h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input type="text" name="name" placeholder="Nome do Personagem" value={formData.name} onChange={handleInputChange} required style={{ padding: '8px', flex: 1 }} />
          <input type="text" name="characterClass" placeholder="Classe (Ex: Guerreiro)" value={formData.characterClass} onChange={handleInputChange} required style={{ padding: '8px', flex: 1 }} />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label>HP Máx: <input type="number" name="hpMax" value={formData.hpMax} onChange={handleInputChange} style={{ padding: '5px', width: '60px' }} /></label>
          <label>CA (Defesa): <input type="number" name="armorClass" value={formData.armorClass} onChange={handleInputChange} style={{ padding: '5px', width: '60px' }} /></label>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <label>FOR: <input type="number" name="strength" value={formData.strength} onChange={handleInputChange} style={{ padding: '5px', width: '50px' }} /></label>
          <label>DES: <input type="number" name="dexterity" value={formData.dexterity} onChange={handleInputChange} style={{ padding: '5px', width: '50px' }} /></label>
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {formData.id ? 'Salvar Alterações' : 'Criar Personagem'}
        </button>
        {formData.id && <button type="button" onClick={resetForm} style={{ marginLeft: '10px', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>}
      </form>

      {/* LISTA */}
      <h3>📜 Meus Personagens Salvos</h3>
      {characters.length === 0 ? <p style={{ color: '#666' }}>Nenhum personagem criado ainda.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {characters.map(char => (
            <li key={char.id || 'temp'} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '12px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
              <div>
                <strong style={{ fontSize: '18px' }}>{char.name}</strong> — <span style={{ color: '#007bff' }}>{char.characterClass}</span> <br/>
                <small style={{ color: '#555' }}>HP: {char.hpMax} | CA: {char.armorClass} | FOR: {char.strength} | DES: {char.dexterity}</small>
              </div>
              <div>
                <button onClick={() => handleEdit(char)} style={{ marginRight: '8px', padding: '6px 12px', cursor: 'pointer', background: '#ffc107', border: 'none', borderRadius: '4px' }}>Editar</button>
                <button onClick={() => handleDelete(char.id)} style={{ padding: '6px 12px', cursor: 'pointer', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}