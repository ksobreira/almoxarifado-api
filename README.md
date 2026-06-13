# Almoxarifado API

API REST para um sistema de almoxarifado, desenvolvida com Node.js, Express e Prisma ORM. A aplicação possui autenticação via JWT e armazenamento seguro de senhas com BCrypt.

---

## Tecnologias

- Node.js
- Express
- Prisma ORM
- MySQL
- JSON Web Token (JWT)
- BCrypt

---

## Estrutura de Pastas

```
almoxarifado-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── supplierController.js
│   │   ├── productController.js
│   │   └── stockMovementController.js
│   ├── middlewares/
│   │   └── authenticate.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── supplierRoutes.js
│   │   ├── productRoutes.js
│   │   └── stockMovementRoutes.js
│   └── app.js
├── .env.example
├── package.json
└── server.js
```

---

## Instalação

**1. Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/almoxarifado-api.git
cd almoxarifado-api
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais:
```
DATABASE_URL="mysql://usuario:senha@localhost:3306/almoxarifado"
JWT_SECRET=sua_chave_secreta
```

**4. Rode as migrations:**
```bash
npx prisma migrate dev
```

**5. Inicie o servidor:**
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`.

---

## Autenticação

Todas as rotas exceto `/auth/register` e `/auth/login` exigem um token JWT válido.

O token deve ser enviado no header da requisição:
```
Authorization: Bearer <token>
```

O token expira em **8 horas**.

---

## Endpoints

### Auth

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /auth/register | Registra um novo usuário | ❌ |
| POST | /auth/login | Autentica e retorna token JWT | ❌ |

**POST /auth/register**
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "minhasenha123"
}
```

**POST /auth/login**
```json
{
  "email": "maria@email.com",
  "password": "minhasenha123"
}
```

---

### Categories

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /categories | Lista todas as categorias | ✅ |
| GET | /categories/:id | Retorna categoria por ID | ✅ |
| POST | /categories | Cria nova categoria | ✅ |
| PUT | /categories/:id | Atualiza categoria | ✅ |
| DELETE | /categories/:id | Remove categoria | ✅ |

**POST /categories**
```json
{
  "name": "Limpeza",
  "description": "Produtos de limpeza em geral"
}
```

---

### Suppliers

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /suppliers | Lista todos os fornecedores | ✅ |
| GET | /suppliers/:id | Retorna fornecedor por ID | ✅ |
| POST | /suppliers | Cria novo fornecedor | ✅ |
| PUT | /suppliers/:id | Atualiza fornecedor | ✅ |
| DELETE | /suppliers/:id | Remove fornecedor | ✅ |

**POST /suppliers**
```json
{
  "name": "Distribuidora Clean",
  "cnpj": "11222333000181",
  "email": "clean@email.com",
  "phone": "85999990001"
}
```

---

### Products

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /products | Lista todos os produtos | ✅ |
| GET | /products/:id | Retorna produto por ID | ✅ |
| POST | /products | Cria novo produto | ✅ |
| PUT | /products/:id | Atualiza produto | ✅ |
| DELETE | /products/:id | Remove produto | ✅ |

**POST /products**
```json
{
  "name": "Detergente",
  "description": "Detergente líquido 500ml",
  "unity": "un",
  "currentStock": 0,
  "minimunStock": 5,
  "categoryId": 1,
  "supplierId": 1
}
```

---

### Stock Movements

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /stock-movements | Lista todas as movimentações | ✅ |
| GET | /stock-movements/:id | Retorna movimentação por ID | ✅ |
| GET | /stock-movements/product/:productId | Lista movimentações de um produto | ✅ |
| POST | /stock-movements | Registra nova movimentação | ✅ |

**POST /stock-movements**
```json
{
  "type": "IN",
  "quantity": 20,
  "notes": "Entrada inicial de estoque",
  "productId": 1
}
```

> Movimentações são registros imutáveis — não possuem endpoints de edição ou exclusão.

---

## Regras de Negócio

- Toda movimentação do tipo `IN` soma ao `currentStock` do produto
- Toda movimentação do tipo `OUT` subtrai do `currentStock` do produto
- Saídas com quantidade maior que o estoque atual são bloqueadas com status 400
- Senhas são armazenadas com hash BCrypt com custo mínimo de 10
- O campo `password` nunca aparece em nenhuma resposta da API
- O token JWT expira em 8 horas

---

## Padrão de Respostas

| Situação | Status |
|----------|--------|
| Criação bem-sucedida | 201 |
| Demais operações bem-sucedidas | 200 |
| Recurso não encontrado | 404 |
| Erro de validação | 400 |
| Não autenticado | 401 |

Erros retornam sempre no formato:
```json
{ "error": "Mensagem descritiva do erro." }
```

---

## Modelo de Dados

```
Category         Supplier
    |                |
    └────────────────┘
             |
          Product
             |
       StockMovement

User (autenticação)
```

## Feito por: Kauam Sobreira
---
