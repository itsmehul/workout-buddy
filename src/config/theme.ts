import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  layerStyles: {
    base: {
      bg: "gray.50",
      border: "2px solid",
      borderColor: "gray.500",
    },
    selected: {
      bg: "teal.500",
      color: "teal.700",
      borderColor: "orange.500",
    },
  },
  components: {
    Heading: {
      baseStyle: (p) => ({
        color: p.colorMode === "dark" ? "white" : "#393939",
      }),
    },
  },
});
