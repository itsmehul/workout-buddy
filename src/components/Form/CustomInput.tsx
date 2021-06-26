import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputProps } from "@chakra-ui/input";
import React from "react";
import { FieldErrors } from "react-hook-form";

interface CustomInputProps {
  name: string;
  errors: FieldErrors;
  register: any;
  hideMessage?: boolean | undefined;
}

const CustomInput: React.FC<CustomInputProps & InputProps> = ({
  name,
  errors,
  register,
  hideMessage,
  ...inputProps
}) => {
  return (
    <FormControl isInvalid={errors && !!errors[name]}>
      <Input
        variant="filled"
        size="md"
        {...inputProps}
        name={name}
        ref={register}
      />
      {!hideMessage && (
        <FormErrorMessage>
          {errors[name] && errors[name].message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomInput;
