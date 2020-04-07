// app.resolvers.ts
import { Query, Resolver, Args } from '@nestjs/graphql';
import { UsePipes, UseGuards } from '@nestjs/common';
import UsersService from './users.service';
import ValidationPipe from '../shared/validation.pipe';
import AuthGuard from '../shared/auth.guard';
import { UsersRO } from './users.d';
import Users from './users.graphql';

@Resolver(() => Users)
export default class UsersResolver {
  constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  @Query(() => [Users])
  // @UseGuards(new AuthGuard())
  async getUsers(): Promise<UsersRO[]> {
    const users = (await this.usersService.getAllUsers()) as UsersRO[];
    return users;
  }

  // @Query()
  // @UsePipes(new ValidationPipe())
  // @UseGuards(new AuthGuard())
  // async getNewsById(
  //   @Args({ name: 'id', type: () => String })
  //     id: string,
  // ): Promise<NewsRO> {
  //   const news = (await this.usersService.findOne(id)) as NewsRO;
  //   return news;
  // }

  // // mutation { addCat(cat: {name: "ajanuw", age: 12}) { id name age } }
  // @Mutation()
  // addCat(@Args('cat') args) {
  //   console.log(args)
  //   return this.appService.addCat(args)
  // }
}
