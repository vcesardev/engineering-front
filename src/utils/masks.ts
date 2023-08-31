export const maskDate = (value: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, time] = value.split("T");
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export const maskDollartoReais = (value: number): number => {
  // Dólar hoje dia 31/08/2023 está R$4,95
  const price = Number(value * 4.95).toFixed(2);
  return Number(price);
};
