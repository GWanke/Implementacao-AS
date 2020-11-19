
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
})


	app.route('/CadastroP')       
	.get((req,res) => {
 		res.render('CadastroP.ejs');    //nao precisa de controle de acesso.
	 });
	 
	app.route('/CadastroM')       
	 .get((req,res) => {
		  res.render('CadastroM.ejs');    //nao precisa de controle de acesso.
	  });

	app.route('/CadastroE')       
	  .get((req,res) => {
		   res.render('CadastroE.ejs');    //nao precisa de controle de acesso.
	   });
	app.route('/CadastroA')       
	   .get((req,res) => {
			res.render('CadastroA.ejs');    //nao precisa de controle de acesso.
		});

		

app.route('/leituraP')
	.get ((req,res) => {
		// passa a prioridade do user para o gerenciamento de funcionalidades.
		res.render('leituraP.ejs',{prioridade:controleAcesso.prioridade.path().slice(4,-1).replace('.ej','').trim()});
	});

	app.route('/deleteA')
	.get ((req,res) => {
		// passa a prioridade do user para o gerenciamento de funcionalidades.
		res.render('deleteA.ejs',{prioridade:controleAcesso.prioridade.path().slice(4,-1).replace('.ej','').trim()});
	});

	app.route('/leituraPreco')
	.get ((req,res) => {
		// passa a prioridade do user para o gerenciamento de funcionalidades.
		res.render('leituraPreco.ejs',{prioridade:controleAcesso.prioridade.path().slice(4,-1).replace('.ej','').trim()});
	});

	app.route('/leituraM')
	.get ((req,res) => {
		// passa a prioridade do user para o gerenciamento de funcionalidades.
		res.render('leituraM.ejs',{prioridade:controleAcesso.prioridade.path().slice(4,-1).replace('.ej','').trim()});
	});

app.get('/home', (req,res) => {
 	res.render(controleAcesso.prioridade.path());
});
//id provem da URL. No momento hard-coded.Facil transicao no futuro com mongo.
app.route('/editP/:id') 
	.get((req,res) => {
		var id = req.params.id
		res.render('editP.ejs', {id:id});
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


//relatorio func
app.get('/relatFunc', (req,res) => {
	res.render('relatFunc.ejs')
});
app.get('/examesT', (req,res) => {
	res.render('examesT.ejs')
});