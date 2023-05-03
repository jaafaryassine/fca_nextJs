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
            <Container fluid>
                <Card css={{ w: "100%", h: "500px" }}>
                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                        <Col>
                            <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                                Your day your way
                            </Text>
                            <Text h3 color="white">
                                Welcome To Football AI
                            </Text>
                        </Col>
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                        <Card.Image
                            src="/images/home-bg.jpg"
                            objectFit="cover"
                            width="100%"
                            height="100%"
                            alt="App background"
                        />
                            <Text b>Get Ready</Text>
                    </Card.Body>
                    <Card.Footer
                        isBlurred
                        css={{
                            position: "absolute",
                            bgBlur: "#0f111466",
                            borderTop: "$borderWeights$light solid $gray800",
                            bottom: 0,
                            zIndex: 1,
                        }}
                    >
                        <Row>
                            <Col>
                                <Row>
                                    <Col span={3}>
                                        <Card.Image
                                            src="https://nextui.org/images/breathing-app-icon.jpeg"
                                            css={{ bg: "black", br: "50%" }}
                                            height={40}
                                            width={40}
                                            alt="Breathing app icon"
                                        />
                                    </Col>
                                    <Col>
                                        <Text color="#d1d1d1" size={12}>
                                            Breathing App
                                        </Text>
                                        <Text color="#d1d1d1" size={12}>
                                            Get a good night's sleep.
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row justify="flex-end">
                                    <Button
                                        flat
                                        auto
                                        rounded
                                        css={{ color: "#94f9f0", bg: "#94f9f026" }}
                                    >
                                        <Text
                                            css={{ color: "inherit" }}
                                            size={12}
                                            weight="bold"
                                            transform="uppercase"
                                        >
                                            Get App
                                        </Text>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
                <Spacer/>
            </Container>
            <Container>
                <div className='row'>
                    <div className='col-4'>
                        <Card isPressable css={{ w: "100%", h: "400px" }} onPress={() => router.push("/coach-assistant")}>
                            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                <Col>
                                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                        GET
                                    </Text>
                                    <Text h3 color='white'>
                                        Your Coach Assistant
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
                                    <Text h3 color='white'>
                                        Leagues statistics
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
                                    <Text h3 color='white'>
                                        Score Matches
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
                                                    Notify Me
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