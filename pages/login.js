import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';


function TestPage({ data }) {
  const router = useRouter();
  
  
    return <Button onPress={signIn}>Login</Button>
}
/*
<div>
      {data.entries.map((item) => (
        <div key={item.API}>{item.API}</div>
      ))}
    </div>
export async function getServerSideProps(context) {
  const res = await fetch('https://api.publicapis.org/entries');
  const data = await res.json();
  console.log(data); // log the response to see if it's returning any data
  return {
    props: { data }
  };
}
*/

export default TestPage;
