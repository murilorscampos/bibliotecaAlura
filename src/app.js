import express from "express";

const app = express();

app.use(express.json());

const livros = [
  { id: 1, titulo: "Senhor dos Anéis" },
  { id: 2, titulo: "O Hobbit" },
];

app.get("/", (req, resp) => {
  resp.status(200).send("Curso de Node");
});

app.get("/livros", (req, resp) => {
  resp.status(200).json(livros);
});

app.get("/livros/:id", (req, resp) => {
  let index = buscaLivro(req.params.id);
  resp.status(201).json(livros[index]);
});

app.post("/livros", (req, resp) => {
  livros.push(req.body);
  resp.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, resp) => {
  let index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  resp.status(201).json(livros[index]);
});

app.delete("/livros/:id", (req, resp) => {
  let { id } = req.params;
  let index = buscaLivro(id);
  livros.splice(index, 1);
  resp.status(201).send(`Livro ${id} apagado com sucesso`);
});

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id == id);
}

export default app;
