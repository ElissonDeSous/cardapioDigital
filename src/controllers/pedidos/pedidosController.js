import prisma from "../../prisma/prismaClient.js";
export default class pedidos {


    async criarPedidos(request,response){
        const {mesa,status,name} = request.body
        await prisma.pedido.create({
            data:{
                mesa,
                status,
                name
            }
        })

        response.status(200).json({mensagem:'Pedido criado com sucesso'})
    }

     async deletarPedido (request,response){
          const {id} = request.params
          const identificador = Number(id)
          await prisma.pedido.delete({
           where :{
                id:identificador
            }
          })

          response.status(200).json({mensagem:'deletado com sucesso'})

     }

}

