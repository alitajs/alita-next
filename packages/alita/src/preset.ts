import type { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => {
    console.log('hello alita');
  });
  return {
    plugins: [
      require.resolve('./features/config/config'),
      require.resolve('./features/config/apptype'),
      require.resolve('./commands/version'),
    ],
  };
};
