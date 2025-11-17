import { useState, useEffect } from "react";
import {
    Button,
    Heading,
    Flex,
    View,
    Grid,
    Divider
} from "@aws-amplify/ui-react";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";

import outputs from "../amplify_outputs.json";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
Amplify.configure(outputs);

const client = generateClient({
    authMode: "userPool"
});

export default function App() {
    const [userprofiles, setUserProfiles] = useState([]);
    const [counter, setCounter] = useState(0); // Counter state
    const { signOut } = useAuthenticator((context) => [context.user]);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    async function fetchUserProfile() {
        const { data: profiles } = await client.models.UserProfile.list();
        setUserProfiles(profiles);
    }

    function handleCounterClick() {
        const chance = Math.random(); // Random number between 0 and 1
        if (chance <= 0.01) {
            setCounter(counter + 10); // 1% chance to increment by 10
        } else {
            setCounter(counter + 1); // Otherwise increment by 1
        }
    }

    return (
        <Flex
            className="App"
            justifyContent="center"
            alignItems="center"
            direction="column"
            width="70%"
            margin="0 auto"
        >
            <Heading level={1}>My Profile</Heading>
            <Divider />

            <Grid
                margin="3rem 0"
                autoFlow="column"
                justifyContent="center"
                gap="2rem"
                alignContent="center"
            >
                {userprofiles.map((userprofile) => (
                    <Flex
                        key={userprofile.id || userprofile.email}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="2rem"
                        border="1px solid #ccc"
                        padding="2rem"
                        borderRadius="5%"
                        className="box"
                    >
                        <View>
                            <Heading level={3}>{userprofile.email}</Heading>
                        </View>
                    </Flex>
                ))}
            </Grid>

            {/* Andrew Kim Counter Button */}
            <Flex direction="column" alignItems="center" gap="1rem" margin="2rem 0">
                <Button onClick={handleCounterClick}>Andrew Kim</Button>
                <Heading level={4}>Counter: {counter}</Heading>
            </Flex>

            <Button onClick={signOut}>Sign Out</Button>
        </Flex>
    );
}
