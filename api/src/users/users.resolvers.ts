/*
 * @Author: Season
 * @Date: 2020-04-07 21:10:04
 * @LastEditTime: 2020-04-20 22:12:56
 * @FilePath: \api\src\users\users.resolvers.ts
 */

// app.resolvers.ts
import {
  Query, Resolver, Args, Mutation,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import UsersService from './users.service';
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
  @UseGuards(new AuthGuard())
  async getUserById(
    @Args({ name: 'id', type: () => String })
      id: string,
  ): Promise<UsersRO> {
    const user = (await this.usersService.findOne(id)) as UsersRO;
    return user;
  }

  @Query(() => Users)
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

  @Mutation(() => Users)
  @UseGuards(new AuthGuard())
  async updateType(
    @Args({ name: 'id', type: () => String })
      id: string,
    @Args({ name: 'type', type: () => Number })
      type: number,
  ): Promise<UsersRO> {
    const data = {
      id,
      type,
    };
    const user = await this.usersService.updateType(data);
    return user;
  }

  @Mutation(() => Users)
  @UseGuards(new AuthGuard())
  async changePassword(
    @Args({ name: 'id', type: () => String })
      id: string,
    @Args({ name: 'oldPassword', type: () => String })
      oldPassword: string,
    @Args({ name: 'newPassword', type: () => String })
      newPassword: string,
  ): Promise<UsersRO> {
    const data = {
      oldPassword,
      newPassword,
    };
    const user = await this.usersService.changePassword(data, id);
    return user;
  }

  @Mutation(() => Users)
  @UseGuards(new AuthGuard())
  async resetPassword(
    @Args({ name: 'id', type: () => String })
      id: string,
  ): Promise<UsersRO> {
    const user = await this.usersService.resetPassword(id);
    return user;
  }

  // // mutation { addCat(cat: {name: "ajanuw", age: 12}) { id name age } }
  // @Mutation()
  // addCat(@Args('cat') args) {
  //   console.log(args)
  //   return this.appService.addCat(args)
  // }
}
