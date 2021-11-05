export default {
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  plugins: ['@alita/plugins/dist/aconsole'],
  aconsole: {
    console: {},
    inspx: {},
  },
  chainWebpack(memo: any) {
    memo;
  },
  // fastRefresh: false,
};
