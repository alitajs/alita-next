import { BaseGenerator, logger, resolve, winPath } from '@umijs/utils';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  logger.info('Using Antd Mobile Plugin');
  api.describe({
    key: 'antdMobile',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  // 优先使用用户安装
  api.chainWebpack(async (memo) => {
    function getUserLibDir({ library }: { library: string }) {
      if (
        // @ts-ignore
        (api.pkg.dependencies && api.pkg.dependencies[library]) ||
        // @ts-ignore
        (api.pkg.devDependencies && api.pkg.devDependencies[library]) ||
        // egg project using `clientDependencies` in ali tnpm
        // @ts-ignore
        (api.pkg.clientDependencies && api.pkg.clientDependencies[library])
      ) {
        return winPath(
          dirname(
            // 通过 resolve 往上找，可支持 lerna 仓库
            // lerna 仓库如果用 yarn workspace 的依赖不一定在 node_modules，可能被提到根目录，并且没有 link
            resolve.sync(`${library}/package.json`, {
              basedir: api.paths.cwd,
            }),
          ),
        );
      }
      return null;
    }

    if (!!api.config.antdMobile) {
      const userlibDir = getUserLibDir({ library: 'antd-mobile' });
      if (!userlibDir) {
        if (
          !existsSync(
            `${api.paths.absNodeModulesPath}/@types/antd-mobile/index.d.ts`,
          )
        ) {
          logger.event('Create @types/antd-mobile Package');
          const generator = new BaseGenerator({
            path: join(__dirname, '..', 'templates', 'alias'),
            target: `${api.paths.absNodeModulesPath}/@types/antd-mobile`,
            data: {
              antdMobilePath: join(
                dirname(require.resolve('antd-mobile/package.json')),
              ),
              antdMobile: 'antd-mobile',
            },
            questions: [],
          });
          await generator.run();
        }
      }
      memo.resolve.alias.set(
        'antd-mobile',
        userlibDir || dirname(require.resolve('antd-mobile/package.json')),
      );
    }
    return memo;
  });

  // babel-plugin-import
  api.addExtraBabelPlugins(() => {
    if (!!api.config.antdMobile) {
      return [
        [
          require.resolve('babel-plugin-import'),
          {
            libraryName: 'antd-mobile',
            libraryDirectory: 'es',
            style: true,
          },
        ],
      ];
    }
    return [];
  });
};
