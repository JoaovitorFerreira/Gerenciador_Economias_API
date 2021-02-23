import { logger } from "../Log/Logger";
import Expenses from "../Models/ExpensesModel";
import { Request, Response } from "express";

//create
const createExpense = async (req: Request, res: Response) => {
  const expense = new Expenses(req.body);
  try {
    const data = expense.save();
    res.send({ message: "Gasto inserido com sucesso" });
    logger.info(`POST /expenses- ${JSON.stringify(data)}`);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Algum erro ocorreu ao salvar",
    });
    logger.error(`POST /expenses - ${JSON.stringify(error.message)}`);
  }
};

const findAllExpenses = async (req: Request, res: Response) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(`${name}`), $options: "i" } }
    : {};
  console.log(condition);

  try {
    const data = await Expenses.find(condition);
    if (!data) {
      res.status(404).send("Não encontrado nenhum gasto");
    } else {
      res.send(data);
      logger.info(`GET /expenses findAll`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /expenses - ${JSON.stringify(error.message)}`);
  }
};

const findExpense = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await Expenses.findById({ _id: id });

    if (!data) {
      res.status(404).send("Não encontrado nenhum gasto com o id: " + id);
    } else {
      res.send(data);
      logger.info(`GET /expenses` + id);
    }
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o gasto com id: " + id });
    logger.error(`GET /expenses/${id} - ${JSON.stringify(error.message)}`);
  }
};

const updateExpense = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }

  const id = req.params.id;

  try {
    const data = await Expenses.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!data) {
      res.status(404).send("Não encontrado nenhum gasto com o id: " + id);
    } else {
      res.send(data);
      logger.info(`PUT /expenses - ${id} - ${JSON.stringify(req.body)}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao atualizar o gasto com a id: " + id });
    logger.error(`PUT /expenses - ${JSON.stringify(error.message)}`);
  }
};

const removeExpense = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const data = await Expenses.findByIdAndRemove({ _id: id });
    if (!data) {
      res.status(404).send("Não encontrado nenhum gasto com o id: " + id);
    } else {
      res.send("Excluido o gasto de id " + id);
      logger.info(`DELETE /expenses - ${id}`);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar o gasto com a id: " + id });
    logger.error(`DELETE /expenses - ${JSON.stringify(error.message)}`);
  }
};

//nao há motivos pra usar isso ne...
const removeAllExpenses = async (req: Request, res: Response) => {
  try {
    const data = await Expenses.deleteMany();
    if (!data) {
      res.status(404).send("Não encontrado nenhum gasto");
    } else {
      res.send("Todos os gastos excluidos com sucesso!");
      logger.info(`DELETE /expenses`);
    }
  } catch (error) {
    res.status(500).send({ message: "Erro ao excluir todos os gastos" });
    logger.error(`DELETE /expenses - ${JSON.stringify(error.message)}`);
  }
};

export default {
  createExpense,
  findAllExpenses,
  findExpense,
  updateExpense,
  removeExpense,
  removeAllExpenses,
};
