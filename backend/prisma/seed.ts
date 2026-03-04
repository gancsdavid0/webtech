import { PrismaClient, Role, SpotType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adatbázis feltöltése folyamatban...');

    // 1. Felhasználók létrehozása
    const admin = await prisma.user.upsert({
        where: { email: 'admin@parking.hu' },
        update: {},
        create: {
            email: 'admin@parking.hu',
            password: 'password123', // Élesben ide hash kell!
            fullName: 'Rendszer Adminisztrátor',
            role: Role.ADMIN,
        },
    });

    const testUser = await prisma.user.upsert({
        where: { email: 'user@example.hu' },
        update: {},
        create: {
            email: 'user@example.hu',
            password: 'password123',
            fullName: 'Teszt Dávid',
            role: Role.USER,
        },
    });

    // 2. Parkolózóna létrehozása
    const mainZone = await prisma.parkingZone.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'A-Parkolóház Belváros',
            address: 'Deák Ferenc tér 1.',
            city: 'Budapest',
        },
    });

    console.log(`✅ Zóna létrehozva: ${mainZone.name}`);

    // 3. Árazás beállítása (Pricing)
    // Egy zónában minden típushoz (NORMAL, ELECTRIC, DISABLED) rendelünk árat
    const pricingData = [
        { type: SpotType.NORMAL, price: 500 },
        { type: SpotType.ELECTRIC, price: 850 },
        { type: SpotType.DISABLED, price: 300 },
    ];

    for (const p of pricingData) {
        await prisma.pricing.upsert({
            where: {
                parkingZoneId_spotType: {
                    parkingZoneId: mainZone.id,
                    spotType: p.type,
                },
            },
            update: { pricePerHour: p.price },
            create: {
                parkingZoneId: mainZone.id,
                spotType: p.type,
                pricePerHour: p.price,
            },
        });
    }

    // 4. Parkolóhelyek létrehozása
    const spots = [
        { number: 'A101', type: SpotType.NORMAL },
        { number: 'A102', type: SpotType.NORMAL },
        { number: 'E201', type: SpotType.ELECTRIC },
        { number: 'D301', type: SpotType.DISABLED },
    ];

    for (const s of spots) {
        await prisma.parkingSpot.upsert({
            where: { spotNumber: s.number },
            update: {},
            create: {
                spotNumber: s.number,
                type: s.type,
                parkingZoneId: mainZone.id,
                isActive: true,
            },
        });
    }

    // 5. Teszt jármű a felhasználónak
    const car = await prisma.vehicle.upsert({
        where: { licensePlate: 'ABC-123' },
        update: {},
        create: {
            licensePlate: 'ABC-123',
            make: 'Tesla',
            model: 'Model 3',
            ownerId: testUser.id,
        },
    });

    console.log('Seeding sikeresen befejeződött!');
}

main()
    .catch((e) => {
        console.error('Hiba a seedelés közben:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });