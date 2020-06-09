/*
 * @Author: Season
 * @Date: 2020-03-26 09:45:18
 * @LastEditTime: 2020-06-09 11:39:34
 * @FilePath: \back-end-system\src\utils\withRouter.ts
 */
import { ComponentClass } from 'react';
import { withRouter as nativeWithRouter } from 'react-router-dom';

export type ComponentDecorator<P = any> = <T extends ComponentClass<P>>(WrappedComponent: T) => T;

export const withRouter: ComponentDecorator = nativeWithRouter as any;
