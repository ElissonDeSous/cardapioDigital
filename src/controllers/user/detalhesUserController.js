import prisma from '../../prisma/prismaClient.js'

class DetalhesUsuarios{
    async DetalhesUsuarios(req,res){
         res.json({ok:true})
    }
}
export default DetalhesUsuarios