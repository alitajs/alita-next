import resetMainPath from './resetMainPath';

test('resetMainPath', () => {
  const routes = {
    index: {
      path: '/',
      id: 'index',
      parentId: '@@/global-layout',
      file: 'index.tsx',
    },
    users: {
      path: 'users',
      id: 'users',
      parentId: '@@/global-layout',
      file: 'users.tsx',
    },
    'users/foo': {
      path: 'foo',
      id: 'users/foo',
      parentId: 'users',
      file: 'users/foo.tsx',
    },
    '@@/global-layout': {
      id: '@@/global-layout',
      path: '/',
      file:
        '/Users/chenshuhang/Documents/git/alita/alita3/examples/boilerplate/layouts/index.tsx',
    },
  };
  const mainPath = '/users';
  expect(resetMainPath(routes, mainPath)).toEqual({
    index: {
      path: 'index',
      id: 'index',
      parentId: '@@/global-layout',
      file: 'index.tsx',
    },
    users: {
      path: '/',
      id: 'users',
      parentId: '@@/global-layout',
      file: 'users.tsx',
    },
    'users/foo': {
      path: 'foo',
      id: 'users/foo',
      parentId: 'users',
      file: 'users/foo.tsx',
    },
    '@@/global-layout': {
      id: '@@/global-layout',
      path: '/',
      file:
        '/Users/chenshuhang/Documents/git/alita/alita3/examples/boilerplate/layouts/index.tsx',
    },
  });
});
