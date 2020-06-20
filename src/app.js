const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
//GET /repositories: Rota que lista todos os repositórios
//should be able to list the repositories: Para que esse teste passe, sua aplicação deve permitir que seja retornado um array com todos os repositórios que foram criados até o momento.

return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  //A rota deve receber title, url e techs dentro do 
  //corpo da requisição, sendo a URL o link para o github 
  //desse repositório. Ao cadastrar um novo projeto, ele deve 
  //ser armazenado dentro de um objeto no seguinte formato: 
  //{ id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', 
  //techs: ["Node.js", "..."], likes: 0 }; Certifique-se que o ID seja um UUID, e de sempre iniciar os likes como 0
  
  
  //should be able to create a new repository: Para que esse teste passe, sua aplicação deve permitir que um repositório seja criado, e retorne um json com o projeto criado.

  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);

  //should be able to create a new repository

});

app.put("/repositories/:id", (request, response) => {
  //PUT /repositories/:id: A rota deve alterar apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota
  //should be able to update repository: Para que esse teste passe, sua aplicação deve permitir que sejam alterados apenas os campos url, title e techs
 
  const {id} = request.params;
  const {title,url,techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    //should not be able to update a repository that does not exist: Para que esse teste passe, você deve validar na sua rota de update se o id do repositório enviado pela url existe ou não. Caso não exista, retornar um erro com status 400
     return response.status(400).send({error: 'Registro não encontrado'});
  };

//should not be able to update repository likes manually: Para que esse teste passe, você não deve permitir que sua rota de update altere diretamente os likes desse repositório, mantendo o mesmo número de likes que o repositório já possuia antes da atualização. Isso porque o único lugar que deve atualizar essa informação é a rota responsável por aumentar o número de likes.
  const oldlike = repositories[repositoryIndex].likes;
//should not be able to update repository likes manually

  const repository ={
    id,
    title,
    url,
    techs,
    likes: oldlike, 
  };

 repositories[repositoryIndex] = repository;


  return response.json(repository);
//should be able to update repository


});

app.delete("/repositories/:id", (request, response) => {
  //DELETE /repositories/:id: A rota deve deletar o repositório com o id presente nos parâmetros da rota
  //should be able to delete the repository: Para que esse teste passe, você deve permitir que a sua rota de delete exclua um projeto, e ao fazer a exclusão, ele retorne uma resposta vazia, com status 204

const {id} = request.params;

const repositoryIndex = repositories.findIndex(repository => repository.id === id);

if(repositoryIndex < 0){
//should not be able to delete a repository that does not exist: Para que esse teste passe, você deve validar na sua rota de delete se o id do repositório enviado pela url existe ou não. Caso não exista, retornar um erro com status 400.
return response.status(400).send({error: 'Registro não encontrado'});
};

repositories.splice(repositoryIndex);

return response.status(204).send();

//should be able to delete the repository:
});

app.post("/repositories/:id/like", (request, response) => {
 //POST /repositories/:id/like: A rota deve aumentar o número de likes do repositório específico escolhido através do id presente nos parâmetros da rota, a cada chamada dessa rota, o número de likes deve ser aumentado em 1
  const {id} = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if(!repository){
    //should not be able to like a repository that does not exist: Para que esse teste passe, você deve validar na sua rota de like se o id do repositório enviado pela url existe ou não. Caso não exista, retornar um erro com status 400
    return response.status(400).json({error: 'Repositorio não encontrado'});
  };

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
