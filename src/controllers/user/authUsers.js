import prisma from "../../prisma/prismaClient.js";
import { compare } from "bcrypt";

import  pkg  from "jsonwebtoken";
const {sign} = pkg

class authUsers {
  async auth(request, response) {
    const { email, password } = request.body;
   
      const usuario = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (!usuario) {
        response.status(400).json({ mensagem: "email ja existe" });
      }
      const senha = await compare(password, usuario.senha);
      if (!senha) {
        response.status(400).json({ mensagem: "senha incorreta" });
      }
      console.log(email, password);

     const tokens = sign(
      {
        name:usuario.name,
        email:usuario.email,
       },
      process.env.JWT_SECRET,{
        subject:String(usuario.id),
        expiresIn:'30d'
      }
      )

      response.status(200).json({id:usuario.id,nome:usuario.name,email:usuario.email,token:tokens})
    
  }
}

export default authUsers;
