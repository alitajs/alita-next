import { IApi } from 'umi';
// import resetMainPath from './utils/resetMainPath/resetMainPath';

export default (api: IApi) => {
  api.describe({
    key: 'mainPath',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
  });

  if (api.userConfig.mainPath) {
    // TODO: api.modifyRoutes
    // api.modifyRoutes((routes: any[]) => {
    //   return resetMainPath(routes, api.config.mainPath);
    // });
  }
};
