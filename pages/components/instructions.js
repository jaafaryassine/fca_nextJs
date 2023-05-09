import { Card, Col, Grid, Text, Modal, Button, Container } from "@nextui-org/react";
import { useState } from "react";
import ReactPlayer from 'react-player'

export default function Instructions({ all_instructions }) {
    const [visible, setVisible] = useState(false);
    const [instructionItem, setInstructionItem] = useState();
    const handler = (i) => {
        setInstructionItem(i);
        setVisible(true);
    };

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };
   
    const instructionsComponent = all_instructions.map((inst, index) => (
        <Grid xs={12} sm={4}>
            <Card isPressable onPress={() => handler(index)}>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                            Instruction
                        </Text>
                        <Text h4 color="white">
                            {inst}
                        </Text>
                    </Col>
                </Card.Header>
                <Card.Image
                    src={`/images/${inst}.png`}
                    objectFit="cover"
                    width="100%"
                    height={340}
                    alt="Card image background"
                />
            </Card>
        </Grid>

    ));
    return (
        <>
            <Grid.Container gap={3}>
                {instructionsComponent}
            </Grid.Container>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
                width="800px"
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        <Text b size={18}>
                            Video
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body css={{ justifyContent: 'center' }}>
                    <Container>
                        <Text>{all_instructions[instructionItem]}</Text>
                        <ReactPlayer url={`/videos/${all_instructions[instructionItem]}.mp4`} controls={true} width={"700px"} />
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={closeHandler}>
                        Good
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


