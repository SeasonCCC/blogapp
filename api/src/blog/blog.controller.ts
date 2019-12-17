import { Controller, Get } from '@nestjs/common'
import { IBlogContent } from './blog'
import * as crawler from './crawler/crawler'

@Controller('blog')
export class BlogController {
  @Get()
  getBlog(): Promise<IBlogContent[]> {
    return crawler.scrape()
  }
}
