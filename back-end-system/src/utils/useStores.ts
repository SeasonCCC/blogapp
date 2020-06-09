import React from 'react';
import { MobXProviderContext } from 'mobx-react';

/*
 * @Author: Season
 * @Date: 2020-06-09 11:39:48
 * @LastEditTime: 2020-06-09 11:40:06
 * @FilePath: \back-end-system\src\utils\useStores.ts
 */
export default function useStores() {
  return React.useContext(MobXProviderContext);
}
