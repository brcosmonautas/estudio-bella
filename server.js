const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "studio_sempre_bella",
  password: "senha",
  port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/addAgendamento", async (req, res) => {
  const { nome, telefone, email, cargo } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Funcionarios (nome, telefone, email, cargo) VALUES ($1, $2, $3, $4)",
      [nome, telefone, email, cargo],
    );
    res.status(200).send("Funcionário adicionado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar funcionário");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
