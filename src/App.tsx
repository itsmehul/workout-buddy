import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import "firebase/auth";
import * as React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import theme from "./config/theme";
import { FirebaseContextProvider } from "./context/Firebase";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <FirebaseContextProvider>
        <Container maxW="container.lg">
          <Header />
          {/* <Homepage /> */}
          <Box minH="calc(100vh - 176px)">
            <Navigation />
          </Box>

          <Footer />
        </Container>
      </FirebaseContextProvider>
    </ChakraProvider>
  );
};

export default App;
