import { Box } from "@chakra-ui/react";
import { useMeasure } from "react-use";
import ApexChart from "react-apexcharts";
import PropTypes from "prop-types";

export function Chart({ series, options, type, maxHeight = 350 }) {
  const [containerRef, { width, height }] = useMeasure();

  return (
    <Box ref={containerRef} flex={1} p={0}>
      <ApexChart
        options={options}
        series={series}
        type={type}
        width={width}
        height={height > maxHeight ? maxHeight : height}
      />
    </Box>
  );
}

Chart.propTypes = {
  series: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.object,
  type: PropTypes.string,
  maxHeight: PropTypes.number,
};
