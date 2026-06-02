// Função 1: Valida se um e-mail tem formato correto
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Interface para os atributos do RPG (D&D)
interface Atributos {
  forca: number;
  destreza: number;
  constituicao: number;
  inteligencia: number;
  sabedoria: number;
  carisma: number;
}

// Função 2: Calcula a soma de todos os atributos de um personagem
export function somarAtributos(atributos: Atributos): number {
  return (
    atributos.forca +
    atributos.destreza +
    atributos.constituicao +
    atributos.inteligencia +
    atributos.sabedoria +
    atributos.carisma
  );
}