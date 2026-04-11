<p align="center">
  <img src="frontend/public/webicon.png" alt="Logo" width="200">
</p>

# 1. Függőségek telepítése
Telepítsd a csomagokat a saját gépeden is, hogy az IDE (WebStorm/VS Code) felismerje a típusokat:
```bash  
npm install  
  ```

# 2. env fájl
```bash 
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/parkolasfoglalo?schema=public"  
  
# Redis beállítások  
REDIS_HOST=localhost  
REDIS_PORT=6379  
  
# Alkalmazás beállítások  
JWT_SECRET="valami_nagyon_biztonsagos_titkos_kulcs"  
PORT=3000  
  ```
# 3. Docker
  ```bash  
# 1. Konténerek felépítése és indítása a háttérben  
docker compose up --build -d  
  
# 2. Adatbázis táblák létrehozása (Migration)  
npx prisma migrate dev --name init  
  
# 3. Prisma kliens generálása a kódunkhoz  
npx prisma generate  
  
# Fejlesztési Munkafolyamat  
docker compose up --watch
```

# 4. Frontend futtatása
```bash
# Frontend mappában is telepíteni kell a függőségeket
npm install

# Node futtatása
npm run dev
```

# Jelenleg elkészült funkciók
- A felhasználó be tud jelentkezni
- A felhasználó tud regisztrálni
- A felhasználó ki tud jelentkezni
- A felhasználó meg tudja nézni a saját adatait és módosítani azokat
- A rendszergazda meg tudja nézni az összes felhasználót, és igény esetén törölni azokat, valamint keresni közöttük
- A felhasználó meg tudja nézni a parkoló területeket (név, cím, leírás)
- A rendszergazda meg tudja nézni a parkoló területeket, és igény esetén törölni azokat, vagy újakat létrehozni
- A felhasználó meg tudja tekinteni a jáműveit, újakat hozzáadni vagy tötölni
- A felhasználó tud parkolót foglalni, foglalásait megtekinteni és lemondani
- A rendszergazda meg tudja nézni az összes foglalást és azok részleteit

# Jelenleg elkészült oldalak
- Főoldal
- Bejelentkezés oldal
- Regisztráció oldal
- Sikeres bejelentkezés / regisztráció oldal
- Hiba a bejelentkezéskor / regisztrációkor oldal
- Felhasználói profil oldal
- Admin oldal (Felhasználók kezelése, Parkolóterületek kezelése, Foglalások kezelése)
- Parkoló területek oldal (Bejelentkezés nélkül is elérhető)
- Járműveim oldal (Bejelentkezett felhasználó járműveinek listázása, hozzáadása, törlése)
- Parkolófoglalás oldal

# Elérhető nyelvek
- Magyar
- Angol
- Japán
- Indonéz
- Német