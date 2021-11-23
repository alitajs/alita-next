import { Button as AntdButton } from 'antd-mobile';
import { Button } from 'antd-mobile5';
import React from 'react';
import './global.less';
// @ts-ignore
import styles from './index.less';

export default function HomePage() {
  return (
    <div className={styles.title}>
      123
      <Button type="button" color="primary" fill="solid" block>
        123
      </Button>
      <AntdButton>123</AntdButton>
    </div>
  );
}
