import { useStore } from '../store/main';
import { Box, Flex, Heading, Spacer, Link as UILink } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { usdCurrency, usdCurrency0, percentFormat } from './utils/formats';
import { Metric } from './ui/metric';

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
      <Flex flexDir="column" py={1}>
        <Flex py={1} justify="center">
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
        <Flex py={1} justify="center">
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
        <Flex px={5} py={1} justify="center">
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
        <Flex py={1} justify="center">
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
