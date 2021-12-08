import { logger, Mustache } from '@umijs/utils';
import { IApi } from 'umi';

export default (api: IApi) => {
  logger.info('Using Request Plugin');

  api.describe({
    key: 'request',
    config: {
      schema(Joi) {
        return Joi.object();
      },
    },
  });

  // TODO: 运行时配置，还不支持，先写在这里测试
  const content = Mustache.render(
    `
import { setRequestConfig } from '@alita/request';

setRequestConfig({{{ request }}})
  `.trim(),
    {
      request: JSON.stringify(api.userConfig.request),
    },
  );
  api.addEntryCodeAhead(() => [`${content}`]);
};
