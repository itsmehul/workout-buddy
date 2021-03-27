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
import { CreateWorkoutContextProvider } from "../../context/CreateWorkout";

const CreateWorkout = (): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextStep = () => {
    setTabIndex((tI) => tI + 1);
    setProgress((p) => Math.max(p, tabIndex + 1));
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
            {["One", "Two", "Three"].map((label, index) => (
              <Tab isDisabled={index > progress}>{label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Click the tabs or pull the slider around</p>
              <Button onClick={nextStep}>Next</Button>
            </TabPanel>
            <TabPanel>
              <p>Yeah yeah.</p>
              <Button onClick={nextStep}>Next</Button>
            </TabPanel>
            <TabPanel>
              <p>Oh, hello there.</p>
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
