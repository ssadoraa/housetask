# 📝 HouseTask

O **HouseTask** é uma aplicação web para registro e organização de atividades, permitindo cadastrar nome, data e tipo de atividade, além de filtrar os registros por atividade.

O projeto foi desenvolvido com **Next.js** e **Supabase**, com foco em prática de CRUD e manipulação de dados em aplicações fullstack.

---

## ✨ Funcionalidades atuais

* 👤 Cadastro de registros com:

  * Nome
  * Data
  * Atividade

* 📋 Listagem dos registros cadastrados

* 🔎 Filtro de registros por atividade (exibindo nome e data)

* ☁️ Persistência de dados com Supabase

---

## 🧰 Tech Stack

* Next.js
* React
* Supabase (PostgreSQL)
* CSS / Tailwind *(caso esteja usando)*
* Vercel *(para deploy)*

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash id="g2k9aa"
git clone https://github.com/ssadoraa/housetask.git
```

### 2. Acesse o diretório

```bash id="m7p1dd"
cd housetask
```

### 3. Instale as dependências

```bash id="x8v2qq"
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env.local`:

```env id="e4k8pp"
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
```

### 5. Execute o projeto

```bash id="t6n3zz"
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🧠 Como funciona

1. O usuário cadastra um registro com nome, data e atividade
2. Os dados são armazenados no Supabase
3. A aplicação lista os registros salvos
4. O usuário pode filtrar por tipo de atividade
5. A lista exibe apenas nome e data conforme o filtro

---

## 🧭 Próximas funcionalidades (em desenvolvimento)

A próxima evolução do projeto será a implementação de um sistema de **salas (rooms)**:

* 🏠 Criação de salas por um usuário (owner)
* 📩 Convite de outros usuários para a sala
* 👥 Sistema de membros por sala
* 📝 Registro de atividades dentro de cada sala
* 🔐 Autenticação de usuários
* 🔒 Controle de acesso por sala

> ⚠️ Essas funcionalidades ainda **não foram implementadas**, mas fazem parte da evolução planejada do projeto.
