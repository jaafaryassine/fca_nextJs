import { Container, Spacer } from '@nextui-org/react'
import InputTactic from './components/input-tactic'
import HomeNavbar from './components/navbar'
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedNavbar from './components/logged_navbar';


export default function CoachPage() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  return (
    <>
      {!user && <HomeNavbar />}
      {user && <LoggedNavbar />}
      <Spacer y={3} />
      <Container>
        <InputTactic />
      </Container>
    </>
  )
}
