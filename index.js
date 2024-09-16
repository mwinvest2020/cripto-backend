const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurando o Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de gestão de criptoativos está rodando!");
});

// Rota para registrar um usuário
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});

// Rota para login de usuário
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ data });
});

// Iniciar o servidor na porta correta
const PORT = process.env.PORT || 5000; // Render fornecerá a porta
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
