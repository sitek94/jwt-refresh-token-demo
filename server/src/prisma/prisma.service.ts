import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    })
  }

  cleanDb() {
    if (process.env.NODE_ENV === 'production') return
    const models = Reflect.ownKeys(this).filter(key => key[0] !== '_')

    return Promise.all(models.map(modelKey => this[modelKey].deleteMany()))
  }
}
