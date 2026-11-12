import express from "express"

import cors from "cors"

import mysql2 from "mysql2"

import "dotenv/config"

const app = express()

app.use(express.json())
app.use(cors())

const sql = mysql2.createPool({
    host: process.env.HOST_BANCO,
    user: process.env.USUARIO_BANCO,
    password: process.env.SENHA_BANCO,
    database: process.env.NOME_BANCO
})

app.get("/", (request, response) => { 
    const comandoSelect = "SELECT * FROM musicas_pedro_kayke"

    sql.query(comandoSelect, (error, data) => { 

        if(error){
            console.log(error)
            return
        }

       response.json(data)

    })
})



app.post("/cadastrar", (request, response) => {

   
    const { titulo, artista, genero, ano, duracao } = request.body;

  
    const comandoInsert = "INSERT INTO musicas_pedro_kayke (titulo, artista, genero, ano, duracao) VALUES (?, ?, ?, ?, ?)";

    
    sql.query(comandoInsert, [titulo, artista, genero, ano, duracao], (error) => {

        if (error) {
            console.log(error);
            response.status(500).json({ mensagem: "Erro ao cadastrar música" });
            return;
        }

        response.status(201).json({ mensagem: "Música cadastrada com sucesso!" });

    });

});



app.listen (3000, () => {
    console.log("Servidor Online")
})

export default app