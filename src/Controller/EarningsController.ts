import { logger } from "../Log/Logger";
import Earnings from "../Models/EarningsModels";
import { Request, Response } from "express";

//create
const createEarning = async (req: Request, res: Response) => {
  const earning = new Earnings(req.body);
  try {
    const data = earning.save();
    res.send({ message: "Ganho inserido com sucesso" });
    logger.info(`POST /earnings - ${JSON.stringify(data)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Algum erro ocorreu ao salvar",
    });
    logger.error(`POST /earnings - ${JSON.stringify(error.message)}`);
  }
};

const findAllEarnings = async (req: Request, res: Response) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(`${name}`), $options: "i" } }
    : {};
  console.log(condition);

  try {
    const data = await Earnings.find(condition);
    if (!data) {
      res.status(404).send("Não encontrado nenhum ganho");
    } else {
      res.send(data);
      logger.info(`GET /earnings findAll`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /earnings - ${JSON.stringify(error.message)}`);
  }
};

const findEarning = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await Earnings.findById({ _id: id });

    if (!data) {
      res.status(404).send("Não encontrado nenhum ganho com o id: " + id);
    } else {
      res.send(data);
      logger.info(`GET /earnings` + id);
    }
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o ganho com id: " + id });
    logger.error(`GET /earnings/${id} - ${JSON.stringify(error.message)}`);
  }
};

const updateEarning = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await Earnings.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).send("Não encontrado nenhum gasto com o id: " + id);
    } else {
      res.send(data);
      logger.info(`PUT /earnings - ${id} - ${JSON.stringify(req.body)}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao atualizar o gasto com a id: " + id });
    logger.error(`PUT /earnings - ${JSON.stringify(error.message)}`);
  }
};

const removeEarning = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await Earnings.findByIdAndRemove({ _id: id });
    if (!data) {
      res.status(404).send("Não encontrado nenhum ganho com o id: " + id);
    } else {
      res.send("Excluido o gasto de id " + id);
      logger.info(`DELETE /earnings - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o gasto com a id: " + id });
    logger.error(`DELETE /earnings - ${JSON.stringify(error.message)}`);
  }
};

//nao há motivos pra usar isso ne...
const removeAllEarnings = async (req: Request, res: Response) => {
  try {
    const data = await Earnings.deleteMany();
    if (!data) {
      res.status(404).send("Não encontrado nenhum gasto");
    } else {
      res.send("Todos os ganhos excluidos com sucesso!");
      logger.info(`DELETE /earnings`);
    }
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos os ganhos" });
    logger.error(`DELETE /earnings - ${JSON.stringify(error.message)}`);
  }
};

export default {
  createEarning,
  findAllEarnings,
  findEarning,
  updateEarning,
  removeEarning,
  removeAllEarnings,
};
