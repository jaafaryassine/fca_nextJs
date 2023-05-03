import { Container, Spacer } from '@nextui-org/react'
import InputTactic from './components/input-tactic'
import HomeNavbar from './components/navbar'
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedNavbar from './components/logged_navbar';
import HomePage from './home-page';


export default function Home() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  return (
    <>
      <HomePage/>
    </>
  )
}
