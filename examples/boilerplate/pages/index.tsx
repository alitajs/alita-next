import { Button, Slider } from 'antd-mobile';
import { Button as AntdButton } from 'antd-mobile-v2';
import React from 'react';
import './global.less';
// @ts-ignore
import styles from './index.less';

export default function HomePage() {
  return (
    <div className={styles.title}>
      123
      <Button type="button" color="primary" fill="solid" block size="large">
        123
      </Button>
      <Slider />
      <AntdButton>123</AntdButton>
    </div>
  );
}
