export default function resetMainPath(routes: any, mainPath: string) {
  let newPath = mainPath;
  // 把用户输入/abc/ 转成 /abc
  if (newPath !== '/' && newPath.slice(-1) === '/') {
    newPath = newPath.slice(0, -1);
  }
  // 把用户输入abc 转成 /abc
  if (newPath !== '/' && newPath.slice(0, 1) !== '/') {
    newPath = `/${newPath}`;
  }

  const obj = {} as any;
  Object.entries(routes).forEach(([pathname, element]: any) => {
    if (element.isResetMainEdit || pathname === '@@/global-layout') {
      obj[pathname] = element;
      return ;
    }
    if (element.path === '/') {
      element.path = '/index';
      element.isResetMainEdit = true;
    }
    if (element.path === newPath) {
      element.path = '/';
      element.isResetMainEdit = true;
    }
    obj[pathname] = element;
  });
  return obj;
}
