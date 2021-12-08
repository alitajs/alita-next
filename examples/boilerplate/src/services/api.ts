import { request } from '@alita/request';

export async function query(): Promise<any> {
  return request('//1/1hello');
}
