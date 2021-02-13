import React from "react";
import { Box, ChakraProps, forwardRef } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

// 1. Create a custom motion component from Box
export default motion.custom(
  forwardRef((props: ChakraProps, ref: any) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);
