import autores from "../models/Autor.js";

class AutorController {
    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).send(autores);
        });
    };

    static listarAutoresPorId = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Autor não encontrado, id: ${id}` });
            } else {
                res.status(200).send(autores);
            }
        });
    };

    static cadastrarAutores = (req, res) => {
        let autor = new autores(req.body);
        autor.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar o autor` });
            } else {
                res.status(201).send(autor.toJSON());
            }
        });
    };

    static atualizarAutores = (req, res) => {
        const id = req.params.id;
        autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao atualizar o autor, id: ${id}` });
            } else {
                res.status(200).send({ message: `Autor atualizado com sucesso, id: ${id}` });
            }
        });
    };

    static excluirAutores = (req, res) => {
        const id = req.params.id;
        autores.findByIdAndDelete(id, { $set: req.body }, (err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao excluir o autor, id: ${id}` });
            } else {
                res.status(200).send({ message: `Autor excluido com sucesso, id: ${id}` });
            }
        });
    };
}

export default AutorController;
