/// <reference path="./types/express.d.ts" />
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db";
import AuthRoutes from './routes/auth.routes'
import UserRoutes from "./routes/user.routes"
import RoleRoutes from "./routes/roles.routes"
import DepartmentRoutes from "./routes/departments.routes"
import CustomerRoutes from "./routes/customer.routes"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth',AuthRoutes);
app.use("/api/user",UserRoutes);
app.use("/api/roles",RoleRoutes);
app.use("/api/department",DepartmentRoutes);
app.use("/api/customer",CustomerRoutes);


console.log("Customer route mounted");

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

