import { Client } from "pg";

const client: Client = new Client({
    user: 'aleviannaf',
    host: 'localhost',
    port: 5432,
    password: '2406',
    database: 'm4_aula'
})

const startDatabade = async(): Promise<void> =>{
    await client.connect()
    console.log('Database connected')
}

export {client, startDatabade}