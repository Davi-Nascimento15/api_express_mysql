const { version, userInfo } = require('os')

const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

//Função para execução das querys

function execSQLQuery(sqlQuery, resp){

const connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password:'12345',
    database:'educacaointeligente'
});

connection.query(sqlQuery,(error, results, fields)=>{
    if(error){
        resp.json(error);
    }else{
        resp.json(results);
        connection.end();
        console.log('executou!');
    }
});
}

//BodyParser

app.use(express.json());

//Ouvir porta 3000

app.listen(port);

console.log('API funcionando!');

//home da API

app.get('/',(req,resp)=> 
   resp.json({message: 'Funcionando na porta 3000'}
));


/////////////////////////////////////////////////////////////////// EndPoints Usuario  //////////////////////////////////////////////////////////////////////////

//List

app.get('/usuarios', (req,resp)=>{
   execSQLQuery('SELECT * from usuario',resp);
});

//Find

app.get('/usuarios/:id?',(req,resp)=>{
    let filtro = '';
    if(req.params.id){
        filtro = ' where idmatricula='+parseInt(req.params.id);
    }
    execSQLQuery('SELECT * FROM usuario'+filtro,resp);
});

//Delete

app.delete('/usuarios/:id',(req,resp)=>{
    execSQLQuery('Delete from usuario where idmatricula='+parseInt(req.params.id),resp);
});

//Create

app.post('/usuarios',(req,resp)=>{
    const idmatricula = parseInt(req.body.idmatricula);
    const nome = req.body.nome;
    const senha = req.body.senha;
    const tipo =parseInt(req.body.tipo);
    execSQLQuery("Insert into usuario (idmatricula,nome,senha,tipo) values("+ idmatricula + ",'"+nome+"','"+senha+"',"+tipo+")",resp); 
});

//Update

app.patch('/usuarios/:id', (req,resp)=>{
    const idmatricula = parseInt(req.body.idmatricula);
    const nome = req.body.nome;
    const senha = req.body.senha;
    const tipo =parseInt(req.body.tipo);
    execSQLQuery("Update usuario set idmatricula="+ idmatricula + ", nome='"+nome+"',senha='"+senha+"',tipo="+tipo+" where idmatricula="+parseInt(req.params.id),resp);
});

///////////////////////////////////////////////////////////////////// Fim EndPoints usuario   //////////////////////////////////////////////////////////////////////