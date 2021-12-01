import resetMainPath from './resetMainPath';

test('resetMainPath', () => {
  const routes = {
    '1': { path: '/', file: 'index', parentId: '@@/global-layout', id: '1' },
    '2': { path: '/home', file: 'home', parentId: '@@/global-layout', id: '2' },
    '3': { path: '/abc', file: 'abc', parentId: '@@/global-layout', id: '3' },
    '@@/global-layout': {
      id: '@@/global-layout',
      path: '/',
      file:
        '/Users/chenshuhang/Documents/git/open/umi4/umi-next/examples/ant-design-pro/src/layouts/index.tsx',
    },
  };
  const mainPath = '/home';
  expect(resetMainPath(routes, mainPath)).toEqual({
    '1': {
      path: '/index',
      file: 'index',
      parentId: '@@/global-layout',
      id: '1',
      isResetMainEdit: true
    },
    '2': {
      path: '/',
      file: 'home',
      parentId: '@@/global-layout',
      id: '2',
      isResetMainEdit: true
    },
    '3': { path: '/abc', file: 'abc', parentId: '@@/global-layout', id: '3' },
    '@@/global-layout': {
      id: '@@/global-layout',
      path: '/',
      file:
        '/Users/chenshuhang/Documents/git/open/umi4/umi-next/examples/ant-design-pro/src/layouts/index.tsx',
    }
  });
});
