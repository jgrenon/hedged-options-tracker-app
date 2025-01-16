import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRoot,
  TableRow,
} from "@chakra-ui/react";

export function StrategyValueScenarios({ scenarios }) {
  return (
    <TableRoot>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>PRICE</TableColumnHeader>
          <TableColumnHeader>Bust (-25%)</TableColumnHeader>
          <TableColumnHeader>Buy Back</TableColumnHeader>
          <TableColumnHeader>Worthless</TableColumnHeader>
          <TableColumnHeader>ITM (-5%)</TableColumnHeader>
          <TableColumnHeader>ATM</TableColumnHeader>
          <TableColumnHeader>OTM (+5%)</TableColumnHeader>
          <TableColumnHeader>Break Even</TableColumnHeader>
          <TableColumnHeader>Boost (+25%)</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>44</TableCell>
          <TableCell textAlign="center">44</TableCell>
          <TableCell textAlign="center">44</TableCell>
          <TableCell textAlign="center">44</TableCell>
          <TableCell textAlign="center">44</TableCell>
          <TableCell textAlign="center">$3860</TableCell>
          <TableCell textAlign="center">44</TableCell>
          <TableCell textAlign="center">44</TableCell>
          <TableCell textAlign="center">44</TableCell>
        </TableRow>
      </TableBody>
    </TableRoot>
  );
}
