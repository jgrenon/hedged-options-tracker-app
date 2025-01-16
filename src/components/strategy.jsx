import { useStore } from '../store/main';
import { Box, Center, Flex, Heading, Spacer, Link as UILink, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { Chart } from './ui/chart';
import { StrategyValueRuler } from './strategy-value-ruler';
import { DateTime, Interval } from 'luxon';
import { StrategyValueScenarios } from './strategy-value-scenarios';

const options = {
  chart: {
    stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21', 'D22', 'D23', 'D24', 'D25', 'D26', 'D27', 'D28', 'D29'],
  },
  yaxis: {
    title: {
      text: 'USD',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return `${val} USD`;
      },
    },
  },
};

const series = [
  {
    name: 'Premium',
    data: [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500],
  },
  {
    name: 'Capped Gain',
    data: [340, 375, 1300, 250, 325, 450, 650, 750, 350, 750, 340, 375, 300, 250, 325, 450, 650, 650, 350, 1750, 340, 375, 300, 250, 325, 450, 650, 650, 350, 750],
  },
  {
    name: 'Income',
    data: [1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578, 1578],
  },
  {
    name: 'Uncaped Dividend Gain',
    data: [450, 350, 250, 650, 450, 475, 785, 350, 786, 850, 450, 350, 250, 650, 450, 475, 785, 350, 786, 850, 450, 350, 250, 650, 450, 475, 785, 350, 786, 850],
  },
];

const usdCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const usdCurrency0 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const percentFormat = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
});

function Metric({ label, value, delta, deltaRatio, positive, neutral, lastUpdate, footerNote, secondaryValue, category }) {
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

export function Strategy() {
  const params = useParams();
  const strategy = useStore((state) => state.strategies[params?.id]);
  const lastUpdate = useStore((state) => state.lastUpdate);

  return strategy ? (
    <Flex flexDir="column" p={0}>
      <Flex p={2}>
        <Heading p={3} size="3xl">
          {strategy.name}
        </Heading>
        <Spacer />
        <UILink as={Link} to="/" color="blue.50">
          &lt; Home
        </UILink>
      </Flex>
      <Flex flexDir="column" py={3}>
        <Flex p={5} justify="center">
          <Metric
            category="market"
            label={`${strategy.growth.symbol} UNIT PRICE`}
            value={usdCurrency.format(strategy.growth.price)}
            delta={usdCurrency.format(strategy.growth.price - strategy.growth.cost)}
            deltaRatio={percentFormat.format((strategy.growth.price - strategy.growth.cost) / strategy.growth.cost)}
            positive={strategy.growth.price - strategy.growth.cost > 0}
            lastUpdate={lastUpdate}
          />
          <Metric
            category="market"
            label={`${strategy.dividend.symbol} UNIT PRICE`}
            value={usdCurrency.format(strategy.dividend.price)}
            delta={usdCurrency.format(strategy.dividend.price - strategy.metrics.CURRENT_DIVIDEND_BALANCE?.avgCost)}
            deltaRatio={percentFormat.format((strategy.dividend.price - strategy.metrics.CURRENT_DIVIDEND_BALANCE?.avgCost) / strategy.metrics.CURRENT_DIVIDEND_BALANCE?.avgCost)}
            positive={strategy.dividend.price - strategy.metrics.CURRENT_DIVIDEND_BALANCE?.avgCost > 0}
            lastUpdate={lastUpdate}
          />
          <Metric
            category="market"
            label="OPTION PRICE"
            value={usdCurrency.format(strategy.option.price)}
            secondaryValue={`${strategy.option.premium_bonus ? '(+' + usdCurrency.format(strategy.option.premium_bonus / (strategy.option.qty * 100)) + ')' : ''}`}
            delta={usdCurrency.format((strategy.option.price - strategy.option.premium) * (strategy.option.qty * 100))}
            deltaRatio={percentFormat.format((strategy.option.price - strategy.option.premium) / strategy.option.premium)}
            positive={strategy.option.price - strategy.option.premium < 0}
            lastUpdate={lastUpdate}
          />
        </Flex>
        <Flex p={5} justify="center">
          <Metric
            category="balance"
            label={`${strategy.growth.units} ${strategy.growth.symbol} @ ${usdCurrency.format(strategy.growth.cost)}`}
            value={usdCurrency0.format(strategy.growth.units * strategy.growth.price)}
            delta={usdCurrency.format(strategy.growth.units * (strategy.growth.price - strategy.growth.cost))}
            deltaRatio={percentFormat.format((strategy.growth.units * (strategy.growth.price - strategy.growth.cost)) / (strategy.growth.units * strategy.growth.cost))}
            positive={strategy.growth.price > strategy.growth.cost}
            lastUpdate={lastUpdate}
          />
          <Metric
            category="balance"
            label={`${strategy.metrics.CURRENT_DIVIDEND_BALANCE?.totalQty} ${strategy.dividend.symbol} @ ${usdCurrency.format(strategy.metrics.CURRENT_DIVIDEND_BALANCE?.avgCost)}`}
            value={usdCurrency0.format(strategy.metrics.CURRENT_DIVIDEND_BALANCE?.value)}
            delta={usdCurrency.format(strategy.metrics.CURRENT_DIVIDEND_BALANCE?.gain)}
            deltaRatio={percentFormat.format(strategy.metrics.CURRENT_DIVIDEND_BALANCE?.gainPercent)}
            positive={strategy.metrics.CURRENT_DIVIDEND_BALANCE?.gain >= 0}
            lastUpdate={lastUpdate}
          />
          <Metric
            category="balance"
            label="RISK CAPITAL"
            value={usdCurrency0.format(strategy.metrics.RISK_CAPITAL?.value)}
            delta={usdCurrency0.format(strategy.metrics.RISK_CAPITAL?.delta)}
            deltaRatio={usdCurrency0.format(strategy.metrics.RISK_CAPITAL?.cost)}
            positive={strategy.metrics.RISK_CAPITAL?.value - strategy.metrics.RISK_CAPITAL?.cost > 0}
            lastUpdate={lastUpdate}
          />
        </Flex>
        <Flex px={5} py={3} justify="center">
          <Metric
            category="income"
            label="CASH VALUE"
            value={usdCurrency.format(strategy.metrics.CURRENT_GAIN_CASH?.total)}
            delta={usdCurrency.format(strategy.metrics.CURRENT_GAIN_CASH?.delta)}
            deltaRatio={percentFormat.format(strategy.metrics.CURRENT_GAIN_CASH?.perf)}
            positive={strategy.metrics.CURRENT_GAIN_CASH?.delta > 0}
            lastUpdate={lastUpdate}
          />
          <Metric
            category="income"
            label={`DISTRIBUTION @ ${usdCurrency.format(strategy.dividend.distribution)}`}
            value={usdCurrency.format(strategy.dividend.units * strategy.dividend.distribution)}
            delta={usdCurrency.format(strategy.cycle.extra_div_qty * strategy.dividend.distribution)}
            deltaRatio={percentFormat.format((strategy.cycle.extra_div_qty * strategy.dividend.distribution) / (strategy.dividend.units * strategy.dividend.distribution))}
            positive={(strategy.cycle.extra_div_qty * strategy.dividend.distribution) / (strategy.dividend.units * strategy.dividend.distribution) > 0}
            footerNote={`In ${DateTime.fromISO(strategy.dividend.date).diffNow('days').toHuman({ unitDisplay: 'short' })}`}
          />
          <Metric label="EXPIRATION" category="cycle" delta={`${strategy.option.dte} days`} deltaRatio={strategy.option.inTheMoney ? 'ITM' : 'OTM'} positive={!strategy.option.inTheMoney} value={strategy.option.expiration} />
        </Flex>
        <Flex p={5} justify="center">
          <Metric
            category="outcome"
            label="BUY BACK"
            value={usdCurrency.format(strategy.metrics.BUYBACK?.value)}
            delta={`${strategy.metrics.BUYBACK?.divUnitsSold}  ${strategy.dividend.symbol}`}
            deltaRatio={`${strategy.metrics.BUYBACK?.deltaDivUnits} / ${strategy.cycle.extra_div_qty}`}
            lastUpdate={lastUpdate}
          />
          <Metric
            category="outcome"
            label="RELOAD COST"
            value={usdCurrency.format(strategy.metrics.RELOAD_COST?.value)}
            delta={usdCurrency.format(strategy.metrics.RELOAD_COST?.netIncome)}
            deltaRatio={`${strategy.metrics.RELOAD_COST?.divUnitsSold} / ${strategy.cycle.extra_div_qty}`}
            positive={strategy.metrics.RELOAD_COST?.divUnitsSold < strategy.cycle.extra_div_qty}
            lastUpdate={lastUpdate}
          />
          <Metric
            category="outcome"
            label={`ROLLOVER @ ${strategy.cycle.rollover.strike} x ${strategy.cycle.rollover.qty}`}
            value={usdCurrency.format(strategy.metrics.ROLLOVER?.gain)}
            delta={usdCurrency.format(strategy.metrics.ROLLOVER?.growthGain)}
            deltaRatio={`${strategy.metrics.ROLLOVER?.deltaDivUnits} ${strategy.dividend.symbol}`}
            neutral={DateTime.fromISO(strategy.dividend.date).toMillis() > DateTime.now().toMillis()}
            positive={strategy.metrics.ROLLOVER?.gain > 0}
            footerNote={strategy.cycle.rollover.expiration}
          />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Box>Strategy not found</Box>
  );
}
