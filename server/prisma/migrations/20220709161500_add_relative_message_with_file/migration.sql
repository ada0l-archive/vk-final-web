-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "authorId" INTEGER,
    "fileId" INTEGER,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateTime" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "newThread" BOOLEAN NOT NULL,
    "important" BOOLEAN NOT NULL,
    "flag" BOOLEAN NOT NULL,
    "confidence" BOOLEAN NOT NULL,
    "finance" BOOLEAN NOT NULL,
    "read" BOOLEAN NOT NULL,
    CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Message_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("authorId", "confidence", "dateTime", "finance", "flag", "id", "important", "newThread", "read", "text", "title") SELECT "authorId", "confidence", "dateTime", "finance", "flag", "id", "important", "newThread", "read", "text", "title" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
