const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended : true}))

app.listen(port,function(){
    console.log("servidor na porta 3000")
});

app.set('view engine', 'ejs');

app.route('/')
    .get((req,res) => {
        res.render('DeletarF.ejs');
    });

app.get('/editF', (req,res) => {
    res.render('editF.ejs')
});

app.get('/listF',(req,res) => {
    res.render('listF.ejs')
});

app.get('/relatoriosF',(req,res)=>{
    res.render('relatorios.ejs')
});

app.route('/CadConf')
    .post((req, res,next) => {
          var nome = req.body.fnome;
          var cpf = req.body.fcpf
          var rg = req.body.frg
          var salario = req.body.fsalario
          var cargo = req.body.cargo
          var entrada = { Nome : fnome, CPF : fcpf ,RG : frg, Salario: fsalario , Cargo: fcargo};
          console.log("Entrada no DB,quando implementado: ",entrada);
    });