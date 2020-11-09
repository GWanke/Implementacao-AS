//import FormsUser from "./usuario";
//import FormsAdm from "./adm";
const express = require("express");
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000,function(){
	console.log ("servidor na porta 3000")
})

// const ControleAcesso = {
// 	Usuario: {
// 		render(usuario){
// 			return <FormsAdm{...usuario}>
// 		}
// 	}
// }




app.set('view engine' , 'ejs');



app.get('/', (req, res) => {
	res.render('home.ejs')
})

app.route('/CadastroP')       
	.get((req,res)=>{
 		res.render('CadastroP.ejs');    //nao precisa de controle de acesso.
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


