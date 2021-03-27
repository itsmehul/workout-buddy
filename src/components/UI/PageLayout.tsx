import { Box, Container, Heading } from "@chakra-ui/react";
import React from "react";

interface PageLayoutProps {
  name: string;
  children: React.ReactElement;
}

export default ({ name, children }: PageLayoutProps): JSX.Element => {
  return (
    <Container maxW="container.lg">
      <Box>
        <Heading as="h1" textAlign="center" fontSize={["2xl", "3xl"]} mb="7">
          {name}
        </Heading>
      </Box>
      {children}
    </Container>
  );
};
