import { Box, Link as UILink, VStack } from "@chakra-ui/react";
import { useStore } from "./store/main";
import { Link } from "react-router-dom";

function StrategySummary({ id, name }) {
  return (
    <UILink as={Link} to={`/strategies/${id}`}>
      {name}
    </UILink>
  );
}

function App() {
  const strategies = useStore((state) => state.strategies);

  return (
    <Box color="blue.500" p={2}>
      <VStack>
        {Object.keys(strategies).map((id) => (
          <StrategySummary id={id} name={strategies[id].name} />
        ))}
      </VStack>
    </Box>
  );
}

export default App;
