import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente.

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes".
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray(); // Realiza uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
  } 

  export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes".
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.insertOne(novoPost); // cria um novo post
  }

  export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes".
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)},{$set:novoPost}); // cria um novo post
  }