import express from "express"; // Importa a biblioteca Express para criar o servidor web.
import routes from  "./src/routes/postsRoutes.js"


const app = express();// Cria uma instância do aplicativo Express.
app.use(express.static("uploads")) //servir arquivos estáticos
routes(app)
app.listen(3000, () => { // Inicia o servidor na porta 3000.
  console.log("Servidor escutando..."); // Mensagem de log indicando que o servidor está em execução.
});




//rota, função que recebe a requisição e a conexão do db com a aplicação
//api = interface no meio de outras duas, a caneca interfaceia a água sem ela eu não conseguiria tomar água
