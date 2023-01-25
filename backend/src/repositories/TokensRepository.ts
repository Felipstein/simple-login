import { prisma } from '../database';

interface TokenCreateDTO {
  userId: string;
  token: string;
}

class TokensRepository {

  listAll() {
    return prisma.token.findMany();
  }

  listByUserId(userId: string) {
    return prisma.token.findMany({ where: { userId } });
  }

  create({ userId, token }: TokenCreateDTO) {
    return prisma.token.create({
      data: {
        userId, token,
      }
    });
  }

}

const tokensRepository = new TokensRepository();

export { tokensRepository };
