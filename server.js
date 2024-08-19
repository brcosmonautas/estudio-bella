require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Atualize a string de conexão com a senha correta
const pool = new Pool({
  connectionString: 'postgresql://postgres.cnzkxerdjnlmbkcqjqof:[SENHA DO DATABASE]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?sslmode=require',
  ssl: {
    rejectUnauthorized: false // Configuração SSL para Supabase
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rota para adicionar um funcionário
app.post('/addFuncionario', async (req, res) => {
  const { nome, telefone, email, servico } = req.body;
  try {
    await pool.query(
      'INSERT INTO Funcionarios (nome, telefone, email, servico) VALUES ($1, $2, $3, $4)',
      [nome, telefone, email, servico]
    );
    res.status(200).send('Funcionário adicionado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar funcionário');
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

