import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import { MoveLeft, MoveRight } from "lucide-react";

function Marker({ label, value, current, bg, color }) {
  return (
    <Flex
      flexShrink={1}
      fontSize="xs"
      position="relative"
      flexDir="column"
      p={3}
      fontWeight={current ? "extrabold" : "light"}
      color={color || "gray.800"}
      minH="xs"
      bg={bg}
    >
      <Center>
        <Box
          position="absolute"
          bg={color || "gray.700"}
          top={10}
          bottom={10}
          w={current ? 1 : 0.5}
        />
      </Center>
      <Center borderBottom="1px solid" borderColor={color}>
        {label}
      </Center>
      <Spacer />
      <Center borderTop="1px solid" borderColor={color}>
        {value}
      </Center>
    </Flex>
  );
}

function ProbSpacer({ prob, left, right, bg, color }) {
  return (
    <Spacer fontSize="xs" textAlign="center" bg={bg}>
      <Center h="full" color={color || "gray.300"}>
        {left && <Box as={MoveLeft} />}
        <Box as="span" mx={1} color="gray.500">
          {prob}
        </Box>
        {right && <Box as={MoveRight} />}
      </Center>
    </Spacer>
  );
}
export function StrategyValueRuler() {
  return (
    <Flex flex={1} px={10} py={5}>
      <Marker
        label="Low Value"
        value={25650}
        bg="yellow.100"
        color="yellow.800"
      />
      <ProbSpacer prob="15%" left bg="yellow.100" color="yellow.800" />
      <Marker
        label="Worthless"
        value={28768}
        bg="green.100"
        color="green.800"
      />
      <ProbSpacer prob="25%" left bg="green.100" color="green.800" />
      <Marker label="Buy Back" value={29450} bg="green.100" color="green.800" />
      <ProbSpacer prob="45%" left bg="green.100" color="green.800" />
      <Marker
        label="ITM"
        value={31450}
        bg="green.100"
        color="green.800"
        current
      />
      <ProbSpacer prob="45%" left bg="green.100" color="green.800" />
      <Marker label="Strike" value={31450} bg="green.100" color="green.800" />
      <ProbSpacer prob="65%" left bg="green.100" color="green.800" />
      <Marker label="OTM" value={31450} bg="green.100" color="green.800" />
      <ProbSpacer prob="75%" right bg="green.100" color="green.800" />
      <Marker label="B/E" value={32769} bg="yellow.100" color="yellow.800" />
      <ProbSpacer prob="45%" right bg="yellow.100" color="yellow.800" />
      <Marker label="Null" value={33250} bg="red.100" color="red.800" />
      <ProbSpacer prob="25%" right bg="red.100" color="red.800" />
      <Marker label="Wasted Gain" value={33750} bg="red.300" color="red.800" />
    </Flex>
  );
}
