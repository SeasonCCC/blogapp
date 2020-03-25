import { ComponentClass } from 'react';
import { withRouter as nativeWithRouter } from 'react-router-dom';

export type ComponentDecorator<P = any> = <T extends ComponentClass<P>>(WrappedComponent: T) => T;

export const withRouter: ComponentDecorator = nativeWithRouter as any;
