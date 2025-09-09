
import express from 'express'
import rotas from './routes/routes.js'
import path, {dirname} from 'path'
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json())

app.use(rotas)

app.use('/files', express.static(path.resolve(__dirname, '..','tmp')))

app.listen(4000, ()=>{
    let data = new Date()
    console.log(`servidor online ${data} `)
})