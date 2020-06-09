/*
 * @Author: Season
 * @Date: 2020-06-09 10:31:21
 * @LastEditTime: 2020-06-09 16:59:26
 * @FilePath: \back-end-system\src\store\userStore.ts
 */
import { observable, action } from 'mobx';

class Store {
  @observable username = '';

  @observable type = 0;

  @observable token = '';

  @action
  setUserData(username: string, type: number, token: string) {
    this.username = username;
    this.type = type;
    this.token = token;
  }

  // @action
  // setType(type: number) {
  //   this.type = type;
  // }

  // @action
  // setToken(token: string) {
  //   this.token = token;
  // }
}

export default new Store();
