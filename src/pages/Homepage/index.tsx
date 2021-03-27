import {
  Container,
  Grid,
  Heading,
  HStack,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import SignInWithEmail from "./SignInWithEmail";
import SignUpWithEmail from "./SignUpWIthEmail";

export default (): JSX.Element => {
  const { signinGoogle, signinFacebook } = useFirebase();
  const history = useHistory();

  const handleSignIn = (callback: () => void) => async () => {
    await callback();
    history.push("/");
  };

  return (
    <Container maxW="5xl">
      <Grid
        gridTemplateColumns="repeat(auto-fit,minmax(300px,auto))"
        minHeight="70vh"
        gridGap="2em"
      >
        <Stack
          textAlign="center"
          alignSelf="center"
          spacing={{ base: 2, md: 10 }}
          maxWidth={400}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight="110%"
          >
            Working out{" "}
            <Text as="span" color="orange.400">
              made fun & easy
            </Text>
          </Heading>
          <Text color="gray.500" maxW="3xl">
            Never miss a meeting. Never be late for one too. Keep track of your
            meetings and receive smart reminders in appropriate times. Read your
            smart “Daily Agenda” every morning.
          </Text>
        </Stack>
        <VStack alignSelf="center">
          <Heading as="h1" size="md">
            Join the crew
          </Heading>
          <Heading as="h2" size="sm" marginBottom="3">
            via Email
          </Heading>
          <Tabs
            variant="soft-rounded"
            colorScheme="orange"
            align="center"
            width="100%"
          >
            <TabList>
              <Tab fontSize={["xs", "sm", "md"]}>Already Registered</Tab>
              <Tab fontSize={["xs", "sm", "md"]}>Create An Account</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignInWithEmail onSuccess={handleSignIn} />
              </TabPanel>
              <TabPanel>
                <SignUpWithEmail onSuccess={handleSignIn} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Heading as="h2" size="sm">
            via Social
          </Heading>
          <HStack>
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Login Google"
              onClick={handleSignIn(signinGoogle)}
              icon={<FaGoogle size="30px" />}
            />
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Login Facebook"
              onClick={handleSignIn(signinFacebook)}
              icon={<FaFacebook size="30px" />}
            />
          </HStack>
        </VStack>
      </Grid>
    </Container>
  );
};
