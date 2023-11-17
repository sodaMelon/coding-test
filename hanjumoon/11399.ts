// https://www.acmicpc.net/problem/11399
const boj11399 = () => {
  type Comparator = (a: number, b: number) => number;

  const solution = (numbers: Array<number>) => {
    insertionSort(numbers, byAsc);
    return getCumulativeSums(numbers).reduce(getSum, 0);
  };

  const byAsc = (a: number, b: number) => a - b;
  const getSum = (sum: number, number: number) => (sum += number);

  const insertionSort = (numbers: Array<number>, comparator: Comparator) => {
    for (let i = 1; i < numbers.length; i++) {
      const insertion_index = findInsertionIndex(numbers, i, comparator);
      if (insertion_index !== -1) {
        shiftAndInsert(numbers, insertion_index, i);
      }
    }

    return numbers;
  };

  const findInsertionIndex = (
    numbers: Array<number>,
    index: number,
    comparator: Comparator
  ) => {
    for (let i = 0; i < index; i++) {
      if (comparator(numbers[i], numbers[index]) > 0) {
        return i;
      }
    }

    return -1;
  };

  const shiftAndInsert = (
    numbers: Array<number>,
    insertion_index: number,
    index: number
  ) => {
    const number = numbers[index];

    for (let j = index; j > insertion_index; j--) {
      numbers[j] = numbers[j - 1];
    }

    numbers[insertion_index] = number;
  };

  const getCumulativeSums = (numbers: Array<number>) => {
    const sums = [...numbers];

    for (let i = 1; i < sums.length; i++) {
      sums[i] = sums[i] + sums[i - 1];
    }

    return sums;
  };

  return { solution };
};

main: {
  const [, line2]: Array<string> = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");
  const numbers = line2.split(" ").map((number: string) => Number(number));

  process.stdout.write(String(boj11399().solution(numbers)));
  process.exit(0);
}
