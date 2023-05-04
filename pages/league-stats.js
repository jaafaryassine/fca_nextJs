import React from "react";
import { useEffect, useState } from "react";
import { Spacer, Container, Table, Card, Text, Button, Row, Modal, Loading } from "@nextui-org/react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import HomeNavbar from "./components/navbar";
import LoggedNavbar from "./components/logged_navbar";

export default function LeagueStatsPage() {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statsData, setStatsData] = useState([]);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const getStats = async (league_name) => {
        setIsLoading(true)
        setVisible(true)
        console.log("lg : " + league_name)
        const res = await fetch('http://localhost:8001/JEE_api_war/LeagueStatsServlet?user_id=aStL7ygySuQ5NOxJdtjJup9AwqB3&league_name=' + league_name);
        const data = await res.json();
        setIsLoading(false)
        setStatsData(data)
        if (Array.isArray(data)) {
            console.log(data[0].Team)
        }
        else {
            console.log(data.error)
        }
    }

    const statsComponent = statsData.map((teamData, index) => (
        <Table.Row key={index}>
            <Table.Cell>{teamData.Team}</Table.Cell>
            <Table.Cell>{teamData.M}</Table.Cell>
            <Table.Cell>{teamData.W}</Table.Cell>
            <Table.Cell>{teamData.D}</Table.Cell>
            <Table.Cell>{teamData.L}</Table.Cell>
            <Table.Cell>{teamData.G}</Table.Cell>
            <Table.Cell>{teamData.GA}</Table.Cell>
            <Table.Cell>{teamData.PTS}</Table.Cell>
            <Table.Cell>{teamData.xG}</Table.Cell>
            <Table.Cell>{teamData.xGA}</Table.Cell>
            <Table.Cell>{teamData.xPTS}</Table.Cell>
        </Table.Row>
    ));
    /*
    useEffect(() => {
        getStats();
    }, []);
    */
    return <>
        {!user && <HomeNavbar />}
        {user && <LoggedNavbar />}
        <Spacer y={3} />
        <Container css={{ display: "flex", justifyContent: "center", h: "100vh" }}>
            <Card css={{ w: "70vw", h: "200px" }}>
                <Card.Header><Text b>Choose a league</Text></Card.Header>
                <Card.Body>
                    <select class="form-select" id="league" aria-label="Default select example" onChange={() => console.log(document.getElementById("league").value)}>
                        <option value="EPL">EPL</option>
                        <option value="La_liga">La Liga</option>
                        <option value="Bundesliga">Bundesliga</option>
                    </select>
                </Card.Body>
                <Card.Footer>
                    <Row css={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button onPress={() => getStats(document.getElementById("league").value)}>See Statistics</Button>
                    </Row>
                </Card.Footer>
            </Card>
        </Container>

        <Modal
            scroll
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={() => setVisible(false)}
            width="70vw"
            height="90vh">
            <Modal.Header>
                <Text b h4>Stats</Text>
            </Modal.Header>
            <Modal.Body>
                {isLoading && <Loading>We are scraping data from web. This may take a few minutes. Please wait...</Loading>}
                {!isLoading && <Table
                    selectionMode="single"

                    aria-label="Example table with static content"
                    css={{
                        height: "600px",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>
                        <Table.Column>NAME</Table.Column>
                        <Table.Column>M</Table.Column>
                        <Table.Column>W</Table.Column>
                        <Table.Column>D</Table.Column>
                        <Table.Column>L</Table.Column>
                        <Table.Column>G</Table.Column>
                        <Table.Column>GA</Table.Column>
                        <Table.Column>PTS</Table.Column>
                        <Table.Column>xG</Table.Column>
                        <Table.Column>xGA</Table.Column>
                        <Table.Column>xPTS</Table.Column>
                    </Table.Header>
                    <Table.Body css={{overflow: "scroll"}}>
                        {statsComponent}
                    </Table.Body>
                </Table>}
            </Modal.Body>
        </Modal>
    </>
}