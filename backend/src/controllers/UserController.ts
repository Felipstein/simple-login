import { RequiredFieldsError } from './../errors/RequiredFieldsError';
import { UserNotFoundError } from './../errors/UserNotFoundError';
import { IDNotGivenError } from './../errors/IDNotGivenError';
import { Request, Response } from 'express';
import { usersRepository } from '../repositories/UsersRepository';
import { someValueIsNull } from '../utils/Validate';
import { hash } from 'bcrypt';

class UserController {

  async index(req: Request, res: Response) {
    const users = await usersRepository.listAll();

    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    if(!id) {
      throw new IDNotGivenError();
    }

    const user = await usersRepository.listById(id);
    if(!user) {
      throw new UserNotFoundError();
    }

    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, password } = req.body;

    if(!id) {
      throw new IDNotGivenError();
    }

    if(someValueIsNull(name, password)) {
      throw new RequiredFieldsError();
    }

    const userExists = await usersRepository.listById(id);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const encryptedPassword = await hash(password, 10);
    const userUpdated = await usersRepository.update(id, { name, password: encryptedPassword });

    return res.json(userUpdated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if(!id) {
      throw new IDNotGivenError();
    }

    const userExists = await usersRepository.listById(id);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    await usersRepository.delete(id);

    return res.sendStatus(204);
  }

}

const userController = new UserController();

export { userController };
