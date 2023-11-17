//키패드와 비밀번호가 주어지면 비밀번호 다 입력하는데 걸리는 시간을 구하는 문제.
//입력시간은 고려하지 않고 이동시간만 계산하며, 현재 번호를 둘러쌓은 8개의 키패드로 이동하는데 1초.

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  dequeue() {
    let value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }
  enqueue(value) {
    this.queue[this.rear++] = value;
  }
  size() {
    return this.rear - this.front;
  }
  clear() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
}

const password_time = (keypad, pw) => {
  const password = removeDuplicates(pw);
  const keypad_3x3 = keypad_make_3x3(keypad);
  q = new Queue();
  //password 시작위치의 xy좌표 큐에넣기
  let [x, y] = find_index(parseInt(password[0]), keypad_3x3);
  q.enqueue([x, y, 0]);

  for (i = 1; i < password.length; i++) {
    let target_num = parseInt(password[i]);
    let flag = 0;
    while (q.size() > 0) {
      const current = q.dequeue();
      const x = current[0];
      const y = current[1];
      const t = current[2];
      let visited = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      //8방향 확인하면서 큐에 넣기.
      const dx = [0, -1, 0, 1, -1, -1, 1, 1];
      const dy = [1, 0, -1, 0, 1, -1, 1, -1];
      for (j = 0; j < 8; j++) {
        let nx = x + dx[j];
        let ny = y + dy[j];
        if (nx < 0 || nx > 2 || ny < 0 || ny > 2) {
          continue;
        }
        if (visited[ny][nx] < 0) {
          continue;
        }
        if (keypad_3x3[ny][nx] === target_num) {
          flag += 1;
          q.clear();
          q.enqueue([nx, ny, t + 1]);

          break;
        }
        q.enqueue([nx, ny, t + 1]);
      }
      //while문 끝내고 다음 비번으로.
      if (flag === 1) {
        break;
      }
    }
  }
  let answer = q.dequeue();
  console.log(answer[2]);
  return answer[2];
};

const keypad_make_3x3 = (keypad) => {
  let keypad_3x3 = [];
  for (i = 0; i < keypad.length; i += 3) {
    keypad_3x3.push([keypad[i], keypad[i + 1], keypad[i + 2]]);
  }
  return keypad_3x3;
};

const find_index = (num, keypad) => {
  for (x = 0; x < keypad.length; x++) {
    for (y = 0; y < keypad.length; y++) {
      if (keypad[y][x] === num) {
        return [x, y];
      }
    }
  }
};

function removeDuplicates(pw) {
  let noDuPassword = pw[0];
  for (i = 1; i < pw.length; i++) {
    if (pw[i - 1] !== pw[i]) {
      noDuPassword += pw[i];
    }
  }
  return noDuPassword;
}

password_time([2, 5, 3, 7, 1, 6, 4, 9, 8], "7596218"); //8초
password_time([1, 5, 7, 3, 2, 8, 9, 4, 6], "63855526592"); //12초
password_time([2,9,3,7,8,6,4,5,1],"323254677") //13초
password_time([1, 6, 7, 3, 8, 9, 4, 5, 2], "3337772122");//8초
