import { Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IApi } from 'umi';

const DIR_NAME = 'plugin-keepalive';
// keepalive:['route path','route path']
// import { KeepAliveContext } from '@@/plugin-keepalive/context';
// const { dropByCacheKey } = React.useContext<any>(KeepAliveContext);
// dropByCacheKey('/list');
type KeepAliveType = (string | RegExp)[];
export default (api: IApi) => {
  api.describe({
    key: 'keepalive',
    config: {
      schema(Joi) {
        return Joi.array().items(Joi.alternatives(Joi.string(), Joi.any()));
      },
    },
  });

  const configStringify = (config: (string | RegExp)[]) => {
    return config.map((item) => {
      if (item instanceof RegExp) {
        return item;
      }
      return `'${item}'`;
    });
  };
  api.onGenerateFiles(() => {
    const contextTpl = readFileSync(
      join(__dirname, '..', 'templates', 'keepalive', 'context.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: `${DIR_NAME}/context.tsx`,
      content: Mustache.render(contextTpl, {}),
    });
    const runtimeTpl = readFileSync(
      join(__dirname, '..', 'templates', 'keepalive', 'runtime.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: `${DIR_NAME}/runtime.tsx`,
      content: Mustache.render(runtimeTpl, {
        keepalive: configStringify(api.userConfig.keepalive as KeepAliveType),
      }),
    });
  });
  api.addRuntimePlugin(() => [
    join(api.paths.absTmpPath!, `${DIR_NAME}/runtime.tsx`),
  ]);
};