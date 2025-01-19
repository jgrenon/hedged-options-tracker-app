import { Center, Flex, Heading, HStack, Spacer, Text, Link as UILink, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/main';
import { Metric } from './ui/metric';
import { usdCurrency, usdCurrency0, percentFormat, dateFormat } from './utils/formats';

function CoveredCall({ op }) {
  return (
    <Flex flexDir="column" flex={1} bg={op.status === 'ITM' ? 'red.400' : 'green.300'} borderRadius="md" p={2}>
      <Flex flex={1}>
        <Heading fontSize="2xl" flex={1}>
          Covered Call
        </Heading>
        <Center flexShrink={1} fontSize="3xl" fontWeight="bold">
          {usdCurrency.format(op.current)}
        </Center>
      </Flex>
      <Flex flex={1} fontSize="sm">
        <Text w="full">Strike: {usdCurrency.format(op.strike)}</Text>
        <Text w="full">Contract(s): {op.qty}</Text>
        <Text w="full">Opened: {dateFormat(op.opened)}</Text>
        {op.closed && <Text w="full">Closed: {dateFormat(op.closed)}</Text>}
        <Text w="full">Expires: {dateFormat(op.expire)}</Text>
        <Text w="full">Premium: {usdCurrency.format(op.premium)}</Text>
        <Text w="full">Fees: {usdCurrency.format(op.fees)}</Text>
      </Flex>
      {op.note && (
        <Flex flex={1} fontSize="xs" bg="whiteAlpha.300" p={1} my={2}>
          {op.note}
        </Flex>
      )}
    </Flex>
  );
}

function BuyPut({ op }) {
  return (
    <Flex flexDir="column" flex={1} bg={op.status === 'ITM' ? 'red.400' : 'green.300'} borderRadius="md" p={2}>
      <Flex flex={1}>
        <Heading fontSize="2xl" flex={1}>
          BUY PUT
        </Heading>
        <Center flexShrink={1} fontSize="3xl" fontWeight="bold">
          {usdCurrency.format(op.current)}
        </Center>
      </Flex>
      <Flex flex={1} fontSize="sm">
        <Text w="full">Strike: {usdCurrency.format(op.strike)}</Text>
        <Text w="full">Contract(s): {op.qty}</Text>
        <Text w="full">Opened: {dateFormat(op.opened)}</Text>
        {op.closed && <Text w="full">Closed: {dateFormat(op.closed)}</Text>}
        <Text w="full">Expires: {dateFormat(op.expire)}</Text>
        <Text w="full">Premium: {usdCurrency.format(op.premium)}</Text>
        <Text w="full">Fees: {usdCurrency.format(op.fees)}</Text>
      </Flex>
    </Flex>
  );
}

function LimitBuy({ op }) {
  return (
    <Flex flexDir="column" flex={1} bg={'gray.400'} borderRadius="md" p={2}>
      <Flex flex={1}>
        <Heading fontSize="2xl" flex={1}>
          {op.symbol} LIMIT BUY
        </Heading>
        <Center flexShrink={1} fontSize="3xl" fontWeight="bold">
          {usdCurrency.format(op.current)}
        </Center>
      </Flex>
      <Flex flex={1} fontSize="sm">
        <Text w="full">Unit Cost: {usdCurrency.format(op.price)}</Text>
        <Text w="full">Units: {op.qty}</Text>
        <Text w="full">Total: {usdCurrency.format(op.price * op.qty)}</Text>
        <Text w="full">Fees: {usdCurrency.format(op.fees)}</Text>
        <Text w="full">Opened: {dateFormat(op.opened)}</Text>
        {op.closed && <Text w="full">Closed: {dateFormat(op.closed)}</Text>}
      </Flex>
    </Flex>
  );
}

function LimitSell({ op }) {
  return (
    <Flex flexDir="column" flex={1} bg={'gray.400'} borderRadius="md" p={2}>
      <Flex flex={1}>
        <Heading fontSize="2xl" flex={1}>
          {op.symbol} LIMIT SELL
        </Heading>
        <Center flexShrink={1} fontSize="3xl" fontWeight="bold">
          {usdCurrency.format(op.current)}
        </Center>
      </Flex>
      <Flex flex={1} fontSize="sm">
        <Text w="full">Unit Cost: {usdCurrency.format(op.price)}</Text>
        <Text w="full">Units: {op.qty}</Text>
        <Text w="full">Total: {usdCurrency.format(op.price * op.qty)}</Text>
        <Text w="full">Fees: {usdCurrency.format(op.fees)}</Text>
        <Text w="full">Opened: {dateFormat(op.opened)}</Text>
        {op.closed && <Text w="full">Closed: {dateFormat(op.closed)}</Text>}
      </Flex>
    </Flex>
  );
}
function MarketBuy({ op }) {
  return (
    <Flex flexDir="column" flex={1} bg={'gray.400'} borderRadius="md" p={2}>
      <Flex flex={1}>
        <Heading fontSize="2xl" flex={1}>
          {op.symbol} MARKET BUY
        </Heading>
        <Center flexShrink={1} fontSize="3xl" fontWeight="bold">
          {usdCurrency.format(op.current)}
        </Center>
      </Flex>
      <Flex flex={1} fontSize="sm">
        <Text w="full">Unit Cost: {usdCurrency.format(op.price)}</Text>
        <Text w="full">Units: {op.qty}</Text>
        <Text w="full">Total: {usdCurrency.format(op.price * op.qty)}</Text>
        <Text w="full">Fees: {usdCurrency.format(op.fees)}</Text>
        <Text w="full">Opened: {dateFormat(op.opened)}</Text>
        {op.closed && <Text w="full">Closed: {dateFormat(op.closed)}</Text>}
      </Flex>
    </Flex>
  );
}
function MarketSell({ op }) {
  return (
    <Flex flexDir="column" flex={1} bg={'gray.400'} borderRadius="md" p={2}>
      <Flex flex={1}>
        <Heading fontSize="2xl" flex={1}>
          {op.symbol} MARKET SELL
        </Heading>
        <Center flexShrink={1} fontSize="3xl" fontWeight="bold">
          {usdCurrency.format(op.current)}
        </Center>
      </Flex>
      <Flex flex={1} fontSize="sm">
        <Text w="full">Unit Cost: {usdCurrency.format(op.price)}</Text>
        <Text w="full">Units: {op.qty}</Text>
        <Text w="full">Total: {usdCurrency.format(op.price * op.qty)}</Text>
        <Text w="full">Fees: {usdCurrency.format(op.fees)}</Text>
        <Text w="full">Opened: {dateFormat(op.opened)}</Text>
        {op.closed && <Text w="full">Closed: {dateFormat(op.closed)}</Text>}
      </Flex>
    </Flex>
  );
}

function CycleOperation({ op }) {
  return (
    <Flex w="full" bg="gray.100">
      {op.type === 'SELL_CALL' && <CoveredCall op={op} />}
      {op.type === 'BUY_PUT' && <BuyPut op={op} />}
      {op.type === 'LIMIT_BUY' && <LimitBuy op={op} />}
      {op.type === 'LIMIT_SELL' && <LimitSell op={op} />}
      {op.type === 'MARKET_BUY' && <MarketBuy op={op} />}
      {op.type === 'MARKET_SELL' && <MarketSell op={op} />}
    </Flex>
  );
}

export function CycleTracker() {
  const params = useParams();
  const cycle = useStore((state) => params.id && state.activeCycles && state.activeCycles[params.id]);

  return cycle ? (
    <Flex flexDir="column" p={0}>
      <Flex bg="blue.300" color="blue.900">
        <VStack gap={0} p={3}>
          <Heading w="full" size="3xl">
            Cycle {cycle.id}
          </Heading>
          <HStack w="full">
            <Text fontSize="sm">From: {dateFormat(cycle.from)}</Text>
            <Text fontSize="sm">To: {dateFormat(cycle.to)}</Text>
          </HStack>
        </VStack>
        <Spacer />
        <UILink p={3} as={Link} to="/">
          &lt; Home
        </UILink>
      </Flex>
      <Flex py={5} justify="center">
        <Metric label={cycle.start.symbol} value={cycle.start.units} neutral />
        <Metric label="CASH" value={usdCurrency.format(cycle.start.cash)} positive={cycle.current?.cash >= cycle.start.cash} />
        <Metric label="CAPITAL" value={usdCurrency0.format(cycle.start.cash + cycle.start.units * cycle.current?.unitPrice)} positive={cycle.current?.unitPrice > cycle.start.cost} />
        <Metric
          label="INCOME"
          value={usdCurrency0.format(cycle.current.premium * 100)}
          delta={usdCurrency0.format((cycle.current?.premium - cycle.start.targetPremium) * 100)}
          deltaRatio={percentFormat.format(cycle.current?.premium / cycle.start.targetPremium)}
          positive={cycle.current?.premium > cycle.start.targetPremium}
        />
        <Metric label={`${cycle.start.symbol} PRICE`} value={usdCurrency.format(cycle.current.unitPrice)} positive={cycle.current?.cash >= cycle.start.cash} />
        <Metric label="EXPENSES" value={usdCurrency.format(cycle.current.expenses)} positive={cycle.current.expenses <= cycle.current.premium * 100} />
      </Flex>
      <VStack flex={1} p={5}>
        <Heading size="xl" w="full">
          Operations
        </Heading>
        {cycle.operations.map((op, idx) => (
          <CycleOperation key={idx} op={op} />
        ))}
      </VStack>
    </Flex>
  ) : null;
}
