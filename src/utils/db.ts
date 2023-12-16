import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/models/schema";
// import postgres from "postgres";
import { Pool } from "pg";

// const connectionString = process.env.DATABASE_URL as string;
// const queryClient = postgres(
//     "postgres://postgres:postgreadi@0.0.0.0:5432/nextchat"
// );
// const db = drizzle(queryClient);

// host=localhost port=5432 dbname=nextchat user=postgres sslmode=prefer connect_timeout=10
const client = new Pool({
    connectionString: "postgres://postgres:postgreadi@localhost:5432/nextchat",
    ssl: { rejectUnauthorized: false },
});

client.on("connect", () => {
    console.log("Connected to database Manully");
});

client.connect((err) => {
    if (err) {
        console.log("Error connecting to database Manually");
    } else {
        console.log("Connected to database Manually");
    }
});

const db = drizzle(client, { schema: schema });
export default db;
