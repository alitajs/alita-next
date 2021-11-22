import { logger } from '@umijs/utils';
import { dirname, join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  logger.info('Using Antd Mobile@5 Plugin');

  api.describe({
    key: 'antdMobile5',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  // 忽略用户安装，强制指定 mobile@5 版本
  api.chainWebpack((memo) => {
    if (!!api.config.antdMobile5) {
      memo.resolve.alias.set(
        'antd-mobile5',
        join(dirname(require.resolve('antd-mobile5/package.json'))),
      );
    }
    return memo;
  });

  // TODO: hold umi@4 low import
  // api.onStart(async () => {
  //     const generator = new BaseGenerator({
  //         path: join(__dirname, '..', 'templates', 'mobile5'),
  //         target: `${api.paths.absNodeModulesPath}/@types/antd-mobile5`,
  //         data: {
  //             antdMobilePath: join(dirname(require.resolve('antd-mobile5/package.json')))
  //         },
  //         questions: [],
  //     });
  //     await generator.run();
  // })
};
