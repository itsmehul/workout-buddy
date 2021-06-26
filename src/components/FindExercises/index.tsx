import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Badge,
  Container,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import useDebounce from "@rooks/use-debounce";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { MdSlowMotionVideo } from "react-icons/md";
import MotionBox from "../UI/MotionBox";
import { ExerciseTypes } from "../../context/CreateWorkout";

const EXERCISES = [
  {
    name: "Triangle Pushups",
    type: ["CHEST", "CORE"],
    video: "someUrl",
    weights: true,
  },
  {
    name: "Square Pushups",
    type: ["CHEST", "CORE"],
    video: "someUrl",
    weights: false,
  },
  {
    name: "Squats",
    type: ["LEGS", "CORE", "GLUTES"],
    video: "someUrl",
    weights: true,
  },
  {
    name: "Bicep Curls",
    type: ["ARMS"],
    video: "someUrl",
    weights: true,
  },
];

// interface Exercise {
//   name: string;
//   type: string[];
//   video: string;
//   weights: boolean;
// }

interface ExerciseMap {
  [key: string]: JSX.Element[];
}

interface FindExercisesProps {
  closeSearch: () => void;
  isShown: boolean;
}

const FindExercises: React.FC<FindExercisesProps> = ({
  closeSearch,
  isShown,
}) => {
  const [exercises, setExercises] = useState(EXERCISES);

  const theme = useColorModeValue("gray.100", "blackAlpha.900");

  const searchWithValue = useDebounce((searchTerm: string) => {
    const foundExercises = EXERCISES.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setExercises(foundExercises);
  }, 500);

  const exerciseMap: ExerciseMap = {
    [ExerciseTypes.CHEST]: [],
    [ExerciseTypes.LEGS]: [],
    [ExerciseTypes.GLUTES]: [],
    [ExerciseTypes.ARMS]: [],
    [ExerciseTypes.CORE]: [],
  };

  exercises.forEach((exercise) => {
    Object.keys(exerciseMap).forEach(
      (exerciseType) =>
        exercise.type.includes(exerciseType) &&
        exerciseMap[exerciseType].push(
          <Flex
            justifyContent="space-between"
            _hover={{
              p: {
                fontWeight: 600,
              },
            }}
          >
            <Text fontSize="sm">{exercise.name}</Text>
            <HStack>
              {exercise.weights && <FaDumbbell />}
              <MdSlowMotionVideo />
              <Button size="xs" colorScheme="gray">
                Add
              </Button>
            </HStack>
          </Flex>
        )
    );
  });

  return (
    <AnimatePresence>
      {isShown && (
        <MotionBox
          key="overlay"
          position="fixed"
          top="0"
          left="0"
          bottom="0"
          right="0"
          display="flex"
          justifyContent="center"
          onClick={closeSearch}
        />
      )}
      {isShown && (
        <MotionBox
          key="content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          zIndex="9999"
          position="fixed"
          top="10vh"
          left="0"
          right="0"
        >
          <Container maxWidth="container.xl">
            <InputGroup maxWidth="md">
              <Input
                bg={theme}
                _hover={{ bg: theme }}
                _focus={{ bg: theme }}
                variant="filled"
                placeholder="Search for exercises"
                onChange={(e) => {
                  searchWithValue(e.target.value);
                }}
              />
              <InputRightElement>
                <Search2Icon />
              </InputRightElement>
            </InputGroup>
            <Grid
              gridTemplateColumns="repeat(auto-fit,minmax(200px,auto))"
              maxHeight="70vh"
              marginTop="1em"
              bg={theme}
              boxShadow="xl"
              borderRadius="md"
              overflow="scroll"
              className="example"
              padding="4"
              gridGap="2em"
            >
              {exercises.length > 0 ? (
                Object.keys(exerciseMap)
                  .sort((a, b) => exerciseMap[b].length - exerciseMap[a].length)
                  .map(
                    (key) =>
                      exerciseMap[key].length > 0 && (
                        <VStack align="left" spacing={[4, 1]}>
                          <Badge colorScheme="blue" width="fit-content">
                            {key}
                          </Badge>
                          {exerciseMap[key]}
                        </VStack>
                      )
                  )
              ) : (
                <Flex
                  flexDirection="column"
                  minHeight="40vh"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontWeight="600">Couldn't find your exercise :(</Text>
                  <Text>Don't worry we'll add it soon!</Text>
                </Flex>
              )}
            </Grid>
          </Container>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};
export default FindExercises;
