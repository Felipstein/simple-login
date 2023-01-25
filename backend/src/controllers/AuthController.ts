/* eslint-disable @typescript-eslint/ban-ts-comment */
import { InvalidTokenError } from './../errors/InvalidTokenError';
import { UserNotFoundError } from './../errors/UserNotFoundError';
import { RequiredFieldsError } from './../errors/RequiredFieldsError';
import { Request, Response } from 'express';
import { APIError } from './../errors/APIError';
import { someValueIsNullish } from '../utils/Validate';
import { usersRepository } from '../repositories/UsersRepository';
import { tokensRepository } from '../repositories/TokensRepository';
import { crypt } from '../providers/CryptProvider';
import { tokenProvider } from '../providers/TokenProvider';

class AuthController {

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if(someValueIsNullish(email, password)) {
      throw new RequiredFieldsError();
    }

    const user = await usersRepository.listByEmail(email, true);
    if(!user) {
      throw new UserNotFoundError();
    }

    if(!await crypt.comparePassword(password, user)) {
      throw new APIError(401, 'Senha inválida');
    }

    const token = tokenProvider.signAuthToken(user);
    await tokensRepository.create({ userId: user.id, token });

    return res.json({ user, token });
  }

  async signup(req: Request, res: Response) {
    const { name, email, password, confirmPassword } = req.body;

    if(someValueIsNullish(name, email, password, confirmPassword)) {
      throw new RequiredFieldsError();
    }

    const emailAlreadyExists = await usersRepository.listByEmail(email);
    if(emailAlreadyExists) {
      throw new APIError(400, 'Email já em uso');
    }

    if(password !== confirmPassword) {
      throw new APIError(400, 'As senhas não coincidem');
    }

    const encryptedPassword = await crypt.hash(password);
    const user = await usersRepository.create({ name, email, password: encryptedPassword });

    const token = tokenProvider.signAuthToken(user);
    await tokensRepository.create({ userId: user.id, token });

    return res.json({ user, token });
  }

  async validate(req: Request, res: Response) {
    const { token } = req.body;

    if(!token) {
      throw new APIError(400, 'Token não informado');
    }

    if(!tokenProvider.verify(token)) {
      throw new APIError(401, 'Sessão expirada');
    }

    //@ts-ignore
    const { userId } = tokenProvider.decode(token);

    if(!userId) {
      throw new InvalidTokenError();
    }

    const user = await usersRepository.listById(userId);
    if(!user) {
      throw new InvalidTokenError();
    }

    return res.json(user);
  }

}

const authController = new AuthController();

export { authController };
