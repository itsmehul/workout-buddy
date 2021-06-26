import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "../../components/Form/CustomInput";
import CustomSelect from "../../components/Form/CustomSelect";
import {
  CreateWorkoutTypes,
  useCreateWorkout,
  UserSetLevels,
} from "../../context/CreateWorkout";

const schema = yup.object().shape({
  name: yup.string().required("Name your workout for others to find!"),
  userSetLevel: yup.string().required("Set a level"),
  unit: yup.string().required("Set a unit for calculations"),
});

interface DescriptionProps {
  onSuccess: () => void;
}

const Description: React.FC<DescriptionProps> = ({ onSuccess }) => {
  const { addDescription } = useCreateWorkout();

  const {
    handleSubmit,
    errors,
    register,
  } = useForm<CreateWorkoutTypes.OverviewInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (d: CreateWorkoutTypes.OverviewInput) => {
    addDescription(d);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6}>
        <CustomInput
          name="name"
          variant="filled"
          placeholder="Name of workout"
          size="md"
          errors={errors}
          register={register}
        />
        <CustomSelect
          name="userSetLevel"
          variant="filled"
          placeholder="Difficulty level"
          size="md"
          options={Object.values(UserSetLevels)}
          errors={errors}
          register={register}
        />
        <CustomSelect
          name="unit"
          variant="filled"
          placeholder="Unit of weight"
          size="md"
          options={["KG", "POUND"]}
          errors={errors}
          register={register}
        />
        <Button colorScheme="blue" type="submit">
          Save & Next
        </Button>
      </VStack>
    </form>
  );
};

export default Description;
