// https://www.acmicpc.net/problem/11004
const boj11004 = () => {
  type index = number;
  const COMPARATOR = (a: number, b: number) => a - b; // byAsc

  const solution = (numbers: number[], pickup_index: index) => {
    quickSort(numbers);
    return numbers[pickup_index];
  };

  const quickSort = (
    numbers: number[],
    start: index = 0,
    end: index = numbers.length - 1
  ) => {
    if (start >= end) {
      return;
    }

    const [left_end, right_start] = divideByPivot(numbers, start, end);
    quickSort(numbers, start, left_end);
    quickSort(numbers, right_start, end);
  };

  const divideByPivot = (
    numbers: number[],
    left: index,
    right: index
  ): [index, index] => {
    const random_index = getRandomIndex(left, right);
    const mid_index = Math.floor((left + right) / 2);
    [numbers[random_index], numbers[mid_index]] = [
      numbers[mid_index],
      numbers[random_index],
    ];

    const pivot_number = numbers[mid_index];

    while (left <= right) {
      while (COMPARATOR(numbers[left], pivot_number) < 0) {
        left++;
      }

      while (COMPARATOR(numbers[right], pivot_number) > 0) {
        right--;
      }

      if (left <= right) {
        [numbers[left], numbers[right]] = [numbers[right], numbers[left]];
        left++;
        right--;
      }
    }

    return [right, left];
  };

  const getRandomIndex = (min: index, max: index) =>
    Math.floor(Math.random() * (max - min) + min);

  return { solution };
};

main: {
  const [line1, line2]: Array<string> = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");
  const pickup_index = Number(line1.split(" ")[1]) - 1;
  const numbers = line2.split(" ").map((number: string) => Number(number));

  process.stdout.write(String(boj11004().solution(numbers, pickup_index)));
  process.exit(0);
}
