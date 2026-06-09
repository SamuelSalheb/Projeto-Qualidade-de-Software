import { useState, type ChangeEvent, type FormEvent } from 'react';

interface Monster {
  id: number | null;
  name: string;
  hpMax: number;
  armorClass: number;
  strength: number;
  dexterity: number;
  imageUrl: string;
}

export default function MonsterCrud() {
  const [monsters, setMonsters] = useState<Monster[]>([]);

  const [formData, setFormData] = useState<Monster>({
    id: null,
    name: '',
    hpMax: 10,
    armorClass: 10,
    strength: 10,
    dexterity: 10,
    imageUrl: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumberField = ['hpMax', 'armorClass', 'strength', 'dexterity'].includes(name);

    setFormData({
      ...formData,
      [name]: isNumberField ? Number(value) : value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id) {
      setMonsters(monsters.map(m => m.id === formData.id ? formData : m));
    } else {
      const newMonster = { ...formData, id: Date.now() };
      setMonsters([...monsters, newMonster]);
    }
    resetForm();
  };

  const handleEdit = (monster: Monster) => {
    setFormData(monster);
  };

  const handleDelete = (id: number | null) => {
    if (!id) return;
    setMonsters(monsters.filter(m => m.id !== id));
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', hpMax: 10, armorClass: 10, strength: 10, dexterity: 10, imageUrl: '' });
  };

  return (
    <div className="page">
      <h2>👹 Gerenciador do Mestre (Monstros Customizados)</h2>

      <div className="dashboard-card">
        <h3>Total de Monstros</h3>
        <h1>{monsters.length}</h1>
      </div>

      <br />

      <form onSubmit={handleSubmit} className="form-card">
        <h3>{formData.id ? '✏️ Editar Monstro' : '➕ Cadastrar Novo Monstro'}</h3>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input type="text" name="name" placeholder="Nome do Monstro (Ex: Goblin)" value={formData.name} onChange={handleInputChange} required style={{ padding: '8px', flex: 2 }} />
          <input type="text" name="imageUrl" placeholder="URL da Imagem (Opcional)" value={formData.imageUrl} onChange={handleInputChange} style={{ padding: '8px', flex: 1 }} />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <label>HP Máx: <input type="number" name="hpMax" value={formData.hpMax} onChange={handleInputChange} style={{ padding: '5px', width: '60px' }} /></label>
          <label>CA (Defesa): <input type="number" name="armorClass" value={formData.armorClass} onChange={handleInputChange} style={{ padding: '5px', width: '60px' }} /></label>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <label>FOR: <input type="number" name="strength" value={formData.strength} onChange={handleInputChange} style={{ padding: '5px', width: '50px' }} /></label>
          <label>DES: <input type="number" name="dexterity" value={formData.dexterity} onChange={handleInputChange} style={{ padding: '5px', width: '50px' }} /></label>
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {formData.id ? 'Salvar Alterações' : 'Criar Monstro'}
        </button>
        {formData.id && <button type="button" onClick={resetForm} style={{ marginLeft: '10px', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>}
      </form>

      <h3>📋 Bestiário do Mestre</h3>
      {monsters.length === 0 ? <p style={{ color: '#666' }}>Nenhum monstro cadastrado ainda.</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {monsters.map(monster => (
            <div key={monster.id || 'temp'} className="entity-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {monster.imageUrl && <img src={monster.imageUrl} alt={monster.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />}
                <div>
                  <strong style={{ fontSize: '18px', color: '#c92a2a' }}>{monster.name}</strong><br />
                  <small style={{ color: '#555' }}>HP: {monster.hpMax} | CA: {monster.armorClass} | FOR: {monster.strength} | DES: {monster.dexterity}</small>
                </div>
              </div>
              <div>
                <button onClick={() => handleEdit(monster)} style={{ marginRight: '8px', padding: '6px 12px', cursor: 'pointer', background: '#ffc107', border: 'none', borderRadius: '4px' }}>Editar</button>
                <button onClick={() => handleDelete(monster.id)} style={{ padding: '6px 12px', cursor: 'pointer', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}