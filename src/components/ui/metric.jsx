import { Box, Center, Flex, Spacer } from '@chakra-ui/react';
import { DateTime } from 'luxon';

export function Metric({ label, value, delta, deltaRatio, positive, neutral, lastUpdate, footerNote, secondaryValue, category }) {
  function computeBgColor() {
    if (neutral) {
      return 'gray.800';
    } else {
      return positive ? 'green.700' : 'red.700';
    }
  }

  function computeDeltaColor() {
    if (neutral) {
      return 'white';
    } else {
      return positive ? 'green.400' : 'red.300';
    }
  }

  function computeValueColor() {
    if (neutral) {
      return 'white';
    } else {
      return positive ? 'green.400' : 'red.300';
    }
  }

  return (
    <Flex flexDir="column" flexShrink={1} p={2} mx={1} bg={computeBgColor()} borderRadius="md" minW="3xs">
      {category && (
        <Box as="span" maxW="min" bg="blackAlpha.200" borderRadius="sm" fontSize="xs" color={computeValueColor()} px={2}>
          {category}
        </Box>
      )}
      <Center pt={5} as="span" color={computeValueColor()} fontSize="3xl" fontWeight="bold" flexGrow={1}>
        {value}
        {secondaryValue && (
          <Box as="span" fontSize="md" ml={1} mt={0.5} fontWeight="light">
            {secondaryValue}
          </Box>
        )}
      </Center>
      {delta && (
        <Center pb={5} as="span" color={computeDeltaColor()} fontSize="sm" fontWeight="light">
          {delta}{' '}
          {deltaRatio && (
            <Box ml={3} as="span">
              ({deltaRatio})
            </Box>
          )}
        </Center>
      )}
      <Spacer />
      <Center borderTopRadius="md" bg="blackAlpha.300" p={1} color="gray.100">
        {label}
      </Center>
      {lastUpdate && (
        <Center color="gray.300" borderBottomRadius="md" fontSize="xs" bg="blackAlpha.300" p={1}>
          {DateTime.fromJSDate(lastUpdate).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}
        </Center>
      )}
      {footerNote && (
        <Center color="gray.300" borderBottomRadius="md" fontSize="xs" bg="blackAlpha.300" p={1}>
          {footerNote}
        </Center>
      )}
    </Flex>
  );
}
