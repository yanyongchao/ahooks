import { useEffect, useState, useRef } from 'react';
import { useUnMount } from '../hooks/useUnMount';
import styles from './index.less';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  useUnMount(() => {
    console.log(count);
  });
  return (
    <p>
      <span onClick={() => setCount(count + 1)}>Hello World!</span>
      <span>{count}</span>
    </p>
  );
};

export default function IndexPage() {
  const [state, setState] = useState(false);
  return (
    <div>
      <h1 className={styles.title} onClick={() => setState(!state)}>
        Page index
      </h1>
      {state && <MyComponent />}
    </div>
  );
}
