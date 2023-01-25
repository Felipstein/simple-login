import { IUser } from './../entities/IUser';

import bcrypt from 'bcrypt';

class CryptProvider {

  hash(text: string) {
    return bcrypt.hash(text, 10);
  }

  compare(plainText: string, cryptedText: string) {
    return bcrypt.compare(plainText, cryptedText);
  }

  comparePassword(plainPassword: string, user: IUser) {
    return bcrypt.compare(plainPassword, user.password);
  }

}

const crypt = new CryptProvider();

export { crypt };
