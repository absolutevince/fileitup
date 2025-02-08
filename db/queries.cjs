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
          },
        });
      },
      byId: async (id) => {
        return await prisma.user.findFirst({
          where: {
            id: id,
          },
          include: {
            profile: { include: { folder: { include: { file: true } } } },
          },
        });
      },
    },
    folder: {
      byId: async (id) => {
        return await prisma.folder.findFirst({
          where: {
            id: id,
          },
          include: {
            file: true,
          },
        });
      },
    },
    file: {
      byFolder: async (folderId) => {
        return await prisma.file.findMany({
          where: {
            folderId: folderId,
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
    folder: async ({ folderName, profileId }) => {
      await prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          folder: {
            create: {
              name: folderName,
            },
          },
        },
      });
    },
    file: async ({ name, folderId, size }) => {
      await prisma.folder.update({
        where: {
          id: folderId,
        },
        data: {
          file: {
            create: {
              name: name,
              size: size,
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
