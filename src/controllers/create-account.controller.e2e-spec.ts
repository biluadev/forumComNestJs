import { AppModule } from "../app.module.js"
import { PrismaService } from "../prisma/prisma.service.js"
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import request from "supertest"

describe('Create account (E2E)', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService)

        await app.init()
    })

    test('[POST] /account', async () => {
        const response = await request(app.getHttpServer()).post('/accounts').send({
            name: 'Jhon Doe',
            email: 'jhondoe@example.com',
            password: '123456'
        })

        expect(response.statusCode).toBe(201)

        const userOnDatebase = await prisma.user.findUnique({
            where: {
                email: 'jhondoe@example.com'
            }
        })

        expect(userOnDatebase).toBeTruthy()
    })
})