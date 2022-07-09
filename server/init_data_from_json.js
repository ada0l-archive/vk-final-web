const pkg = require("@prisma/client");
const fs = require("fs");
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

var inboxData = JSON.parse(fs.readFileSync("./small.json"));

(async () => {
    await prisma.author.deleteMany();
    await prisma.message.deleteMany();
    inboxData.forEach(async (item) => {
        // prepare author
        let author = await prisma.author.findFirst({
            where: {
                email: item.author.email,
            },
        });
        if (author == undefined) {
            author = await prisma.author.create({
                data: item.author,
            })
        }
        delete item.author;
        item.authorId = author.id;

        // prepare file
        if ("file" in item) {
            let file = await prisma.file.create({
                data: item.file,
            });
            delete item.file
            item.fileId = file.id;
        }

        console.log(await prisma.Message.create({
            data: item,
        }));

    });
})();
