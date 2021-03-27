import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import { useFirebase } from "../../context/Firebase";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default (): JSX.Element => {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated, signout, user } = useFirebase();

  return (
    <Box mb="5">
      <Flex minH="60px" py={{ base: 2 }} px={{ base: 4 }} align="center">
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily="heading"
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          alignItems="center"
          direction="row"
          spacing={6}
        >
          <ColorModeSwitcher />
          {isAuthenticated && (
            <>
              <Avatar
                size="sm"
                name={user?.displayName || "Dan Abrahmov"}
                src={user?.photoURL || "https://bit.ly/dan-abramov"}
              />
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                background="black"
                href="#"
                _hover={{
                  bg: "gray.600",
                }}
                variant="outline"
                onClick={signout}
              >
                Quit
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};
