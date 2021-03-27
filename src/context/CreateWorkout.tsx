import React, { ContextType, createContext, useContext, useState } from "react";

const initialState = {
  name: "",
  weighted: true,
  grind: "",
  userSetLevel: "",
  weeks: {
    1: {
      MON: [],
      TUE: [],
      WED: [],
      THU: [],
      FRI: [],
      SAT: [],
      SUN: [],
    },
  },
};
declare namespace Types {
  type Workout = {
    name: string;
    weighted: boolean;
    grind: string;
    userSetLevel: string;
    weeks: Week;
  };

  type Week = {
    [key: string]: Day;
  };

  type Day = {
    [key: string]: Array<Exercise>;
  };

  type Exercise = {
    name: any;
    w?: any;
    t?: any;
    r: any;
    s: any;
  };
}

interface WorkoutContextInterface {
  workout: Types.Workout;
  // setWorkout: Dispatch<SetStateAction<Types.Workout>>;
  addWeek: () => void;
  clearDay: (weekNumber: number, day: string) => void;
  addExercise: (
    weekNumber: number,
    day: string,
    exercise: Types.Exercise
  ) => void;
  shiftPosition: (
    weekNumber: number,
    day: string,
    exercise: Types.Exercise,
    index: number,
    direction: "UP" | "DOWN"
  ) => void;
}

// Create Context Object
export const CreateWorkoutContext = createContext(
  {} as WorkoutContextInterface
);

export const useCreateWorkout = (): ContextType<typeof CreateWorkoutContext> =>
  useContext(CreateWorkoutContext);

// Create a provider for components to consume and subscribe to changes
export const CreateWorkoutContextProvider: React.FC = ({ children }) => {
  const [workout, setWorkout] = useState<Types.Workout>(initialState);

  const addWeek = () => {
    const lastWeekNumber = Number(Object.keys(workout.weeks).pop());

    setWorkout({
      ...workout,
      weeks: {
        ...workout.weeks,
        [lastWeekNumber + 1]: workout.weeks[lastWeekNumber],
      },
    });
  };

  const clearDay = (weekNumber: number, day: string) => {
    const updatedWorkout = workout;
    updatedWorkout.weeks[weekNumber][day] = [];
    setWorkout(updatedWorkout);
  };

  const addExercise = (
    weekNumber: number,
    day: string,
    exercise: Types.Exercise
  ) => {
    const updatedWorkout = workout;
    updatedWorkout.weeks[weekNumber][day] = [
      ...updatedWorkout.weeks[weekNumber][day],
      exercise,
    ];
    setWorkout(updatedWorkout);
  };

  const shiftPosition = (
    weekNumber: number,
    day: string,
    exercise: Types.Exercise,
    index: number,
    direction: "UP" | "DOWN"
  ) => {
    const updatedWorkout = workout;

    const moveIndex = direction === "UP" ? -1 : 1;

    if (!updatedWorkout.weeks[weekNumber][day][index + moveIndex]) {
      return;
    }

    updatedWorkout.weeks[weekNumber][day][index] =
      updatedWorkout.weeks[weekNumber][day][index + moveIndex];
    updatedWorkout.weeks[weekNumber][day][index + moveIndex] = exercise;

    setWorkout(updatedWorkout);
  };

  return (
    <CreateWorkoutContext.Provider
      value={{
        workout,
        // setWorkout,
        addWeek,
        clearDay,
        addExercise,
        shiftPosition,
      }}
    >
      {children}
    </CreateWorkoutContext.Provider>
  );
};
