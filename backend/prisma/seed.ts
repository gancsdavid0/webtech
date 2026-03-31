import { PrismaClient, Role, SpotType } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Adatbázis feltöltése folyamatban...');

    // 1. Felhasználók létrehozása
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const admin = await prisma.user.upsert({
        where: { email: 'admin@parking.hu' },
        update: { password: hashedPassword },
        create: {
            email: 'admin@parking.hu',
            password: hashedPassword,
            fullName: 'Rendszer Adminisztrátor',
            role: Role.ADMIN,
        },
    });

    const testUser = await prisma.user.upsert({
        where: { email: 'user@example.hu' },
        update: { password: hashedPassword },
        create: {
            email: 'user@example.hu',
            password: hashedPassword,
            fullName: 'Teszt Dávid',
            role: Role.USER,
        },
    });

    // 2. Több parkolóház (Zóna) definiálása
    const zonesToCreate = [
        { 
            name: 'A-Parkolóház Belváros', 
            address: 'Deák Ferenc tér 1.', 
            city: 'Budapest',
            description: 'Központi parkolóház a Deák térnél.'
        },
        { 
            name: 'B-Parkolóház Corvin', 
            address: 'Futó utca 37.', 
            city: 'Budapest',
            description: 'Modern parkolóház a bevásárlóközpont mellett.'
        },
        { 
            name: 'C-Parkolóház Westend', 
            address: 'Váci út 1-3.', 
            city: 'Budapest',
            description: 'Nagy kapacitású parkoló a pályaudvarnál.'
        },
    ];

    for (const zoneData of zonesToCreate) {
        const zone = await prisma.parkingZone.upsert({
            where: { name: zoneData.name },
            update: {
                description: zoneData.description,
                address: zoneData.address,
                city: zoneData.city
            },
            create: zoneData,
        });

        console.log(`✅ Zóna kész: ${zone.name}`);

        // 3. Árazás beállítása minden zónához
        const pricingData = [
            { type: SpotType.NORMAL, price: 500 },
            { type: SpotType.ELECTRIC, price: 850 },
            { type: SpotType.DISABLED, price: 300 },
        ];

        for (const p of pricingData) {
            await prisma.pricing.upsert({
                where: {
                    parkingZoneId_spotType: {
                        parkingZoneId: zone.id,
                        spotType: p.type,
                    },
                },
                update: { pricePerHour: p.price },
                create: {
                    parkingZoneId: zone.id,
                    spotType: p.type,
                    pricePerHour: p.price,
                },
            });
        }

        // 4. Teszt parkolóhelyek generálása (Zónánként 4 db)
        const spots = [
            { number: `${zone.name[0]}-101`, type: SpotType.NORMAL },
            { number: `${zone.name[0]}-102`, type: SpotType.NORMAL },
            { number: `${zone.name[0]}-E201`, type: SpotType.ELECTRIC },
            { number: `${zone.name[0]}-D301`, type: SpotType.DISABLED },
        ];

        for (const s of spots) {
            await prisma.parkingSpot.upsert({
                where: { spotNumber: s.number },
                update: {},
                create: {
                    spotNumber: s.number,
                    type: s.type,
                    parkingZoneId: zone.id,
                    isActive: true,
                },
            });
        }
    }

    // 5. Teszt jármű a felhasználónak
    await prisma.vehicle.upsert({
        where: { licensePlate: 'ABC-123' },
        update: {},
        create: {
            licensePlate: 'ABC-123',
            make: 'Tesla',
            model: 'Model 3',
            ownerId: testUser.id,
        },
    });

    console.log('✨ Seedelés sikeresen befejeződött!');
}

main()
    .catch((e) => {
        console.error('❌ Hiba a seedelés közben:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });