import { Router } from "express";
import {Autenticado} from '../middlewares/Autenticado.js'

import CreateUsers from '../controllers//user/createUsersControllers.js'
import authUsers from "../controllers/user/authUsers.js";
import DetalhesUsuarios from "../controllers/user/detalhesUserController.js";
const rotas = Router();

const usuarios = new CreateUsers()
const autenticar = new authUsers()
const detalhesusuarios = new DetalhesUsuarios()

// cadastro usuario
rotas.get('/users', usuarios.procurarUsuarios)
rotas.post('/users', usuarios.createUsers)
rotas.put('/users/:id',usuarios.updateUsers)
rotas.delete('/users/:id', usuarios.deleteUser)

//login usuario
rotas.post('/session', autenticar.auth)

//detalhes do usuario
rotas.get('/me', Autenticado, detalhesusuarios.DetalhesUsuarios)

export default rotas