# 🧪 Documentação de Casos de Teste

Este documento lista o planejamento e a execução dos testes automatizados do nosso projeto de RPG (D&D), cobrindo as entregas até a Sprint 3. O foco é garantir a Qualidade de Software em diferentes camadas da aplicação.

---

## 1. Testes Unitários (Camada de Lógica)
Testes focados em funções isoladas, validadores e regras de negócio sem dependência de banco de dados ou internet.

- [x] **Validação de E-mail:** Garantir que a função `isValidEmail` rejeite formatos inválidos (ex: sem `@`) e aceite formatos corretos.
- [x] **Soma de Atributos:** Validar se a função `somarAtributos` calcula perfeitamente a soma total da ficha de D&D (Força, Destreza, Constituição, etc.).
- [ ] **Validação de Senha (Planejado):** Testar se a função de criar senhas exige o mínimo de caracteres de segurança.
- [ ] **Cálculo de Modificadores (Planejado):** Testar a função que converte o valor do atributo em modificador de D&D (ex: 15 = +2).

---

## 2. Testes de Integração (Camada de API e Banco de Dados)
Testes que simulam requisições HTTP reais e verificam a persistência dos dados no banco PostgreSQL (Neon).

- [x] **Criação de Monstros (POST `/monsters`):** Disparar uma requisição com dados de um monstro e verificar diretamente no banco de dados se o registro foi salvo com sucesso.
- [x] **Listagem de Monstros (GET `/monsters`):** Verificar se a rota retorna um array válido de monstros e o status HTTP 200.
- [ ] **Criação de Personagens (Planejado):** Testar o vínculo de um `Character` com o ID de um `User` válido no banco.
- [ ] **Deleção em Cascata (Planejado):** Garantir que, ao deletar um usuário, todos os personagens vinculados a ele sejam removidos do banco.

---

## 3. Testes de Integração Externa (Serviços de Terceiros)
Testes focados na comunicação do nosso back-end com APIs públicas.

- [ ] **API D&D 5e - Raças (Planejado):** Testar se o `dndService` consegue buscar a lista de raças e lidar com falhas de rede.
- [ ] **API D&D 5e - Classes (Planejado):** Validar o formato de resposta das classes retornadas pela API externa.

---

## 🛠️ Tecnologias Utilizadas
* **Framework de Testes:** Jest (ts-jest)
* **Simulação de Requisições:** Supertest
* **Banco de Dados de Teste:** Prisma Client conectado ao PostgreSQL