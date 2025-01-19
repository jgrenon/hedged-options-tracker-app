import { Flex, Heading, Spacer, Link as UILink, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/main';
import { map } from 'lodash';

export function Cycles() {
  const cycles = useStore((state) => state.activeCycles);

  return cycles ? (
    <Flex h="100vh" flexDir="column" p={0}>
      <Flex p={2} flexShrink={1}>
        <Heading p={3} size="3xl">
          Cycles ({Object.values(cycles).length})
        </Heading>
        <Spacer />
        <UILink as={Link} to="/">
          &lt; Home
        </UILink>
      </Flex>
      <VStack flex={1} p={2}>
        {map(cycles, (cycle) => (
          <Flex key={cycle.id} w="full" p={3}>
            <UILink as={Link} to={cycle.id}>
              {cycle.id}
            </UILink>
          </Flex>
        ))}
      </VStack>
    </Flex>
  ) : null;
}
