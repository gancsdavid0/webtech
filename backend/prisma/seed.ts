import { PrismaClient, Role, SpotType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // 1. Jelszó hashelése a teszt felhasználókhoz
    const hashedPassword = await bcrypt.hash('password123', 10);

    // 2. Felhasználók létrehozása
    const admin = await prisma.user.upsert({
        where: { email: 'admin@parkolo.hu' },
        update: {},
        create: {
            email: 'admin@parkolo.hu',
            fullName: 'Rendszer Gazda',
            password: hashedPassword,
            role: Role.ADMIN,
        },
    });

    const user = await prisma.user.upsert({
        where: { email: 'teszt.elek@gmail.com' },
        update: {},
        create: {
            email: 'teszt.elek@gmail.com',
            fullName: 'Teszt Elek',
            password: hashedPassword,
            role: Role.USER,
        },
    });

    // 3. Parkolóház létrehozása
    const house = await prisma.parkingHouse.create({
        data: {
            name: 'Corvin Parkolóház',
            address: 'Futó utca 37-45.',
            city: 'Budapest',
        },
    });

    // 4. Árazás beállítása (Pricing)
    await prisma.pricing.createMany({
        data: [
            { parkingHouseId: house.id, spotType: SpotType.NORMAL, pricePerHour: 600 },
            { parkingHouseId: house.id, spotType: SpotType.ELECTRIC, pricePerHour: 900 },
            { parkingHouseId: house.id, spotType: SpotType.DISABLED, pricePerHour: 400 },
        ],
    });

    // 5. Parkolóhelyek generálása (ParkingSpot)
    const spots = [];
    // 10 normál hely
    for (let i = 1; i <= 10; i++) {
        spots.push({ spotNumber: `A-${i}`, type: SpotType.NORMAL, parkingHouseId: house.id });
    }
    // 3 elektromos hely
    for (let i = 1; i <= 3; i++) {
        spots.push({ spotNumber: `E-${i}`, type: SpotType.ELECTRIC, parkingHouseId: house.id });
    }
    // 2 mozgássérült hely
    for (let i = 1; i <= 2; i++) {
        spots.push({ spotNumber: `D-${i}`, type: SpotType.DISABLED, parkingHouseId: house.id });
    }

    await prisma.parkingSpot.createMany({ data: spots });

    console.log('Seed sikeresen lefutott:');
    console.log(`- Felhasználók létrehozva: ${admin.email}, ${user.email}`);
    console.log(`- Parkolóház: ${house.name} (${spots.length} hellyel)`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });