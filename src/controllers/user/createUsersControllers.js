import prisma from '../../prisma/prismaClient.js'
import bcrypt from 'bcrypt'

class CreateUsers{
   async procurarUsuarios (req,res){
        try {
             const database = await prisma.user.findMany()
             res.status(200).json(database)
        } catch (error) {
            res.status(500).json({mensagem:error.message})
        }
    }
    async createUsers(req,res){
        const {name, email , senha} = req.body
        const senhaCriptografada = await bcrypt.hash(senha,10)
        try {

           const emailExiste = prisma.user.findFirst(
            {
                where:{
                    email:email
                }
            }
          )
          if(emailExiste){
              res.status(400).json({mensagem:"email ja esta cadastrado no sistema"})
          }

           await prisma.user.create(
             {
                 data:{
                    name,
                    email,
                    senha:senhaCriptografada
                 }
             }
           )

            

           res.status(200).json({mensagem:'usuario criado com sucesso'})
        } catch (error) {
          res.status(500).json({error:error.message})

        

           
        }
    }

    async updateUsers(req,res){
        const {name, email,senha} =  req.body
        const senhaCriptografada = await bcrypt.hash(senha,10)

        const {id} = req.params
        const identificador  = Number(id)


        try {
            await prisma.user.update(
                {
                    data:{
                        name,
                        email,
                        senha:senhaCriptografada
                    },
                    where:{
                        id:identificador
                    }
                }
            )
            
            res.status(200).json({mensagem:'usuario atualizado com sucesso'})
        } catch (error) {
            res.status(500).json({mensagem:error.message})

       

          
        }
    }

    async deleteUser(req,res){
        const {id} = req.params
        const identificador = Number(id)
        try {
           await prisma.user.delete({
            where:{
                id:identificador
            }
           })
           res.status(200).json({mensagem:"usuario deletado com sucesso"})
        } catch (error) {
            res.status(500).json({mensagem:error.message})
        }
    }
}
export default CreateUsers