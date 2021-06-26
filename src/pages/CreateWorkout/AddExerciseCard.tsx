import { Box, Grid, HStack, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import useOutsideClickRef from "@rooks/use-outside-click-ref";
import React from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/Form/CustomInput";
import { CreateWorkoutTypes } from "../../context/CreateWorkout";

interface AddExerciseCardProps {
  exercise: CreateWorkoutTypes.Exercise;
  onModified: (exercise: CreateWorkoutTypes.Exercise) => void;
}

// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Must be a valid email")
//     .required("Email is required"),
//   password: yup.string().required("Password is required"),
// });

interface ConfigureWorkoutNumberInputTypes {
  name: string;
  label: string;
  register: any;
  errors: any;
}

const ConfigureWorkoutNumberInput: React.FC<ConfigureWorkoutNumberInputTypes> = ({
  name,
  label,
  register,
  errors,
}) => (
  <Box width="14">
    <Tooltip label={label} placement="top" hasArrow>
      <Box>
        <CustomInput
          name={name}
          variant="filled"
          placeholder={label[0]}
          size="xs"
          type="number"
          errors={errors}
          register={register}
          hideMessage
        />
      </Box>
    </Tooltip>
  </Box>
);

const AddExerciseCard: React.FC<AddExerciseCardProps> = ({
  exercise,
  onModified,
}) => {
  const {
    handleSubmit,
    errors,
    register,
  } = useForm<CreateWorkoutTypes.Exercise>({
    defaultValues: exercise,
  });

  const onSubmit = () =>
    handleSubmit((updatedExercise: CreateWorkoutTypes.Exercise) => {
      onModified({
        ...updatedExercise,
        name: exercise.name,
        videoUrl: exercise.videoUrl,
      });
    })();

  const [ref] = useOutsideClickRef(onSubmit);

  return (
    <form ref={ref}>
      <Grid gridTemplateColumns="repeat(auto-fit,minmax(300px,auto))">
        <HStack>
          <Text>{exercise.name}</Text>
          <Text>{exercise.videoUrl}</Text>
        </HStack>
        <HStack>
          <ConfigureWorkoutNumberInput
            label="Weight"
            name="w"
            register={register}
            errors={errors}
          />
          <ConfigureWorkoutNumberInput
            label="Time"
            name="t"
            register={register}
            errors={errors}
          />
          <ConfigureWorkoutNumberInput
            label="Reps"
            name="r"
            register={register}
            errors={errors}
          />
          <ConfigureWorkoutNumberInput
            label="Distance"
            name="d"
            register={register}
            errors={errors}
          />
        </HStack>
      </Grid>
    </form>
  );
};
export default React.memo(AddExerciseCard, () => true);
