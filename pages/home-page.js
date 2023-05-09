import { Container, Row, Spacer, Card, Col, Text, Button } from '@nextui-org/react'
import HomeNavbar from './components/navbar'
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedNavbar from './components/logged_navbar';
import { Router, useRouter } from 'next/router';
import BackgroundVideo from './components/bg-video';

export default function HomePage() {
    const router = useRouter();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    return (
        <>
            {!user && <HomeNavbar />}
            {user && <LoggedNavbar />}
            <Spacer y={3} />
            <Container css={{ h: "100vh" }}>
                <div className='row'>
                    <div className='col-4'>
                        <Card isPressable css={{ w: "100%", h: "400px" }} onPress={() => router.push("/coach-assistant")}>
                            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                <Col>
                                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                        GET Your coach Assistant
                                    </Text>
                                    
                                </Col>
                            </Card.Header>
                            <Card.Body css={{ p: 0 }}>
                                <Card.Image
                                    src="/images/coach.png"
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

                                        </Text>
                                    </Col>
                                    <Col>
                                        <Row justify="flex-end">
                                            <Button flat auto rounded color="secondary" onPress={() => router.push("/coach-assistant")}>
                                                <Text
                                                    css={{ color: "inherit" }}
                                                    size={12}
                                                    weight="bold"
                                                    transform="uppercase"
                                                >
                                                    Try it now
                                                </Text>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className='col-4'>
                        <Card isPressable css={{ w: "100%", h: "400px" }} onPress={() => router.push("/league-stats")}>
                            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                <Col>
                                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                        Get
                                    </Text>
                                    
                                </Col>
                            </Card.Header>
                            <Card.Body css={{ p: 0 }}>
                                <Card.Image
                                    src="/images/league-stats.jpg"
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

                                    </Col>
                                    <Col>
                                        <Row justify="flex-end">
                                            <Button flat auto rounded color="secondary" onPress={() => router.push("/league-stats")}>
                                                <Text
                                                    css={{ color: "inherit" }}
                                                    size={12}
                                                    weight="bold"
                                                    transform="uppercase"
                                                >
                                                    Try it now
                                                </Text>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                    <div className='col-4'>
                        <Card isPressable css={{ w: "100%", h: "400px" }} onPress={() => router.push("/predict-score")}>
                            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                <Col>
                                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                        Predict
                                    </Text>
                                    
                                </Col>
                            </Card.Header>
                            <Card.Body css={{ p: 0 }}>
                                <Card.Image
                                    src="/images/predictions.jpg"
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

                                    </Col>
                                    <Col>
                                        <Row justify="flex-end">
                                            <Button flat auto rounded color="secondary" onPress={() => router.push("/predict-score")}>
                                                <Text
                                                    css={{ color: "inherit" }}
                                                    size={12}
                                                    weight="bold"
                                                    transform="uppercase"
                                                >
                                                    Try it now
                                                </Text>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    )
}