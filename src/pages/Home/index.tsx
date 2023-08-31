import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Flex, Spinner, Box } from "@chakra-ui/react";
import Chart, { Props as ChartProps } from "react-apexcharts";
import { UpdatedChart } from "../../models/Chart";
import {
  arrayCandlestickGraphParser,
  arrayStandardGraphParser,
  dataCandlestickGraphParser,
  dataStandardGraphParser,
} from "../../utils/graphParser";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [standardGraphInfo, setStandardGraphInfo] = useState<ChartProps>(
    {} as ChartProps
  );

  const [candlestickGraphInfo, setCandlestickGraphInfo] = useState<ChartProps>(
    {} as ChartProps
  );

  const loadChartData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-3-131-153-153.us-east-2.compute.amazonaws.com:3000/bitcoin/"
      );

      //parse standard graph info
      const updatedGraphData: UpdatedChart = arrayStandardGraphParser(data);
      const graphInfo = dataStandardGraphParser(updatedGraphData);

      //parse candlestick graph info
      const updatedCandlestickData = arrayCandlestickGraphParser(data);
      const candlestickGraphInfo = dataCandlestickGraphParser(
        updatedCandlestickData
      );

      setCandlestickGraphInfo(candlestickGraphInfo);
      setStandardGraphInfo(graphInfo);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChartData();
  }, [loadChartData]);

  return (
    <Flex direction={"column"}>
      {loading ? (
        <Flex
          direction={"column"}
          width={"100vw"}
          height={"100vh"}
          align={"center"}
          justify={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Flex direction={"column"} width={"100%"} pt={"5"}>
          <Box>
            <Chart
              options={standardGraphInfo.options}
              series={standardGraphInfo.series}
              type="line"
              width={"100%"}
              height={600}
            />
          </Box>

          <Box mt={"5"}>
            <Chart
              options={candlestickGraphInfo.options}
              series={candlestickGraphInfo.series}
              type="candlestick"
              height={600}
              width={"100%"}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
