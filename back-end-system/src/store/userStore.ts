/*
 * @Author: Season
 * @Date: 2020-06-09 10:31:21
 * @LastEditTime: 2020-06-09 11:43:48
 * @FilePath: \back-end-system\src\store\userStore.ts
 */
import { observable, action } from 'mobx';

class Store {
  @observable username = '';

  @observable token = '';

  @action
  setUsername(username: string) {
    this.username = username;
  }

  @action
  setToken(token: string) {
    this.token = token;
  }
}

export default new Store();
