import React from "react";
import { Navbar, User, Dropdown, Button, Link, Text, Avatar } from "@nextui-org/react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


export default function LoggedNavbar() {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const sign_out = () => {
        signOut(auth).then(() => {
            console.log("Sign-out successful")

        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <Navbar isBordered variant={"floating"}>
            <Navbar.Brand>
                <Text hideIn="xs" css={{ textGradient: "45deg, $purple600 -20%, $pink600 100%", }} weight="bold" >
                    Football Coach Assistant

                </Text>
                <Text b color="inherit" hideIn="xs">
                </Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Navbar.Link href="/league-stats.js">Stats</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Item>
                    <Dropdown placement="bottom-left">
                        <Dropdown.Trigger>
                            <User
                                bordered
                                as="button"
                                size="lg"
                                color="primary"
                                name={user.displayName}
                                description="Utilisateur"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            />
                        </Dropdown.Trigger>
                        <Dropdown.Menu color="primary" aria-label="User Actions">
                            <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    {user.email}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="settings" withDivider>
                                My Settings
                            </Dropdown.Item>
                            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                            <Dropdown.Item key="logout" color="error" withDivider>
                                <Button light onPress={sign_out}>Log Out</Button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>

    )
}
