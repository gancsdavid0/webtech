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