-- CreateTable
CREATE TABLE "User" (
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "netWorth" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userName")
);

-- CreateTable
CREATE TABLE "OwnedAstronauts" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "astronautName" TEXT NOT NULL,

    CONSTRAINT "OwnedAstronauts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnlockedAstronauts" (
    "astronautName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "UnlockedAstronauts_pkey" PRIMARY KEY ("astronautName")
);

-- CreateTable
CREATE TABLE "Astronauts" (
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "modelUrl" TEXT NOT NULL,
    "shopIconUrl" TEXT NOT NULL,
    "isEngineer" BOOLEAN NOT NULL,
    "isResearcher" BOOLEAN NOT NULL,
    "isPilot" BOOLEAN NOT NULL,

    CONSTRAINT "Astronauts_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "OwnedAstronauts" ADD CONSTRAINT "OwnedAstronauts_astronautName_fkey" FOREIGN KEY ("astronautName") REFERENCES "Astronauts"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedAstronauts" ADD CONSTRAINT "OwnedAstronauts_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlockedAstronauts" ADD CONSTRAINT "UnlockedAstronauts_astronautName_fkey" FOREIGN KEY ("astronautName") REFERENCES "Astronauts"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlockedAstronauts" ADD CONSTRAINT "UnlockedAstronauts_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
