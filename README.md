# Projeto Todo List

Este repositório contém tanto o backend (API) quanto o frontend do projeto Todo List.

## Estrutura do Projeto

- **`/api`**: Contém o código-fonte da API construída com Node.js, Fastify, e TypeScript.
- **`/frontend`**: Contém o código-fonte do frontend construído com Angular.

## Pré-requisitos

- **Node.js** (recomendado: versão 16 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Knex.js** CLI globalmente instalado (opcional, para rodar as migrações localmente)

## Configuração e Execução do Projeto

### 1. Configuração da API

1. **Navegue até o diretório da API:**

   ```bash
   cd api
   ```

2. **Crie um arquivo `.env` na pasta `api` com o seguinte formato:**

   ```plaintext
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   DB_PORT=
   NODE_ENV=
   ```

   Preencha os valores de acordo com o seu ambiente.

3. **Suba o Container Docker:**

   Use Docker Compose para subir o container com a aplicação e o banco de dados:

   ```bash
   docker-compose up -d
   ```

4. **Rodar as Migrações do Banco de Dados:**

   Após subir os containers, rode as migrações localmente para criar as tabelas no banco de dados:

   ```bash
   npx knex migrate:latest
   ```

5. **Rodar a API em Modo de Desenvolvimento:**

   Para rodar a API em modo de desenvolvimento, execute:

   ```bash
   npm run dev
   ```

### 2. Configuração do Frontend

1. **Navegue até o diretório do frontend:**

   ```bash
   cd frontend
   ```

2. **Instale as dependências:**

   Se você estiver usando `npm`:

   ```bash
   npm install
   ```

   Ou, se estiver usando `yarn`:

   ```bash
   yarn install
   ```

3. **Rodar o Frontend em Modo de Desenvolvimento:**

   Para rodar o frontend em modo de desenvolvimento, execute:

   Se estiver usando `npm`:

   ```bash
   npm run start
   ```

   Ou, se estiver usando `yarn`:

   ```bash
   yarn start
   ```

   Isso iniciará o servidor de desenvolvimento e você poderá acessar a aplicação no seu navegador em `http://localhost:4200`.
