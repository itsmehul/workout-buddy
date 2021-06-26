import React, { ContextType, createContext, useContext, useState } from "react";

export const UserSetLevels = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
  CHALLENGE: "CHALLENGE",
};

const initialState = {
  name: "",
  weighted: false,
  userSetLevel: UserSetLevels.MEDIUM,
  unit: "KG",
  weeks: {
    1: {
      1: [
        {
          name: "Triangle Pushups",
          type: ["CHEST", "CORE"],
          videoUrl: "someUrl",
          weights: true,
        },
      ],
    },
  },
};
export enum ExerciseTypes {
  CHEST = "CHEST",
  CORE = "CORE",
  LEGS = "LEGS",
  GLUTES = "GLUTES",
  ARMS = "ARMS",
}
export declare namespace CreateWorkoutTypes {
  interface OverviewInput {
    name: string;
    userSetLevel: string;
    weighted?: boolean;
    unit: string;
  }
  interface Overview {
    name: string;
    userSetLevel: string;
    weighted?: boolean;
    unit: string;
  }
  interface Workout extends Overview {
    weeks: Week;
  }

  type Week = {
    [key: string]: Day;
  };

  type Day = {
    [key: string]: Array<Exercise>;
  };

  interface Exercise {
    name: string;
    videoUrl: string;
    type?: Array<ExerciseTypes | string>;
    weights?: boolean;
    w?: any;
    t?: any;
    r?: any;
    d?: any;
  }
}

interface WorkoutContextInterface {
  workout: CreateWorkoutTypes.Workout;
  // setWorkout: Dispatch<SetStateAction<CreateWorkoutTypes.Workout>>;
  addWeek: () => void;
  clearDay: (weekNumber: string, dayNumber: string) => void;
  addExercise: (
    weekNumber: string,
    dayNumber: string,
    exercise: CreateWorkoutTypes.Exercise
  ) => void;
  updateExercise: (
    weekNumber: string,
    dayNumber: string,
    index: number,
    updatedExercise: CreateWorkoutTypes.Exercise
  ) => void;
  shiftPosition: (
    weekNumber: string,
    dayNumber: string,
    exercise: CreateWorkoutTypes.Exercise,
    index: number,
    direction: "UP" | "DOWN"
  ) => void;
  addDescription: (description: CreateWorkoutTypes.OverviewInput) => void;
}

// Create Context Object
export const CreateWorkoutContext = createContext(
  {} as WorkoutContextInterface
);

export const useCreateWorkout = (): ContextType<typeof CreateWorkoutContext> =>
  useContext(CreateWorkoutContext);

// Create a provider for components to consume and subscribe to changes
export const CreateWorkoutContextProvider: React.FC = ({ children }) => {
  const [workout, setWorkout] = useState<CreateWorkoutTypes.Workout>(
    initialState
  );

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

  const clearDay = (weekNumber: string, dayNumber: string) => {
    const updatedWorkout = workout;
    updatedWorkout.weeks[weekNumber][dayNumber] = [];
    setWorkout(updatedWorkout);
  };

  const addExercise = (
    weekNumber: string,
    dayNumber: string,
    exercise: CreateWorkoutTypes.Exercise
  ) => {
    const updatedWorkout = workout;
    updatedWorkout.weeks[weekNumber][dayNumber] = [
      ...updatedWorkout.weeks[weekNumber][dayNumber],
      exercise,
    ];
    setWorkout({ ...updatedWorkout });
  };

  const updateExercise = (
    weekNumber: string,
    dayNumber: string,
    index: number,
    updatedExercise: CreateWorkoutTypes.Exercise
  ) => {
    const updatedWorkout = workout;
    updatedWorkout.weeks[weekNumber][dayNumber][index] = updatedExercise;
    setWorkout({ ...updatedWorkout });
  };

  const shiftPosition = (
    weekNumber: string,
    dayNumber: string,
    exercise: CreateWorkoutTypes.Exercise,
    index: number,
    direction: "UP" | "DOWN"
  ) => {
    const updatedWorkout = workout;

    const moveIndex = direction === "UP" ? -1 : 1;

    if (!updatedWorkout.weeks[weekNumber][dayNumber][index + moveIndex]) {
      return;
    }

    updatedWorkout.weeks[weekNumber][dayNumber][index] =
      updatedWorkout.weeks[weekNumber][dayNumber][index + moveIndex];
    updatedWorkout.weeks[weekNumber][dayNumber][index + moveIndex] = exercise;

    setWorkout({ ...updatedWorkout });
  };

  const addDescription = (description: CreateWorkoutTypes.OverviewInput) => {
    setWorkout((w) => ({
      ...w,
      ...description,
    }));
  };

  return (
    <CreateWorkoutContext.Provider
      value={{
        workout,
        // setWorkout,
        addWeek,
        clearDay,
        addExercise,
        updateExercise,
        shiftPosition,
        addDescription,
      }}
    >
      {children}
    </CreateWorkoutContext.Provider>
  );
};
