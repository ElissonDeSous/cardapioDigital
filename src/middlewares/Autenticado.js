import jwt from "jsonwebtoken";

export function Autenticado(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({mensagem:"token nao fornecido"});
  }
    
  const [,token] = authToken.split(" ")

  try {
    const verificar = jwt.verify(
        token,
        process.env.JWT_SECRET, 
    )

    req.userId = verificar.sub

    

    
  } catch (error) {
    res.status(401).end()
  }

  next()
}
