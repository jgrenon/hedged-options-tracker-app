import { Flex, Link as UILink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Strategies() {
  return (
    <Flex>
      strategies
      <UILink as={Link} to="/">
        Back Home
      </UILink>
    </Flex>
  );
}
