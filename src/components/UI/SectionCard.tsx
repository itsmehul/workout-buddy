import { Box, Heading, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { BsChevronRight } from "react-icons/bs";

interface SectionCardProps {
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const COLORS: { [key: string]: Array<string> } = {
  blue: ["#8E2DE2", "#4A00E0"],
  red: ["#fc3939", "#e51212"],
  pink: ["#fc39a7", "#dd218b"],
  yellow: ["#fcd439", "#e7bf22"],
  orange: ["#fc6739", "#e15023"],
};

export default ({
  title,
  description,
  color,
  onClick,
}: SectionCardProps): JSX.Element => {
  return (
    <Box
      position="relative"
      maxW="32rem"
      padding="8"
      background={`linear-gradient(${COLORS[color][0]}, ${COLORS[color][1]})`}
      borderRadius="md"
      transition="all 300ms"
      cursor="pointer"
      _hover={{ transform: `scale(1.015)` }}
      boxShadow="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
      onClick={onClick}
    >
      <Heading mb={4}>{title}</Heading>
      <Text fontSize="l" fontWeight="medium">
        {description}
      </Text>
      <IconButton
        // onClick={onToggle}
        icon={<BsChevronRight />}
        variant="ghost"
        aria-label="Toggle Navigation"
        position="absolute"
        right="0.5em"
        bottom="0.5em"
        size="lg"
        _hover={{ background: "#0000001c" }}
      />
    </Box>
  );
};
