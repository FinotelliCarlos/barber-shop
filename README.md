⌨ <strong>#Como executar o projeto</strong>

<br>

```bash
# Clonar o repositório
git clone https://github.com/FinotelliCarlos/barber-shop

# Entrar no diretório
cd barber-shop

# Baixar as dependências
npm install | yarn

# Executar o servidor
npm run dev | yarn dev

# Este passo necessita que você tenha o docker rodando em sua maquina e tenha a imagem postgress instalada
# Também pode ser utilizado algum provedor online como foi feito neste projeto e inserir o link de conecção a .env DATABASE_URL
# Executar seed ao banco de dados
npx prisma db seed

```
