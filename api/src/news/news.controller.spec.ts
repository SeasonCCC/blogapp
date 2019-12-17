/* eslint-disable no-undef */

import { Test } from '@nestjs/testing'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { News } from './news.entity'
import { Users } from '../users/users.entity'
// import { NewsRO } from './news'

describe('News Controller', () => {
  let newsController: NewsController
  let newsService: NewsService

  beforeEach(async () => {
    // newsService = new NewsService()
    // newsController = new NewsController(newsService)
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mongodb',
          host: process.env.TYPEORM_HOST,
          port: parseInt(process.env.TYPEORM_PORT),
          database: process.env.TYPEORM_DATABASE,
          entities: [News, Users],
          synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
          logging: process.env.TYPEORM_LOGGING === 'true',
          useNewUrlParser: true,
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([News, Users]),
      ],
      controllers: [NewsController],
      providers: [NewsService],
    }).compile()

    newsService = module.get<NewsService>(NewsService)
    newsController = module.get<NewsController>(NewsController)
  })

  describe('findAll', () => {
    it('should return an array of news', async () => {
      const result = []
      jest.spyOn(newsService, 'showAll').mockImplementation(() => result as any)
      expect(await newsController.getAllNews()).toBe(result)
    })
  })
})
