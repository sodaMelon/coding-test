//회의실에 들어간 순서 리스트, 나간 리스트가 주어졌을 때, 각 사람별로 반드시 만난 사람은 몇명인제 배열에 담아 반환하는 문제

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  dequeue() {
    let value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }
  size() {
    return this.rear - this.front;
  }
  top() {
    return this.queue[this.front];
  }
}

const meet_count = (enter, exit) => {
  let room = [enter[0]];
  let meet_count = new Array(enter.length + 1).fill(0);
  //exit 큐 만들기.
  let q_exit = new Queue();
  for (let ex of exit) {
    q_exit.enqueue(ex);
  }
  let target = q_exit.dequeue();

  for (i = 1; i < exit.length; i++) {
     //회의실에 들어감
      for (let person of room) {
        meet_count[person] += 1;
      }
      meet_count[enter[i]] += room.length;
      room.push(enter[i]);
    if (enter[i] === target) {
      //제일 최근에 들어간 사람이 나올 수 있으면 나옴
      room.pop();
      target = q_exit.dequeue(); //1

      while (room.length > 0) {
        //다음 target(나올사람)이 이미 회의실에 들어가있으면 나옴
        if (room.includes(target)) {
          room = room.filter((item) => item !== target);
          target = q_exit.dequeue();
        } else {
          break;
        }
      }
    }
  }
  console.log(meet_count.slice(1));
  return meet_count.slice(1);
};

meet_count([1, 2, 3, 4], [2, 4, 1, 3]); //[3,1,2,2]
meet_count([1, 2, 5, 3, 4], [2, 3, 1, 4, 5]); //[ 3, 1, 2, 1, 3 ]
meet_count([1, 3, 2, 4, 5, 7, 6, 8], [2, 3, 5, 6, 1, 4, 8, 7]); //[6,2,2,4,2,3,4,1]
meet_count([1, 4, 7, 2, 3, 5, 6], [5, 2, 6, 1, 7, 3, 4]); //[6,5,6,6,5,4,6]
meet_count([1, 4, 2, 3], [2, 1, 4, 3]); //[2,2,0,2]
