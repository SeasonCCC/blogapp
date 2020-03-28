// app.resolvers.ts
import { Query, Resolver, Args } from '@nestjs/graphql';
import { UsePipes, UseGuards } from '@nestjs/common';
import NewsService from './news.service';
import ValidationPipe from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { NewsRO } from './news.d';
import News from './news.graphql';

@Resolver(() => News)
export default class NewsResolver {
  constructor(private readonly newsService: NewsService) {
    this.newsService = newsService;
  }

  @Query(() => [News])
  // @UseGuards(new AuthGuard())
  async getNews(): Promise<NewsRO[]> {
    const news = (await this.newsService.showAll()) as NewsRO[];
    return news;
  }

  @Query(() => News)
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async getNewsById(
    @Args({ name: 'id', type: () => String })
      id: string,
  ): Promise<NewsRO> {
    const news = (await this.newsService.findOne(id)) as NewsRO;
    return news;
  }

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
