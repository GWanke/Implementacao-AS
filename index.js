import express from 'express'
import * as path from 'path'

const app = express();
const port = 3000;
const router = express.Router();
const pathr = path.resolve();


app.get('/',function(req,res){
    res.sendFile('CadastroF.html', {root: pathr})
})

app.listen(port,() => console.log("porta " + port))