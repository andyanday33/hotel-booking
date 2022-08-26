const { PrismaClient, Category } = require("@prisma/client");

const rooms = require("../data/rooms.json");

const prisma = new PrismaClient();

const seedRooms = async () => {
  try {
    await prisma.room.deleteMany();
    // process all rooms
    const processedRooms = rooms.map((room) => {
      if (!["KING", "TWINS", "SINGLE"].includes(room.category)) {
        throw Error;
      }
      let images = room.images;
      room.images = {
        createMany: {
          data: images,
          skipDuplicates: true,
        },
      };
      return room;
    });

    const promises = [];
    for (const element of processedRooms) {
      promises.push(
        prisma.room.create({
          data: element,
        })
      );
    }

    await Promise.allSettled(promises);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
