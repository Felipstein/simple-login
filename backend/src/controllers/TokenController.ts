import { UserNotFoundError } from './../errors/UserNotFoundError';
import { RequiredFieldsError } from './../errors/RequiredFieldsError';
import { IDNotGivenError } from './../errors/IDNotGivenError';
import { Request, Response } from 'express';
import { tokensRepository } from '../repositories/TokensRepository';
import { usersRepository } from '../repositories/UsersRepository';
import { someValueIsNullish } from '../utils/Validate';

class TokenController {

  async index(req: Request, res: Response) {
    const tokens = await tokensRepository.listAll();

    return res.json(tokens);
  }

  async show(req: Request, res: Response) {
    const { userId } = req.params;

    if(!userId) {
      throw new IDNotGivenError();
    }

    const userExists = await usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const tokens = await tokensRepository.listByUserId(userId);

    return res.json(tokens);
  }

  async store(req: Request, res: Response) {
    const { userId, token } = req.body;

    if(someValueIsNullish(userId, token)) {
      throw new RequiredFieldsError();
    }

    const userExists = await usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const tokenStored = tokensRepository.create({ userId, token });

    return res.json(tokenStored);
  }

}

const tokenController = new TokenController();

export { tokenController };
