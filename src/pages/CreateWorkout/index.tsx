import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PageLayout from "../../components/UI/PageLayout";
import {
  CreateWorkoutContextProvider,
  useCreateWorkout,
} from "../../context/CreateWorkout";
import AddExercises from "./AddExercises";
import Description from "./Description";

const CreateWorkout = (): JSX.Element => {
  const {
    workout,
    addWeek,
    clearDay,
    addExercise,
    shiftPosition,
  } = useCreateWorkout();

  const [tabIndex, setTabIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextStep = () => {
    setTabIndex((tI) => tI + 1);
    setProgress((p) => Math.max(p, tabIndex + 1));
  };

  const previousStep = () => {
    setTabIndex((tI) => tI - 1);
  };

  const handleStep = (index: number) => {
    setTabIndex(index);
  };

  return (
    <PageLayout name="Create Workout">
      <Box>
        <Tabs
          align="center"
          variant="soft-rounded"
          index={tabIndex}
          onChange={handleStep}
        >
          <TabList>
            {["Description", "Add Exercises", "Schedule"].map(
              (label, index) => (
                <Tab isDisabled={index > progress} fontSize={["xs", "md"]}>
                  {label}
                </Tab>
              )
            )}
          </TabList>
          <TabPanels>
            <TabPanel maxW="md">
              <Description onSuccess={nextStep} />
            </TabPanel>
            <TabPanel>
              <AddExercises goBack={previousStep} onSuccess={nextStep} />
            </TabPanel>
            <TabPanel>
              <p>Oh, hello there.</p>
              <Button variant="ghost" onClick={previousStep}>
                Back
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </PageLayout>
  );
};

export default (): JSX.Element => (
  <CreateWorkoutContextProvider>
    <CreateWorkout />
  </CreateWorkoutContextProvider>
);
