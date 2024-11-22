import { MongoClient } from "mongodb";

export default async function conectarAoBanco(StringConexao) { //pegar essa função que tá em um arquivo e usar em outro
    let mongoCliente;

try{
    mongoCliente = new MongoClient(StringConexao);
    console.log('Conectando ao cluster do banco de dados...');
    await mongoCliente.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    return mongoCliente;
} catch(erro){
    console.error('Falha na conexão com o banco!', erro);
    process.exit();
}
}



