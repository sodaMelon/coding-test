// https://www.acmicpc.net/problem/1377

const boj1377 = () => {
  type IndexValue = [number, number];

  const solution = (numbers: Array<number>) => {
    return (
      1 +
      numbers
        .map(toIndexValueTuple)
        .sort(byAsc)
        .map(toDiffIndex)
        .reduce(getMax, 0)
    );
  };

  const toIndexValueTuple = (v: number, i: number) => [i, v] as IndexValue;
  const byAsc = (a: IndexValue, b: IndexValue) => a[1] - b[1];
  const toDiffIndex = (tuple: IndexValue, index: number) => tuple[0] - index;
  const getMax = (max: number, index_diff: number) => Math.max(max, index_diff);

  return { solution };
};

main: {
  const [, ...numbers]: Array<number> = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((number: string) => Number(number));
  process.stdout.write(String(boj1377().solution(numbers)));
  process.exit(0);
}
