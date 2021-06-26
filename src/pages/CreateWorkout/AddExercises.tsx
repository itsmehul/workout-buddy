import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import FindExercises from "../../components/FindExercises";
import {
  CreateWorkoutTypes,
  useCreateWorkout,
} from "../../context/CreateWorkout";
import AddExerciseCard from "./AddExerciseCard";

interface AddExercisesProps {
  onSuccess: () => void;
  goBack: () => void;
}

const AddExercises: React.FC<AddExercisesProps> = ({ goBack, onSuccess }) => {
  const { updateExercise, workout } = useCreateWorkout();

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const [exercises, setExercises] = useState();

  console.log(workout);

  return (
    <>
      <FindExercises
        closeSearch={() => setShowSearch(false)}
        isShown={showSearch}
      />
      <Box>
        <Button variant="ghost" onClick={() => setShowSearch(true)}>
          Open search
        </Button>
        {Object.keys(workout.weeks).map((weekNumber) => (
          <Box>
            <Text>Week {weekNumber}</Text>
            {Object.keys(workout.weeks[weekNumber]).map((dayNumber) => (
              <Box>
                <Text>Day {dayNumber}</Text>
                {workout.weeks[weekNumber][dayNumber].map((exercise, index) => (
                  <AddExerciseCard
                    key={Math.random()}
                    exercise={exercise}
                    onModified={(
                      updatedExercise: CreateWorkoutTypes.Exercise
                    ) =>
                      updateExercise(
                        weekNumber,
                        dayNumber,
                        index,
                        updatedExercise
                      )
                    }
                  />
                ))}
              </Box>
            ))}
          </Box>
        ))}
        <Button variant="ghost" onClick={goBack}>
          Back
        </Button>
        <Button onClick={onSuccess}>Save & Next</Button>
      </Box>
    </>
  );
};
export default AddExercises;
