import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db";
import AuthRoutes from './routes/auth.routes'
import UserRoutes from "./routes/user.routes"
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth',AuthRoutes);
app.use("/api/user",UserRoutes);

const PORT = process.env.PORT || 3000;

pool.connect((err, client, release) => {
    if (err) {
        return console.error('PostgreSQL Bağlantı Hatası', err.stack)
    }
    release()
    console.log('PostgreSQL Bağlantısı Başarılı');
})

app.listen(PORT, () => {
    console.log(`Server Aktif ${PORT} Portu Çalışıyor`);
});

