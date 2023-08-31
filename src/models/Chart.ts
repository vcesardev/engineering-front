export type BaseChart = {
  _id: string;
  time_period_start: string;
  time_period_end: string;
  time_open: string;
  time_close: string;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
};

export type UpdatedChart = {
  _id: string[];
  time_period_start: string[];
  time_period_end: string[];
  time_open: string[];
  time_close: string[];
  price_open: number[];
  price_high: number[];
  price_low: number[];
  price_close: number[];
};

export type UpdatedCandlestickChartInfo = {
  x: string;
  y: [
    price_open: number,
    price_high: number,
    price_low: number,
    price_close: number
  ];
};
