import { Modal, Input, Checkbox, Video, Card, Col, Row, Button, Text, Grid, Container, Spacer } from "@nextui-org/react";
import Image from 'next/image'
import { useState, useEffect, use } from "react";
import Instructions from "./instructions";
import { useAuthState } from "react-firebase-hooks/auth";
import { Mail } from "./mail";
import { Password } from "./password";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function TacticResult({ result, all_instructions }) {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [visible, setVisible] = useState(false);
    const [accountStatus, setAccountStatus] = useState("mm");
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const signIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            router.push("/")
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            
            // ...
          });
      }
      let status;
      const getAccountStatus = async () => {
        const res = await fetch('http://localhost:8001/JEE_api_war/StatusServlet?user_id='+user.uid);
        const data = await res.json();
        setAccountStatus(data.userStatus)
    }
    useEffect(() => {
        getAccountStatus();
    }, []);
    
    return <>
        <Container>
            <Spacer x={2} />
            <Text h1 size={40} color="secondary" css={{ textAlign: "center" }} weight="bold">
                 Formation recommendée {result}
            </Text>
            <Spacer x={3} />
            <Row gap={3}>
                <Col>
                    <Card css={{ w: "400px", h: "400px" }}>
                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                            <Col>
                                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                    Formation suggérée
                                </Text>
                                <Text h3 color="black">
                                    {result}
                                </Text>
                            </Col>
                        </Card.Header>
                        <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                src="/tactic_background.jpg"
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                alt="Card example background"
                            />
                        </Card.Body>
                        <Card.Footer
                            isBlurred
                            css={{
                                position: "absolute",
                                bgBlur: "#ffffff66",
                                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                                bottom: 0,
                                zIndex: 1,
                            }}
                        >
                            <Row>
                                <Col>
                                    <Text color="#000" size={12}>
                                        Don't forget to see instructions
                                    </Text>
                                    <Text color="#000" size={12}>
                                        Good luck
                                    </Text>
                                </Col>
                                <Col>
                                    <Row justify="flex-end">
                                        <Button flat auto rounded color="secondary" onPress={handler}>
                                            <Text
                                                css={{ color: "inherit" }}
                                                size={12}
                                                weight="bold"
                                                transform="uppercase"
                                            >
                                                Voir intructions
                                            </Text>
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body css={{ h: "400px", p: 0 }}>
                            <Card.Image
                                src={`/images/${result}.png`}
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                alt="Card example background"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        {user && <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            width="800px"
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    <Text b size={18}>
                        See intructions
                    </Text>
                </Text>
            </Modal.Header>
            <Modal.Body>
                {all_instructions.length == 0 && <Text>You don't have any instructions for this tactic</Text>}
                <Instructions all_instructions={all_instructions}/>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Close
                </Button>
                <Button auto onPress={closeHandler}>
                    Agree
                </Button>
            </Modal.Footer>
        </Modal>}


        {!user && <Modal
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
      </Modal>}

    </>
}
