/*
 * @Author: Season
 * @Date: 2020-04-14 08:52:31
 * @LastEditTime: 2020-04-14 11:43:37
 * @FilePath: \api\src\users\users.resolvers.ts
 */

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
  @UseGuards(new AuthGuard())
  async getUsers(): Promise<UsersRO[]> {
    const users = (await this.usersService.getAllUsers()) as UsersRO[];
    return users;
  }

  @Query(() => Users)
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async getUserById(
    @Args({ name: 'id', type: () => String })
      id: string,
  ): Promise<UsersRO> {
    const user = (await this.usersService.findOne(id)) as UsersRO;
    return user;
  }

  @Query(() => Users)
  @UsePipes(new ValidationPipe())
  async login(
    @Args({ name: 'username', type: () => String })
      username: string,
      @Args({ name: 'password', type: () => String })
      password: string,
      @Args({ name: 'type', type: () => Number })
      type: number,
  ): Promise<UsersRO> {
    const data = {
      username,
      password,
      type,
    };
    const user = (await this.usersService.login(data)) as unknown as UsersRO;
    return user;
  }

  // // mutation { addCat(cat: {name: "ajanuw", age: 12}) { id name age } }
  // @Mutation()
  // addCat(@Args('cat') args) {
  //   console.log(args)
  //   return this.appService.addCat(args)
  // }
}
