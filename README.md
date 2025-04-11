
# CRUD Série B Jogadores

Esse projeto permite visualizar, adicionar, editar e remover jogadores, diretamente conectando com o banco de dados.

## Tecnologias Usadas

- React
- Node.js
- Express
- Material-UI

## Como Rodar o Projeto

### 1. Instalar as Dependências

Na pasta raiz do projeto, instale as dependências:

npm install

### 2. Rodar o Backend

Vá para a pasta do **backend** e inicie o servidor:

cd backend
npm start

O servidor backend estará rodando em `http://localhost:8800`.

### 3. Rodar o Frontend

No diretório do **frontend**, inicie o servidor:

cd frontend
npm start

O frontend estará rodando em `http://localhost:3000`.

### 4. Acessar o Projeto

Agora, você pode acessar o aplicativo no navegador em `http://localhost:3000`.

## Pré-requisitos

- **Node.js** e **npm** instalados na sua máquina.

## Restaurar o Banco de Dados

Se você deseja restaurar o banco de dados, faça o seguinte:

1. **Baixe o arquivo de dump** [**Dump20250410.sql**](./database/Dump20250410.sql).
2. **Restaure o banco de dados** utilizando o seguinte comando:

   **Para MySQL**:
   ```bash
   mysql -u <usuario> -p <nome_do_banco> < database/Dump20250410.sql
   ```

   Substitua `<usuario>` e `<nome_do_banco>` pelos valores correspondentes ao seu ambiente de banco de dados.


