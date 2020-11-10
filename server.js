
const express = require("express");
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000,function(){
	console.log ("servidor na porta 3000")
})


// Strategy Pattern para selecionar a prioridade do user para a exibicao de diferentes paginas.


var ControleAcesso = function(){
	this.prioridade = '';
};


ControleAcesso.prototype = {
	setStrategy: function(prioridade){
		this.prioridade=prioridade;
	},

	path: function(){
		return this.prioridade.path;
	}
};

var Admin = function(){
	this.path = function(){
		return "homeADM.ejs"
	}
};

var User = function(){
	this.path = function(){
		return "homeUSER.ejs"
	}
}



app.set('view engine' , 'ejs');

app.get('/login', (req,res) => {
 	res.render('login.ejs');
})


app.route('/')
	.get((req, res) => {
		res.redirect('login')
	})
	.post((req,res) => {
		var login = req.body.uname;
			senha = req.body.psw;
			controleAcesso = new ControleAcesso();
			admin = new Admin();
			user = new User();
		if (login == "login" && senha == "senha"){
			controleAcesso.setStrategy(admin);
		}
		if (login == "login2" && senha == "senha2"){
			controleAcesso.setStrategy(user)
		}
		res.redirect('home')
})


app.route('/CadastroP')       
	.get((req,res) => {
 		res.render('CadastroP.ejs');    //nao precisa de controle de acesso.
 	});

app.route('/leituraP')
	.get ((req,res) => {
		res.render('leituraP.ejs');
	});


app.get('/home', (req,res) => {
 	res.render(controleAcesso.prioridade.path());
});

app.route('/confCad')
	.post((req, res,next) => {
  		res.render('confCad.ejs');
  		var nome = req.body.nome;
  		var cpf = req.body.CPF
  		var rg = req.body.RG
  		var email = req.body.email
  		var data = req.body.date
  		var convenio = req.body.convenio
  		var entrada = { Nome : nome, CPF : cpf ,RG : rg, Email : email ,Nascimento : data, convenio : convenio ,};
  		console.log("Entrada no DB,quando implementado: ",entrada);
	});