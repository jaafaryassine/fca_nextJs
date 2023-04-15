import { useState } from "react";
import { Col, Spacer, Textarea, Card, Container, Grid, Text, Row, Button } from "@nextui-org/react";
import TacticResult from "./tactic-result";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function InputTactic() {
  const [isDisplayed, setIsDisplayed] = useState("");
  const [result, setResult] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [checkboxes, setCheckboxes] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
  let [textValue, setText] = useState("");
  const tacticChoices = ["Possession-based, accurate passes", "High-pressing, turnovers", "Compact defense, limited space",
    "Counter-attacking, pace", "Zonal marking, set-pieces", "False nine, deep", "High wing-backs, overloads",
    "Diamond midfield, possession", "Flat back four, solid", "High defensive line, pressing",
    "Sweeper-keeper, attacking moves", "Set-piece routines, variety"
  ]

  const handleChecked = (i) => {
    var updatedCheckboxes = [...checkboxes];
    updatedCheckboxes[i] = !updatedCheckboxes[i];
    setCheckboxes(updatedCheckboxes);
    handleTextValue(updatedCheckboxes);
  }
  const handleTextValue = (updatedCheckboxes) => {
    var spacing = "";
    textValue = "";
    let newTextValue = "";
    console.log("txt : " + textValue)
    for (let i = 0; i < updatedCheckboxes.length; i++) {
      if (newTextValue != "") spacing = " + ";
      if (updatedCheckboxes[i] == true) {
        console.log("yes" + i)
        console.log(i + " " + textValue)
        newTextValue += textValue + spacing + tacticChoices[i];
      }
    }
    setText(newTextValue);
  }

  // Send data to API
  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://localhost:8001/JEE_api_war/DataServlet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput: textValue })
      });

      const data = await response.json();
      const result = data
      console.log("received data " + result);
      setResult(result.finalFormation);
      setInstructions(result.instructions);
      setIsDisplayed(true);
    } catch (error) {
      console.error(error);
    }

  };


  const tacticComponents = tacticChoices.map((tactic, index) => (
    <Grid>
      <Button flat color={checkboxes[index] ? "success" : "light"} css={{ w: "300px", h: "80px" }}
        onPress={() => handleChecked(index)}>{tactic}</Button>
    </Grid>
    /*
    <Grid>
      <Card
        isPressable
        isHoverable
        key={index}
        css={{ backgroundColor: checkboxes[index] ? '#17C964' : 'white', w: "300px", h: "80px" }}
        onPress={() => handleChecked(index)}
        variant="flat"
      >
        <Card.Body>
          <Text>{tactic}</Text>
        </Card.Body>
      </Card>
    </Grid>
    */
  ));

  // Test Login
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  if (user) {
    console.log(user.email)
  }
  else {
    console.log("nooo")
  }

  return (
    <>
      {isDisplayed && <Button flat icon={<FontAwesomeIcon icon={faCircleArrowLeft} />} auto onPress={() => setIsDisplayed(false)}>
        Cancel
      </Button>}
      {!isDisplayed && <Row>
        <Col>
          <Card>
            <Card.Header>
              <Text size={12} weight="bold" transform="uppercase">
                Choose tactics
              </Text>
            </Card.Header>
            <Card.Body>
              <Grid.Container gap={1}>
                {tacticComponents}
              </Grid.Container>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card css={{ w: "600px", margin: "0 auto" }}>
            <Card.Header>
              <Text b>Your tactic</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Textarea
                bordered
                status="primary"
                helperText="Choose from checkboxes"
                label="Choose how you want your team plays"
                placeholder="Enter your amazing ideas."
                width="550px"
                rows={5}
                value={textValue}
              />
            </Card.Body>
            <Card.Footer>
              <Row justify="flex-end">
                <Button size="sm" light onPress={() => {setCheckboxes([false, false, false, false, false, false, false, false, false, false, false, false]); setText("")}}>
                  Annuler
                </Button>
                <Button size="sm" color="primary" onClick={sendDataToServer}>
                  Enregistrer
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>}


      <Spacer x={2} />
      {isDisplayed && <TacticResult result={result} all_instructions={instructions} />}
      <Spacer x={2} />




    </>
  );
}
