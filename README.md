# 📚 Blog Academy

O **Blog Academy** é uma API REST desenvolvida com **Node.js** com o objetivo de permitir que **professores** publiquem conteúdos educacionais em forma de postagens e que **alunos** possam visualizar essas publicações.

Este projeto foi construído para a pós graduação de desenvolvimento FullStack na FIAP.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Fastify** – servidor HTTP rápido e moderno
- **Zod** – validação e tipagem de schemas
- **PostgreSQL** – banco de dados relacional
- **Swagger (Fastify Swagger)** – documentação da API
- **Tsup** – empacotamento do projeto
- **TSX** – execução de TypeScript em tempo real
- **Jest** – testes automatizados

---

## 🧱 Estrutura do Banco de Dados

### 🔧 Query de Criação

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  birth DATE NOT NULL,
  email VARCHAR(255) NOT NULL
);

ALTER TABLE person 
ADD COLUMN user_id INT UNIQUE,
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "user"(id);

CREATE TABLE post (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE,
  updatedAt TIMESTAMP WITHOUT TIME ZONE
);

ALTER TABLE post 
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE post 
ADD COLUMN author_id INT UNIQUE,
ADD CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES person(id);
```

---

## ⚙️ Como Iniciar a Aplicação

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- NPM

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/MelqSantos/blogAcademy.git
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` baseado no arquivo `.env.example` e preencha as variáveis, ex:
   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/blogacademy
   ```

4. **Execute em modo desenvolvimento**
   ```bash
   npm run start:dev
   ```

5. **Build da aplicação**
   ```bash
   npm run build
   ```

6. **Start em produção**
   ```bash
   npm start
   ```

7. **Rodar os testes**
   ```bash
   npm run test
   ```

---

## 📄 Documentação com Swagger

A documentação é gerada via **Fastify Swagger**.

- Após iniciar a aplicação, acesse:  
  👉 [`http://localhost:3000/docs`](http://localhost:3000/docs)

---

## ✏️ Exemplos de Requisições CRUD de Postagens

### 🔹 Criar Postagem

```http
POST /posts
```

**Body:**
```json
{
  "title": "Introdução à Fotossíntese",
  "content": "A fotossíntese é o processo pelo qual as plantas produzem energia...",
  "subject": "Biologia",
  "author_id": 1
}
```

---

### 🔹 Listar Todas as Postagens

```http
GET /posts
```

---

### 🔹 Buscar Postagens por algum argumento 

```http
GET /posts/search/{text}
```

---

### 🔹 Buscar uma Postagem por ID

```http
GET /posts/{id}
```

---

### 🔹 Atualizar uma Postagem

```http
PUT /posts/{id}
```

**Body:**
```json
{
  "title": "Fotossíntese - Atualizado",
  "content": "Conteúdo atualizado sobre fotossíntese...",
  "subject": "Biologia"
}
```

---

### 🔹 Deletar uma Postagem

```http
DELETE /posts/{id}
```

---

## 🧠 Papéis e Usuários

- `user.role`: Define se o usuário é um `professor` (pode postar) ou `aluno` (apenas leitura).

---

## 📌 Observações

- Os IDs de postagens são UUIDs gerados automaticamente.
- A associação entre `user`, `person` e `post` segue um modelo relacional onde o `user` possui informações adicionais em `person` caso necessário.
- Todos os endpoints estão validados com **Zod**.
