export const getOrderedNumbersArray = (moves: number) =>
  [...Array(moves)].map((_, i) => i + 1).reverse();
