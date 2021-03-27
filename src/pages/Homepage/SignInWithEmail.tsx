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
});

type Inputs = {
  email: string;
  password: string;
};

const SignInWithEmail: React.FC<{ onSuccess: any }> = ({ onSuccess }) => {
  const { signinWithEmail } = useFirebase();

  const { handleSubmit, errors, register } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ email, password }: Inputs) =>
    onSuccess(() => signinWithEmail(email, password))();

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
        <Button bg="orange.400" type="submit">
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default SignInWithEmail;
