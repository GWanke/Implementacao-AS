const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended : true}))

app.listen(port,function(){
    console.log("servidor na porta 3000")
});

var ControleAcesso = function(){
	this.prioridade = '';
};


ControleAcesso.prototype = {
	setStrategy: function(prioridade){
		this.prioridade=prioridade;
	},

	path: function(){
		return this.prioridade.path;
	},
};

var Admin = function(){
	this.path = function(){
		return "homeADM.ejs"
	}
};

var Secreataria = function(){
	this.path = function(){
		return "homeSecretaria.ejs"
	}
};

var AgenteExame = function(){
	this.path = function(){
		return "homeAGENTE.ejs"
	}
};


app.set('view engine' , 'ejs');

app.get('/login', (req,res) => {
 	res.render('login.ejs');
})


app.route('/')
	.get((req, res) => {
		res.redirect('login')
	})
	//STRATEGY PATTERN APLICADO
	.post((req,res) => {
		var login = req.body.uname;
			senha = req.body.psw;
			controleAcesso = new ControleAcesso();
			admin = new Admin();
			secretaria = new Secreataria();
			agente = new AgenteExame();
		if (login == "login" && senha == "senha"){
			controleAcesso.setStrategy(admin);
		}
		if (login == "login2" && senha == "senha2"){
			controleAcesso.setStrategy(secretaria);
		}
		if (login == "login3" && senha == "senha3"){
			controleAcesso.setStrategy(agente)
		}
		res.redirect('home')
});

app.get('/home', (req,res) => {
    res.render(controleAcesso.prioridade.path());
});

app.route('/cadastroF').get((req,res) => {
    res.render('cadastroF.ejs')
});

app.route('/deleteF').get((req,res) => {
    res.render('DeletarF.ejs')
});

app.route('/show').get((req,res) => {
    res.render('listF.ejs')
});

app.route('/relatMen').get((req,res) => {
    res.render('relatorios.ejs')
});

app.route('/confirm')
    .post((req, res,next) => {
        res.render('CadConf.ejs')
        var nome = req.body.nome
        var cpf = req.body.cpf
        var rg = req.body.rg
        var salario = req.body.salario
        var cargo = req.body.cargo
        var entrada = { Nome : nome, CPF : cpf ,RG : rg, Salario: salario , Cargo: cargo};
  		console.log("Entrada no DB,quando implementado: ",entrada);
    });