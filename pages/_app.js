// 1. import `NextUIProvider` component
import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { initFirebase } from '@/firebase/firebaseApp';
import 'bootstrap/dist/css/bootstrap.css';


function MyApp({ Component, pageProps }) {
  const app = initFirebase();
  console.log(app);
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
