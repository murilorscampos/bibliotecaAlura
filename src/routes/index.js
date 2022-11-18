import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({ titulo: "Curso de NodeJS com Mongo" });
    });

    app.use(
        express.json(),
        livros,
        autores
    );
};

export default routes;
