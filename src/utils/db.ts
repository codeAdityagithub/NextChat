// db.js
import postgres from "postgres";

const sql = postgres({
    ssl: true,
    idle_timeout: 100,
});

export default sql;
