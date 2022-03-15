import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'

import { PrismaService } from 'src/prisma/prisma.service'
import { UsersService } from 'src/users/users.service'

describe('UserController', () => {
  let prismaService: PrismaService
  let usersService: UsersService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prismaService = moduleRef.get(PrismaService)
    usersService = moduleRef.get(UsersService)
    await prismaService.cleanDb()
  })

  describe('createUser()', () => {
    it('should create user', async () => {
      const user = await usersService.createUser({
        email: 'john@skynet.com',
        firstName: 'John',
        lastName: 'Connor',
        password: '123456',
      })

      expect(user).toMatchObject({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
      expect(user.id).toBeDefined()
      expect(user.createdAt).toBeDefined()
      expect(user.updatedAt).toBeDefined()
      expect(user['password']).toBeUndefined()
      expect(user['hash']).toBeUndefined()
      expect(user['refreshTokenHash']).toBeUndefined()
    })

    it('should throw on duplicate email', async () => {
      try {
        await usersService.createUser({
          email: 'john@skynet.com',
          firstName: 'John',
          lastName: 'Connor',
          password: '123456',
        })
      } catch (error) {
        expect(error.message).toBe('The email is already taken')
      }
    })
  })
  describe('getUsers()', () => {
    it('should ', async () => {
      const users = await usersService.getUsers()
      console.log(users)
      expect(users).toBeDefined()
    })
  })

  // it('should throw on duplicate email', async () => {
  //   try {
  //     await userService.createUser('john@skynet.com', 'John', 'Connor')
  //   } catch (error) {
  //     expect(error.status).toBe(403)
  //   }
  // })
})
