-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "filePath" TEXT NOT NULL,
    "preview" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "authorId" INTEGER,
    "fileId" INTEGER,
    "id" SERIAL NOT NULL,
    "dateTime" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "newThread" BOOLEAN NOT NULL,
    "important" BOOLEAN NOT NULL,
    "flag" BOOLEAN NOT NULL,
    "confidence" BOOLEAN NOT NULL,
    "finance" BOOLEAN NOT NULL,
    "read" BOOLEAN NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
