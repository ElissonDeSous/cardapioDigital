import prisma from "../../prisma/prismaClient.js";

class categoria {
  async buscarCategoria(request, response) {
    const dados = await prisma.categoria.findMany({
      select: {
        name: true,
      },
    });
    response.json(dados);
  }

  async criarCategoria(request, response) {
    const { title } = request.body;

    if (title === "") {
      return response.status(400).json("ocorreu um erro inesperado");
    }

    await prisma.categoria.create({
      data: {
        name: title,
      },
    });

    return response
      .status(201)
      .json({ mensagem: "categoria cadastrado com sucesso" });
  }
}

export default categoria;
