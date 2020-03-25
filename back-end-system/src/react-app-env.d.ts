// / <reference types="react-scripts" />
interface IRoute {
  // eslint-disable-next-line max-len
  component: ComponentClass<Pick<RouteComponentProps<any, StaticContext, PoorMansUnknown>, never>, any> & WithRouterStatics;
  path: string;
  routes?: IRoute[];
}
