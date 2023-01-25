import { prisma } from '../database';

interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
}

interface UserUpdateDTO {
  name: string;
  password: string;
}

export class UsersRepository {

  listAll() {
    return prisma.user.findMany({
      select: {
        id: true, name: true, email: true, createdAt: true,
      }
    });
  }

  listById(id: string) {
    return prisma.user.findFirst({
      where: { id },
      select: {
        id: true, name: true, email: true, createdAt: true,
      }
    });
  }

  listByEmail(email: string, returnPassword = false) {
    return prisma.user.findFirst({
      where: { email },
      select: {
        id: true, name: true, email: true, createdAt: true, password: returnPassword
      }
    });
  }

  create({ name, email, password }: UserCreateDTO) {
    return prisma.user.create({
      data: {
        name, email, password,
      },
      select: {
        id: true, name: true, email: true, createdAt: true,
      }
    });
  }

  update(id: string, { name, password }: UserUpdateDTO) {
    return prisma.user.update({
      where: { id },
      data: {
        name, password,
      },
      select: {
        id: true, name: true, email: true, createdAt: true,
      }
    });
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
  }

}

const usersRepository = new UsersRepository();

export { usersRepository };
