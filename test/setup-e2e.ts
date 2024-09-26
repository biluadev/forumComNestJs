import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { PrismaClient } from "node_modules/@prisma/client/default.js";

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemId: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provider a DATABASE_URL environment variable!')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schemId)

    return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
    const databaseURL = generateUniqueDatabaseURL(schemaId)

    process.env.DATABASE_URL = databaseURL

    execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
    await prisma.$disconnect()
})