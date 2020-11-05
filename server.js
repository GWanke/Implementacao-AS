const express = require("express");
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000,function(){
	console.log ("servidor na porta 3000")
})


app.set('view engine' , 'ejs');


app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.route('/CadastroP')
.get((req,res)=>{
  res.render('CadastroP.ejs')
})

