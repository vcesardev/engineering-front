import {
  BaseChart,
  UpdatedCandlestickChartInfo,
  UpdatedChart,
} from "../models/Chart";

import { Props as ChartProps } from "react-apexcharts";
import { maskDate, maskDollartoReais } from "./masks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayStandardGraphParser = (data: BaseChart[]): any => {
  const updatedData: UpdatedChart = {
    _id: data.map((info) => info._id),
    price_close: data.map((info) => maskDollartoReais(info.price_close)),
    price_high: data.map((info) => maskDollartoReais(info.price_high)),
    price_low: data.map((info) => maskDollartoReais(info.price_low)),
    price_open: data.map((info) => maskDollartoReais(info.price_open)),
    time_close: data.map((info) => maskDate(info.time_close)),
    time_open: data.map((info) => maskDate(info.time_open)),
    time_period_end: data.map((info) => maskDate(info.time_period_end)),
    time_period_start: data.map((info) => maskDate(info.time_period_start)),
  };

  return updatedData;
};

export const arrayCandlestickGraphParser = (
  data: BaseChart[]
): UpdatedCandlestickChartInfo[] => {
  const updatedData: UpdatedCandlestickChartInfo[] = data.map((info) => {
    const updatedInfo: UpdatedCandlestickChartInfo = {
      x: maskDate(info.time_period_start),
      y: [
        maskDollartoReais(info.price_open),
        maskDollartoReais(info.price_high),
        maskDollartoReais(info.price_low),
        maskDollartoReais(info.price_close),
      ],
    };

    return updatedInfo;
  });

  return updatedData;
};

export const dataStandardGraphParser = (data: UpdatedChart): ChartProps => {
  const graphInfo: ChartProps = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Relação do Preço do Bitcoin(R$) no mês de Agosto/2023",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: data.time_period_start,
      },
    },
    series: [
      {
        name: "Preço(R$)",
        data: data.price_close,
      },
    ],
  };

  return graphInfo;
};

export const dataCandlestickGraphParser = (
  data: UpdatedCandlestickChartInfo[]
): ChartProps => {
  const candlestickGraphInfo: ChartProps = {
    series: [
      {
        name: "Candle",
        data: data,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
      },
      title: {
        text: "Relação do Preço do Bitcoin(R$) no mês de Agosto/2023",
      },
      tooltip: { enabled: true },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  };

  return candlestickGraphInfo;
};
