import React from "react";
import { useEffect, useState } from "react";
import { Spacer, Container, Table, Card, Image, Text, Button, Row, Modal, Loading } from "@nextui-org/react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import HomeNavbar from "./components/navbar";
import LoggedNavbar from "./components/logged_navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function PredictScorePage() {
    const teams = ["Liverpool", "Everton", "Arsenal", "Bournemouth", "Chelsea", "Southampton", "Brighton", "Fulham", "Brentford"];
    const [teamsCheck, setTeamsCheck] = useState([]);
    const [teamsCheckB, setTeamsCheckB] = useState([]);
    const [choosedTeamA, setChoosedTeamA] = useState("");
    const [choosedTeamB, setChoosedTeamB] = useState("");
    const [winner, setWinner] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [result, setResult] = useState("");
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    const chooseTeam = (index) => {
        let newArr = [];
        for (let i = 0; i < 20; i++) {
            newArr[i] = false;
        }
        newArr[index] = true;
        setTeamsCheck(newArr);
        //newArr.findIndex((element) => element==true);
    }
    const chooseTeamB = (index) => {
        let newArr = [];
        for (let i = 0; i < 20; i++) {
            newArr[i] = false;
        }
        newArr[index] = true;
        setTeamsCheckB(newArr);
        //newArr.findIndex((element) => element==true);
    }
    const predictScore = async () => {
        let teamA = teams[teamsCheck.findIndex((element) => element == true)];
        let teamB = teams[teamsCheckB.findIndex((element) => element == true)];
        setWinner("");
        setChoosedTeamA(teamA);
        setChoosedTeamB(teamB);
        setIsLoading(true);
        setVisible(true)
        const res = await fetch("http://localhost:8001/JEE_api_war/PredictScoreServlet?teamA=" + teamA + "&teamB=" + teamB);
        const data = await res.json();
        let result = "";
        switch (data.result) {
            case "Draw":
                result = "There is no winner. Draw for this Match";
                setWinner("draw");
                break;
            case "Home":
                result = "The Winner is " + teamA;
                setWinner("teamA");
                break;
            case "Away":
                result = "The Winner is " + teamB;
                setWinner("teamB");
                break;

            default:
                break;
        }
        setResult(result);
        setIsLoading(false);
        console.log(data);
    }

    const teamsComponent = teams.map((item, index) => (
        <div style={{ position: "relative" }}>
            {teamsCheck[index] && <FontAwesomeIcon icon={faCheckCircle} style={{ position: "absolute", top: "50", left: "50", zIndex: 1, color: "green" }} />}
            <Image width={200} onClick={() => chooseTeam(index)} src={`/images/teams/${item}.png`} />
        </div>
    ));
    const teamsComponentB = teams.map((item, index) => (
        <div style={{ position: "relative" }}>
            {teamsCheckB[index] && <FontAwesomeIcon icon={faCheckCircle} style={{ position: "absolute", top: "50", left: "50", zIndex: 1, color: "green" }} />}
            <Image width={200} onClick={() => chooseTeamB(index)} src={`/images/teams/${item}.png`} />
        </div>
    ));



    return <>
        {!user && <HomeNavbar />}
        {user && <LoggedNavbar />}
        <Container css={{ h: "100vh" }}>
            <Spacer />
            <div className="row">
                <div className="col-6">
                    <Card>
                        <Card.Header>Choose home team</Card.Header>
                        <Card.Divider />
                        <Card.Body css={{ h: "440px" }} className="teams-select">
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {teamsComponent}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <Card.Header>Choose away team</Card.Header>
                        <Card.Divider />
                        <Card.Body css={{ h: "440px" }} className="teams-select">
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {teamsComponentB}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Spacer />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button color={"success"} onPress={() => predictScore()}>Predict score</Button>
            </div>


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
                <Text b h4>Predicting score based on actual data</Text>
            </Modal.Header>
            <Modal.Body>
                <Spacer/>
                <div className="row">
                    <div className="col">
                        {choosedTeamA && <Image width={100} src={`/images/teams/${choosedTeamA}.png`} className={winner == "teamA" ? "team-animated" : ""} />}
                        {winner == "teamA" && <Image width={60} src="/images/icons/trophy.png" className="champion-icon"/>}
                    </div>
                    <div className="col text-center">
                        {winner == "draw" && <Image width={60} src="/images/icons/draw.png" className="champion-icon"/>}
                        {winner == "draw" && <Text h3 css={{ textGradient: "45deg, $blue600 -20%, $green600 100%"}}  weight="bold">Draw</Text>}

                    </div>
                    <div className="col">
                        {choosedTeamB && <Image width={100} src={`/images/teams/${choosedTeamB}.png`} className={winner == "teamB" ? "team-animated" : ""} />}
                        {winner == "teamB" && <Image width={60} src="/images/icons/trophy.png" className="champion-icon"/>}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {isLoading && <Loading>Our model is working for predicting the score. This may take a few minutes. Please wait...</Loading>}
                    {!isLoading && <Text>{result}</Text>}
                </div>
            </Modal.Body>
        </Modal>
    </>
}