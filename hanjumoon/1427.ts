// https://www.acmicpc.net/problem/1427

const boj1427 = () => {
  const solution = (numbers: Array<number>) => selectionSort(numbers, byDesc);

  const selectionSort = (
    numbers: Array<number>,
    comparator: (a: number, b: number) => number
  ) => {
    for (let i = 0; i < numbers.length; i++) {
      let min_index = i;

      for (let j = i + 1; j < numbers.length; j++) {
        if (comparator(numbers[min_index], numbers[j]) > 0) {
          min_index = j;
        }
      }

      if (min_index !== i) {
        [numbers[i], numbers[min_index]] = [numbers[min_index], numbers[i]];
      }
    }

    return numbers;
  };

  const byDesc = (a: number, b: number) => b - a;

  return { solution };
};

main: {
  const number: string = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim();
  const numbers = number.split("").map((number) => Number(number));

  process.stdout.write(String(boj1427().solution(numbers).join("")));
  process.exit(0);
}
