// 문제정보: 프로그래머스. 단어변환
// https://school.programmers.co.kr/learn/courses/30/lessons/43163

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  popleft() {
    const num = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return num;
  }
  push(value) {
    this.queue[this.rear++] = value;
  }
  size() {
    return this.rear - this.front;
  }
}

function solution(begin, target, words) {
  let visited = Array(words.length).fill(0);
  let q = new Queue();
  q.push([begin, 0]);

  while (q.size() > 0) {
    let current = q.popleft();
    let current_word = current[0];
    let current_time = current[1];
    if (current_word === target) {
      return current_time;
    }
    for (i = 0; i < words.length; i++) {
      //한글자만 다르다, 아직 방문안했다 => 큐에 넣음
      if (visited[i] !== 0) continue;
      let same = 0;
      let word = words[i];
      //몇글자가 같은지 세기
      for (j = 0; j < word.length; j++) {
        if (word[j] === current_word[j]) {
          same++;
        }
        //한글자만 다르면 시간이랑 같이 큐에 넣기
        if (same === word.length - 1) {
          q.push([word, current_time + 1]);
          visited[i] = 1;
          break;
        }
      }
    }
  }
  return 0;
}