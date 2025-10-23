# Brasil Emprego Já

Aplicação React criada com Vite que inclui uma API Node.js simples para cadastro e autenticação de usuários usando SQLite como banco de dados.

## Pré-requisitos

- [Node.js 22](https://nodejs.org/) ou superior (necessário para o módulo experimental `node:sqlite`).
- npm 10 ou superior.

## Instalação das dependências

```bash
npm install
```

## Executando os serviços

Em terminais separados execute:

```bash
# API (porta padrão 4000)
npm run server

# Aplicação web (porta padrão 5173)
npm run dev
```

A aplicação web consome a API através da variável `VITE_API_URL`. Por padrão ela aponta para `http://localhost:4000/api`. Caso deseje usar outra porta ou URL, crie um arquivo `.env` na raiz do projeto com o valor desejado:

```bash
VITE_API_URL=https://meu-servidor.com/api
```

## Endpoints disponíveis

| Método | Rota                | Descrição                               |
| ------ | ------------------- | --------------------------------------- |
| GET    | `/api/health`       | Verifica se a API está respondendo.     |
| POST   | `/api/auth/register`| Cria um novo usuário no banco SQLite.   |
| POST   | `/api/auth/login`   | Valida credenciais e retorna o usuário. |

Todos os dados são persistidos em `server/data/app.sqlite`. Senhas são armazenadas utilizando `scrypt` com salt aleatório.

## Fluxo de cadastro e login

1. Acesse `/cadastro` para iniciar o cadastro.
2. Escolha o tipo de participação, preencha os dados pessoais e defina a senha.
3. Após o sucesso do cadastro, utilize `/login` para testar o acesso com o e-mail e senha cadastrados.

Mensagens de erro e sucesso são exibidas diretamente nas telas para facilitar a validação manual.
