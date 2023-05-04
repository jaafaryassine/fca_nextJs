import React from "react";
import { Modal, Row, Checkbox, Input, Navbar, Button, Link, Text, Image } from "@nextui-org/react";
import { Mail } from "./mail";
import { Password } from "./password";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default function HomeNavbar() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const addUserToDb = async (user) => {
    try {
      const response = await fetch('http://localhost:8001/JEE_api_war/AddUserServlet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.uid,
          email: user.email,
          name: user.displayName,
        })
      });
      console.log("addeeeeeeeed")
    } catch (error) {
      console.error(error);
    }
  }

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        addUserToDb(user);
        router.push("/")
      }).catch((error) => {

        // ...
      });
  }

  return (
    <>
      <Navbar isBordered variant={"floating"}>
        <Navbar.Brand>
          <Link href="/">
            <Image src="/images/logo.png" width={150} />
            <Text hideIn="xs" css={{ textGradient: "45deg, $purple600 -20%, $pink600 100%", }} weight="bold" >


            </Text>
            <Text b color="inherit" hideIn="xs">
              Football AI
            </Text>
          </Link>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat onPress={handler}>
              Login
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              NextUI
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<Password fill="currentColor" />}
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row>
          <Button bordered onPress={signIn} css={{ color: "#DB4437", borderColor: "#DB4437" }}>
            Sign in with Google
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={closeHandler}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
    </>


  )
}
