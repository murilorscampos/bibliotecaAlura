import mongoose from "mongoose";

mongoose.connect("mongodb+srv://murilorscampos:Mucampos191184@livrariaAluraMCampos.fzfdnag.mongodb.net/livrariaAlura");

let db = mongoose.connection;

export default db;
