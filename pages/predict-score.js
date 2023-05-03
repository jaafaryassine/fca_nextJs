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
    const teams = ["Manchester City", "Liverpool", "Everton", "Arsenal"];
    const [teamsCheck, setTeamsCheck] = useState([]);
    const [teamsCheckB, setTeamsCheckB] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [statsData, setStatsData] = useState([]);
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
    const predictScore = () => {
        let teamA = teams[teamsCheck.findIndex((element) => element==true)];
        let teamB = teams[teamsCheckB.findIndex((element) => element==true)];
        alert(teamA + " VS " + teamB);
    }

    const teamsComponent = teams.map((item, index) => (
        <div style={{ position: "relative" }}>
            {teamsCheck[index] && <FontAwesomeIcon icon={faCheckCircle} style={{ position: "absolute", top: "50", left: "50", zIndex:1, color: "green" }} />}
            <Image width={200} onClick={() => chooseTeam(index)} src={`/images/teams/${item}.png`} />
        </div>
    ));
    const teamsComponentB = teams.map((item, index) => (
        <div style={{ position: "relative" }}>
            {teamsCheckB[index] && <FontAwesomeIcon icon={faCheckCircle} style={{ position: "absolute", top: "50", left: "50", zIndex:1, color: "green" }} />}
            <Image width={200} onClick={() => chooseTeamB(index)} src={`/images/teams/${item}.png`} />
        </div>
    ));


    
    return <>
        {!user && <HomeNavbar />}
        {user && <LoggedNavbar />}
        <Container>
            <Spacer />
            <div className="row">
                <div className="col-6">
                    <Card>
                        <Card.Header>Choose home team</Card.Header>
                        <Card.Divider />
                        <Card.Body css={{ h: "400px" }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {teamsComponent}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <Card.Header>Choose home team</Card.Header>
                        <Card.Divider />
                        <Card.Body css={{ h: "400px" }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {teamsComponentB}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <Spacer/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button color={"success"} onPress={() => predictScore()}>Predict score</Button>
            </div>


        </Container>
    </>
}