import sql from "mssql";
import { config } from "dotenv";
config()

const sqlConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const conexion = async () => {
    try {
        const pool = await sql.connect(sqlConfig);
        return pool.request(); 
    } catch (error) {
        console.log("error al conectar DATABASE");
    }
  
};

export {sql};
