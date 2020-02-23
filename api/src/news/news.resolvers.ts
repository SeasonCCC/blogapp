// app.resolvers.ts
import { Query, Resolver } from '@nestjs/graphql'
import { NewsService } from './news.service'
// import { ParseIntPipe } from '@nestjs/common'
import { NewsRO } from './news'
import { News } from './news.graphql'

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {
    this.newsService = newsService
  }

  @Query(() => [News])
  async getNews(): Promise<NewsRO[]> {
    const news = (await this.newsService.showAll()) as NewsRO[]
    return news
  }

  // @Query('getNews')
  // findOneById(
  //   @Args('id', ParseIntPipe)
  //   id: number,
  // ) {
  //   return id.toString()
  // }

  // query { hello }
  // @Query()
  // hello(): string {
  //   return this.appService.hello()
  // }

  // // query { findCat(id: 1) { name age } }
  // // 网络传输过来的id会是字符串类型，而不是number
  // @Query('findCat')
  // findOneCat(@Args('id', ParseIntPipe) id: number) {
  //   return this.appService.findCat(id)
  // }

  // // query { cats { id name age } }
  // @Query()
  // cats() {
  //   return this.appService.findAll()
  // }

  // // mutation { addCat(cat: {name: "ajanuw", age: 12}) { id name age } }
  // @Mutation()
  // addCat(@Args('cat') args) {
  //   console.log(args)
  //   return this.appService.addCat(args)
  // }
}
