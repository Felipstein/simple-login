import { IUserView } from './../entities/IUserView';
import jwt from 'jsonwebtoken';
import { IUser } from '../entities/IUser';
import EnvProvider from '../utils/EnvProvider';

class TokenProvider {

  sign(payload: string | object, options?: jwt.SignOptions) {
    return jwt.sign(payload, EnvProvider.secretKey, options);
  }

  signAuthToken(user: IUser | IUserView) {
    return this.sign({ userId: user.id }, { expiresIn: '1d' });
  }

  verify(token: string): boolean {
    try {
      jwt.verify(token, EnvProvider.secretKey);

      return true;
    } catch {
      return false;
    }
  }

  decode(token: string) {
    return jwt.decode(token);
  }

}

const tokenProvider = new TokenProvider();

export { tokenProvider };
