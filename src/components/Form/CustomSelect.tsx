import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Select, SelectProps } from "@chakra-ui/select";
import React from "react";
import { FieldErrors } from "react-hook-form";

interface CustomInputProps {
  name: string;
  errors: FieldErrors;
  options: Array<string>;
  register: any;
}

const CustomSelect: React.FC<CustomInputProps & SelectProps> = ({
  name,
  errors,
  register,
  options,
  ...inputProps
}) => {
  return (
    <FormControl isInvalid={!!errors[name]}>
      <Select
        variant="filled"
        size="md"
        {...inputProps}
        name={name}
        ref={register}
      >
        {options.map((opt) => (
          <option value={opt}>{opt}</option>
        ))}
      </Select>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CustomSelect;
