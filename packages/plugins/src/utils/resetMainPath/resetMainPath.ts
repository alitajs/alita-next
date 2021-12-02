export default function resetMainPath(routes: any, mainPath: string) {

  let newPath = mainPath;
  // 把用户输入/abc/ 转成 /abc
  if (newPath !== '/' && newPath.slice(-1) === '/') {
    newPath = newPath.slice(0, -1);
  }
  // 把用户输入/abc 转成 abc
  if (newPath !== '/' && newPath.slice(0, 1) === '/') {
    newPath = newPath.slice(1, newPath.length);
  }
  //判断是否为空，或者是否已为首页
  if(mainPath === '' || mainPath === 'index') {
    return routes;
  }

  const obj = { ...routes } as any;
  if(!!routes[newPath]) {
    obj.index.path = 'index';
    obj[newPath].path = '/';
  }
  return obj;
}
