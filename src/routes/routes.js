import { Router } from "express";
import {Autenticado} from '../middlewares/Autenticado.js'
import multer from "multer";
import CreateUsers from '../controllers//user/createUsersControllers.js'
import authUsers from "../controllers/user/authUsers.js";
import DetalhesUsuarios from "../controllers/user/detalhesUserController.js";
import categoria from "../controllers/cateogria/criarcategoriaController.js";
import produtos from "../controllers/produtos/produtosController.js";
import uploadConfig from '../config/multer.js'
const rotas = Router();
const UploadConfig = multer(uploadConfig.upload("./tmp"))
const usuarios = new CreateUsers()
const autenticar = new authUsers()
const detalhesusuarios = new DetalhesUsuarios()
const Categoria = new categoria()
const produto = new produtos()

// cadastro usuario
rotas.get('/users', usuarios.procurarUsuarios)
rotas.post('/users', usuarios.createUsers)
rotas.put('/users/:id',usuarios.updateUsers)
rotas.delete('/users/:id', usuarios.deleteUser)

//login usuario
rotas.post('/session', autenticar.auth)

//detalhes do usuario
rotas.get('/me', Autenticado, detalhesusuarios.DetalhesUsuarios)


/// rotas categoria
rotas.get('/category', Autenticado, Categoria.buscarCategoria)
rotas.post('/category', Autenticado, Categoria.criarCategoria)

// rotas produtos
rotas.get('/produtos', Autenticado, produto.listarProdutos)
rotas.post('/produtos', Autenticado,UploadConfig.single('file'), produto.criarProdutos)



export default rotas