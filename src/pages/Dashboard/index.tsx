/* eslint-disable react/no-unescaped-entities */
import { Grid } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import SectionCard from "../../components/UI/SectionCard";

const Dashboard = (): JSX.Element => {
  const history = useHistory();

  return (
    <>
      <Grid
        templateColumns="repeat(auto-fit, minmax(280px,320px))"
        gap={4}
        justifyContent="center"
      >
        <SectionCard
          title="Create Workout"
          description="Create your first workout!"
          color="blue"
          onClick={() => history.push("/create-workout")}
        />
        <SectionCard
          title="View Workouts"
          description="Choose from over a 100 workouts"
          color="orange"
          onClick={() => history.push("/create-workout")}
        />
        <SectionCard
          title="Buddies"
          description="Find a workout buddy"
          color="yellow"
          onClick={() => history.push("/create-workout")}
        />
      </Grid>
    </>
  );
};

export default Dashboard;
