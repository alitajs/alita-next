import { Button } from 'antd-mobile';
import React from 'react';
import './global.less';
// @ts-ignore
import styles from './index.less';

export default function HomePage() {
  return (
    <div className={styles.title}>
      123<Button>123</Button>
    </div>
  );
}
