/* eslint-disable no-undef */

import { Test } from '@nestjs/testing'
import { NewsController } from './news.controller'
import { NewsService } from './news.service'
import { NewsRO } from './news.dto'

describe('News Controller', () => {
  let newsController: NewsController
  let newsService: NewsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [NewsService],
    }).compile()

    newsService = module.get<NewsService>(NewsService)
    newsController = module.get<NewsController>(NewsController)
  })

  describe('findAll', () => {
    it('should return an array of news', async () => {
      const result = [] as NewsRO[]
      jest.spyOn(newsService, 'showAll').mockImplementation(async () => result)
      expect(await newsController.getAllNews()).toBe(result)
    })
  })
})
