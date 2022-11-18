import livros from "../models/Livro.js";

class LivroController {
    static listarLivros = (req, res) => {
        livros.find().populate("autor").exec((err, livros) => {
            res.status(200).send(livros);
        });
    };

    static listarLivrosPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id).populate("autor", "nome").exec((err, livros) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Livro não encontrado, id: ${id}` });
            } else {
                res.status(200).send(livros);
            }
        });
    };

    static listarLivrosPorEditora = (req, res) => {
        const editora = req.query.editora;
        livros.find({ "editora": editora }).populate("autor").exec((err, livros) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao consultar por editora, editora: ${editora}` });
            } else {
                res.status(200).send(livros);
            }
        });
    };

    static cadastrarLivros = (req, res) => {
        let livro = new livros(req.body);
        livro.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar o livro` });
            } else {
                res.status(201).send(livro.toJSON());
            }
        });
    };

    static atualizarLivros = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao atualizar o livro, id: ${id}` });
            } else {
                res.status(200).send({ message: `Livro atualizado com sucesso, id: ${id}` });
            }
        });
    };

    static excluirLivros = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, { $set: req.body }, (err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao excluir o livro, id: ${id}` });
            } else {
                res.status(200).send({ message: `Livro excluido com sucesso, id: ${id}` });
            }
        });
    };
}

export default LivroController;
