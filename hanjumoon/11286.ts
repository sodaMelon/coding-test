const solution = (numbers: Array<number>) => {
  const abs_desc: Heap<number> = new Heap<number>(by_desc);

  return numbers.reduce((result: Array<number>, number: number) => {
    if (number === 0) {
      result.push(abs_desc.pop() ?? 0);
    } else {
      abs_desc.push(number);
    }

    return result;
  }, []);
};

const by_desc = (a: number, b: number) => Math.abs(b) - Math.abs(a) || b - a;

class Heap<T> {
  protected heap: Array<T> = [null as T];
  protected comparator: (a: T, b: T) => boolean;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = (a: T, b: T) => comparator(a, b) > 0;
  }

  push(value: T) {
    this.heap.push(value);

    let index = this.heap.length - 1;
    let parent_index = Math.floor(index / 2);

    while (
      parent_index > 0 &&
      this.comparator(this.heap[index], this.heap[parent_index])
    ) {
      [this.heap[parent_index], this.heap[index]] = [
        this.heap[index],
        this.heap[parent_index],
      ];

      index = parent_index;
      parent_index = Math.floor(index / 2);
    }
  }

  pop() {
    if (this.heap.length - 1 < 1) {
      return 0;
    }
    let return_value = this.heap[1];
    this.heap[1] = this.heap[this.heap.length - 1];
    this.heap.pop();

    let index = 1;
    while (index * 2 < this.heap.length) {
      let min = this.heap[index * 2];
      let child_index = index * 2;
      if (
        index * 2 + 1 < this.heap.length &&
        this.comparator(this.heap[index * 2 + 1], min)
      ) {
        min = this.heap[index * 2 + 1];
        child_index = index * 2 + 1;
      }
      if (this.comparator(this.heap[index], min)) {
        break;
      }

      [this.heap[index], this.heap[child_index]] = [
        this.heap[child_index],
        this.heap[index],
      ];
      index = child_index;
    }
    return return_value;
  }
}

const fs = require("fs");
const [N, ...numbers]: Array<number> = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((num: string) => Number(num));
process.stdout.write(solution(numbers).join("\n"));
process.exit(0);
