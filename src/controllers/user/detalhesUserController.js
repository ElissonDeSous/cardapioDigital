import prisma from '../../prisma/prismaClient.js'

class DetalhesUsuarios{
    async DetalhesUsuarios(req,res){
        const users =  req.userId
       const dadosUsers = await prisma.user.findFirst({
          where:{
          id:Number(users)
          },select:{
            id:true,
            name:true,
            email:true
          }
       })

       res.status(200).json(dadosUsers)
    }
}
export default DetalhesUsuarios