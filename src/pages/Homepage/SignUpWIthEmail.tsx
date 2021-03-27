import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "../../components/Form/CustomInput";
import { useFirebase } from "../../context/Firebase";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpWithEmail: React.FC<{ onSuccess: any }> = ({ onSuccess }) => {
  const { signupWithEmail } = useFirebase();

  const { handleSubmit, errors, register } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ email, password }: Inputs) =>
    onSuccess(() => signupWithEmail(email, password))();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={3}>
        <CustomInput
          name="email"
          variant="filled"
          placeholder="Email"
          size="md"
          errors={errors}
          register={register}
        />
        <CustomInput
          name="password"
          variant="filled"
          placeholder="Password"
          size="md"
          type="password"
          errors={errors}
          register={register}
        />
        <CustomInput
          name="confirmPassword"
          variant="filled"
          placeholder="Confirm Password"
          size="md"
          type="password"
          errors={errors}
          register={register}
        />
        <Button bg="orange.400" type="submit">
          Register
        </Button>
      </VStack>
    </form>
  );
};

export default SignUpWithEmail;
