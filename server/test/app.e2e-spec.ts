import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as pactum from 'pactum'

import { AppModule } from '../src/app.module'
import { RegisterDto } from '../src/auth/dto'
import { PrismaService } from '../src/prisma/prisma.service'
import { EditUserDto } from '../src/users/dto'

/**
 * NestJS: Testing Utilities
 * https://docs.nestjs.com/fundamentals/testing#testing-utilities
 */

describe('App E2E', () => {
  let app: INestApplication
  let prismaService: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )

    await app.init()
    await app.listen(9999)

    // Prisma
    prismaService = app.get(PrismaService)
    await prismaService.cleanDb()

    // Pactum
    pactum.request.setBaseUrl('http://localhost:9999')
  })

  afterAll(() => {
    app.close()
  })

  describe('Auth', () => {
    const dto: RegisterDto = {
      email: 'aragorn@strider.com',
      password: 'arwen', // Omg so cute
      passwordConfirm: 'arwen',
      firstName: 'Aragorn',
      lastName: 'Elessar',
    }

    describe('Register', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })

      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      })

      it(`should throw if passwords don't match`, () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody({
            email: dto.email,
            password: dto.password,
            passwordConfirm: 'definitely wrong password',
            firstName: dto.firstName,
            lastName: dto.lastName,
          })
          .expectStatus(400)
      })

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/register').expectStatus(400)
      })

      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(dto)
          .expectStatus(201)
        // .inspect()
        // 👆 Uncomment this line to see request and response bodies
      })
    })

    describe('Sign in', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400)
      })

      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400)
      })

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/login').expectStatus(400)
      })

      it('should sign in', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'accessToken')
      })
    })
  })

  describe('Users', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
      })
    })
    describe('Edit user', () => {
      it('should edit current user', () => {
        const dto: EditUserDto = {
          email: 'definitely@different.email',
          firstName: 'New First Name',
          lastName: 'New Last Name',
        }
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName)
      })
    })
  })
})
