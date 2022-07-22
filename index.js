const { version, userInfo } = require('os')

const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
var  uniqid = require('uniqid'); 

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


/////////////////////////////////////////////////////////////////// EndPoints Usuario //////////////////////////////////////////////////////////////////////////

//List

app.get('/usuarios', (req,resp)=>{
   execSQLQuery('SELECT * from LoginUsuario',resp);
});

//Find

app.get('/usuarios/:id?',(req,resp)=>{
    let filtro = '';
    if(req.params.id){
        filtro = ' where matriculaUsuario='+parseInt(req.params.id);
    }
    execSQLQuery('SELECT * FROM LoginUsuario'+filtro,resp);
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
/////////////////////////////////////////////////////////////////// EndPoints Faltas  //////////////////////////////////////////////////////////////////////////

//List

app.get('/faltas', (req,resp)=>{
    execSQLQuery('SELECT * from presenca',resp);
 });
 
 ///Find
 
 app.get('/faltas/:id?',(req,resp)=>{
     let filtro = '';
     if(req.params.id){
         filtro = ' where aluno_idaluno='+parseInt(req.params.id);
     }
     execSQLQuery('SELECT * FROM presenca'+filtro,resp);
 });
 
 //Delete
 
 app.delete('/faltas/:id',(req,resp)=>{
     execSQLQuery('Delete from presenca where idpresenca='+parseInt(req.params.id),resp);
 });
 
 //Create
 
 app.post('/faltas',(req,resp)=>{
     const idprsenca = parseInt(req.body.idprsenca);
     const data = req.body.data;
     const falta = req.body.falta;
     const idaluno =parseInt(req.body.aluno_idaluno);
     execSQLQuery("Insert into presenca (idpresenca,data,falta,aluno_idaluno) values("+ idpresenca + ",'"+data+"','"+falta+"',"+idaluno+")",resp); 
 });
 
 //Update
 
 app.patch('/faltas/:id', (req,resp)=>{
    const idprsenca = parseInt(req.body.idprsenca);
    const data = req.body.data;
    const falta = req.body.falta;
    const idaluno =parseInt(req.body.aluno_idaluno);
    execSQLQuery("Update usuario set idpresenca="+ idpresenca + ", data='"+data+"',falta='"+falta+"',aluno_idaluno="+idaluno+" where idpresenca="+parseInt(req.params.id),resp);
 });
 
 ///////////////////////////////////////////////////////////////////// Fim EndPoints Faltas   //////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////// EndPoints Avisos  //////////////////////////////////////////////////////////////////////////

//List

app.get('/avisos', (req,resp)=>{
    execSQLQuery('SELECT * from AvisosAluno',resp);
 });
 
 ///Find
 
 app.get('/avisos/:id?',(req,resp)=>{
     let filtro = '';
     if(req.params.id){
         filtro = ' where turma_idTurma='+parseInt(req.params.id);
     }
     execSQLQuery('SELECT * FROM AvisosAluno'+filtro,resp);
 });
 
 //Delete
 
 app.delete('/avisos/:id',(req,resp)=>{
     execSQLQuery('Delete from Avisos where idAvisos='+parseInt(req.params.id),resp);
 });
 
 //Create
 
 app.post('/avisos',(req,resp)=>{
    const idAvisos = parseInt(req.body.idAvisos);
    const dataEntrega = req.body.dataEntrega;
    const dataGeracao = req.body.dataGeracao;
    const descricao = req.body.descricao;
    const disciplina_iddisciplina = parseInt(req.body.disciplina_iddisciplina);
    const professor_idprofessor = parseInt(req.body.professor_idprofessor);
    const turma_idTurma = parseInt(req.body.turma_idTurma);
    const tipoaviso = parseInt(req.body.tipoaviso); 
    
     execSQLQuery("Insert into avisos (idAvisos,dataEntrega,dataGeracao,descricao, disciplina_iddisciplina,professor_idprofessor,turma_idTurma,tipoaviso) values("+ idAvisos + ",'"+dataEntrega+"','"+dataGeracao+"','"+descricao+"',"+disciplina_iddisciplina+","+professor_idprofessor+","+turma_idTurma+","+tipoaviso+")",resp); 
 });
 
 //Update
 
 app.patch('/avisos/:id', (req,resp)=>{
    const idprsenca = parseInt(req.body.idprsenca);
    const data = req.body.data;
    const falta = req.body.falta;
    const idaluno =parseInt(req.body.aluno_idaluno);
    execSQLQuery("Update avisos set idAvisos="+ idAvisos + ",dataEntrega = '"+dataEntrega+"',dataGeracao='"+dataGeracao+"',descricao='"+descricao+"',disciplina_iddisciplina="+disciplina_iddisciplina+",professor_idprofessor="+professor_idprofessor+",turma_idTurma="+turma_idTurma+",tipoaviso="+tipoaviso,resp);
 });
 
 ///////////////////////////////////////////////////////////////////// Fim EndPoints Avisos   //////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////// EndPoints Sugestao     //////////////////////////////////////////////////////////////////////

  ///List

  app.get('/sugestao', (req,resp)=>{
    execSQLQuery('SELECT * from sugestao',resp);
 });

  ///Find
 
  app.get('/sugestao/:id?',(req,resp)=>{
    let filtro = '';
    if(req.params.id){
        filtro = ' WHERE usuario_idmatricula='+parseInt(req.params.id);
    }
    execSQLQuery('SELECT * FROM sugestao'+filtro,resp);
});

 //Delete
 
 app.delete('/sugestao/:id?',(req,resp)=>{
    execSQLQuery("DELETE FROM sugestao WHERE idSugestao='"+req.params.id+"'",resp);
});

 //Create
 
 app.post('/sugestao',(req,resp)=>{
    const idSugestao = uniqid.time();
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const curtidas = parseInt(req.body.curtidas);
    const idmatricula =parseInt(req.body.usuario_idmatricula);
    execSQLQuery("INSERT INTO sugestao (idSugestao,titulo,descricao,curtidas,usuario_idmatricula) VALUES('"+ idSugestao + "','"+titulo+"','"+descricao+"',"+curtidas+","+idmatricula+")",resp); 
});

 //Update
 
 app.patch('/sugestao/:id', (req,resp)=>{
    const idSugestao = req.body.idSugestao;
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const curtidas = parseInt(req.body.curtidas);
    const idmatricula =parseInt(req.body.usuario_idmatricula);
    execSQLQuery("UPDATE sugestao SET idSugestao='"+ idSugestao + "',titulo='"+titulo+"',descricao='"+descricao+"',curtidas="+curtidas+",usuario_idmatricula="+idmatricula+ " WHERE idSugestao='"+(req.params.id)+"'",resp);
 });
 ///////////////////////////////////////////////////////////////////// EndPoints Sugestao     //////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////// EndPoints diaLetivo  //////////////////////////////////////////////////////////////////////////

//List

app.get('/dialetivo', (req,resp)=>{
    execSQLQuery('SELECT * from dialetivo',resp);
 });
 
 ///Find
 
 app.get('/dialetivo/:id?',(req,resp)=>{
     let filtro = '';
     if(req.params.id){
         filtro = ' where turma_idTurma='+parseInt(req.params.id);
     }
     execSQLQuery('SELECT * FROM dialetivo'+filtro,resp);
 });
 
 //Delete
 
 app.delete('/dialetivo/:id',(req,resp)=>{
     execSQLQuery('Delete from dialetivo where id='+parseInt(req.params.id),resp);
 });
 
 //Create
 
 app.post('/dialetivo',(req,resp)=>{
    const id = parseInt(req.body.id);
    const ano=  parseInt(req.body.ano);
    const data = req.body.data;
    const tipo = parseInt(req.body.tipo);  
    execSQLQuery("Insert into dialetivo (id,ano,data,tipo) values("+ id + ","+ano+",'"+data+"',"+tipo+")",resp); 
 });
 
 //Update
 
 app.patch('/dialetivo/:id', (req,resp)=>{
    const id = parseInt(req.body.id);
    const ano=  parseInt(req.body.ano);
    const data = req.body.data;
    const tipo = parseInt(req.body.tipo);    
    execSQLQuery("Update dialetivo set id="+ id + ",ano = "+ano+",data='"+data+"',tipo="+tipo+" where id="+parseInt(req.params.id),resp);
 });
 
 ///////////////////////////////////////////////////////////////////// Fim EndPoints Avisos   //////////////////////////////////////////////////////////////////////
