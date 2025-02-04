const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const prismaQuery = {
  find: {
    user: {
      byEmail: async (email) => {
        return await prisma.user.findFirst({
          where: {
            email: email,
          },
          include: {
            profile: true,
            profileId: false,
          },
        });
      },
    },
  },
  create: {
    user: async ({ email, password, firstname, lastname }) => {
      await prisma.user.create({
        data: {
          email: email,
          password: await bcrypt.hash(password, 10),
          profile: {
            create: {
              firstname: firstname,
              lastname: lastname,
            },
          },
        },
      });
    },
  },
  delete: {
    user: {
      byEmail: async (email) => {
        await prisma.user.delete({
          where: {
            email: email,
          },
        });
      },
    },
  },
};

module.exports = prismaQuery;
