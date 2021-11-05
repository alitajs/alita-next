import { Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  const { userConfig } = api;
  const { aconsole = {} } = userConfig;

  // 配置
  api.describe({
    key: 'aconsole',
    config: {
      schema(joi) {
        return joi.object({
          inspx: joi.object({
            disabled: joi.boolean(),
            production: joi.boolean(),
            margin: joi.boolean(),
            size: joi.boolean(),
            padding: joi.boolean(),
          }),
          console: joi.object({
            defaultPlugins: joi.array(),
            onReady: joi.function(),
            onClearLog: joi.function(),
            maxLogNumber: joi.number(),
            disableLogScrolling: joi.boolean(),
            theme: joi.string(),
          }),
        });
      },
    },
  });

  if (aconsole?.console) {
    api.addHTMLStyles(() => {
      return [
        {
          content: `.vc-switch { right: 0px; bottom: 1.2rem !important; }`,
        },
      ];
    });
    api.addEntryImports(() => {
      return [
        {
          source: join(__dirname, '..', 'compiled', 'vconsole'),
          specifier: 'VConsole',
        },
      ];
    });
    api.addEntryCode(() => {
      return [`const c = new VConsole(${JSON.stringify(aconsole.console)});`];
    });
  }

  // 开发环境或者强制指定 production 添加，才使用 inspx 功能
  if (
    (process.env.NODE_ENV === 'development' && aconsole?.inspx) ||
    (aconsole?.inspx && aconsole?.inspx?.production)
  ) {
    // ios 摇一摇需要 https 环境。
    // process.env.HTTPS = '1';
    // 生成临时文件
    api.onGenerateFiles({
      fn() {
        // inspx.ts
        const inspxTpl = readFileSync(
          join(__dirname, '..', 'templates', 'aconsole', 'inspx.tpl'),
          'utf-8',
        );
        api.writeTmpFile({
          path: 'plugin-inspx/inspx.tsx',
          content: Mustache.render(inspxTpl, {
            // inspxpath: join(__dirname,'..','compiled','@alita','inspx'),
            inspxpath: dirname(require.resolve('@alita/inspx/package')),
            inspx: {
              ...{
                disabled: false,
                margin: true,
                size: true,
                padding: true,
                bottom: '3.5rem',
                right: '0',
              },
              ...(api.userConfig.inspx || {}),
            },
          }),
        });

        // runtime.tsx
        const runtimeTpl = readFileSync(
          join(__dirname, '..', 'templates', 'aconsole', 'runtime.tpl'),
          'utf-8',
        );
        api.writeTmpFile({
          path: 'plugin-inspx/runtime.tsx',
          content: runtimeTpl,
        });
      },
    });
    api.addRuntimePlugin(() => [
      join(api.paths.absTmpPath!, 'plugin-inspx/runtime.tsx'),
    ]);
  }
};
