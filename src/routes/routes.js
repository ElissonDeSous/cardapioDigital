import { Router } from "express";
import CreateUsers from '../controllers//user/createUsersControllers.js'
import authUsers from "../controllers/user/authUsers.js";
const rotas = Router();

const usuarios = new CreateUsers()
const autenticar = new authUsers()

// cadastro usuario
rotas.get('/users', usuarios.procurarUsuarios)
rotas.post('/users', usuarios.createUsers)
rotas.put('/users/:id',usuarios.updateUsers)
rotas.delete('/users/:id', usuarios.deleteUser)

//login usuario
rotas.post('/session', autenticar.auth)

export default rotas