import prisma from "../../prisma/prismaClient.js"
class produtos{
    async uploadImagem(){

    }
    async listarProdutos(request,response){

        const produtos = await prisma.produtos.findMany(
            {
                select:{
                    id:true,
                    name:true,
                    price:true,
                    description:true,
                    banner:true,
                    Category:{
                       select:{
                        id:true,
                        name:true
                       }
                    }
                }
            }
            
        )

        return response.status(200).json(produtos)
    }

    async criarProdutos(request,response){
         const {name,price,description,CategoriaId} = request.body
         

         if(name == "" || price == "" || description == "" || CategoriaId == ""){
              return response.status(400).json({mensagem:'campos vazios insira corretamente'})
         }

         if(!request.file){
            return response.stsut(400).json({mensagem:'nao esta passando imagem'})
         }else{
            const {originalname,filename} = request.file

            console.log(filename)
              await prisma.produtos.create({
            data:{
                name,
                price,
                description,
                banner:filename,
                Category :{
                     connect:{id:Number(CategoriaId)}
                }
               
                
            }
            
            
         })
         }

       

         return response.status(200).json({mensagem:'produto cadastrado com sucesso'})


    }
}
export default produtos