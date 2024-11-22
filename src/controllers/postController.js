import {getTodosPosts, criarPost, atualizarPost} from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

export async function listarPosts(req, res) {
     // Define uma rota GET para a URL "/posts".
        const posts = await getTodosPosts(); // Chama a função para obter todos os posts.
        res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
        }

export async function postarNovoPost(req, res) {
   const novoPost = req.body; //toda requisição tem um corpo (contéudo) req (pedido) conteúdo (oque está escrito)
   try { //tenta realizar isso
       const postCriado = await criarPost(novoPost)
       res.status(200).json(postCriado);
   }catch(erro){
      console.error(erro.message);
      res.status(500).json({"Erro": "Falha na requisição"})
   }
}

export async function uploadImagem(req, res) {
   const novoPost = {
      descricao: "",
      imgUrl: req.file.originalname,
      alt: ""
   }; //toda requisição tem um corpo (contéudo) req (pedido) conteúdo (oque está escrito)
   try { //tenta realizar isso
       const postCriado = await criarPost(novoPost)
       const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
       fs.renameSync(req.file.path, imagemAtualizada)
       res.status(200).json(postCriado);
   }catch(erro){
      console.error(erro.message);
      res.status(500).json({"Erro": "Falha na requisição"})
   }
}

export async function atualizarNovoPost(req, res) {
   const id = req.params.id; //toda requisição tem um corpo (contéudo) req (pedido) conteúdo (oque está escrito)
   const urlImagem = `htpp://localhost?3000/${id}.png`

   try { //tenta realizar isso
       const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
       const descricao = await gerarDescricaoComGemini(imgBuffer)
       const post = {
         imgUrl: urlImagem,
         descricao: descricao,
         alt: req.body.alt
        }
       const postCriado = await atualizarPost(id, post);
       res.status(200).json(postCriado);
   }catch(erro){
      console.error(erro.message);
      res.status(500).json({"Erro": "Falha na requisição"})
   }
}