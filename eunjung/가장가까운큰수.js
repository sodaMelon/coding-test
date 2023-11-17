//주어진 수 n과 구성은 같되, n보다 큰 수 중 가장 작은 수를 반환. 없으면 -1 반환.

const maxNum = (n) => {
  let numList = Array.from(String(n), Number);
  //뒤에서부터 2개씩 비교 뒷자리수가 더 큰 것을 찾음.
  for (i = numList.length - 1; i > 0; i--) {
    if (numList[i - 1] < numList[i]) {
      //numList[i-1] 뒷 숫자 중 걔보다 큰 수중 젤 작은거 찾기.
      let changeNum = numList
        .slice(i, numList.length)
        .filter((x) => x > numList[i - 1])
        .sort((a, b) => a - b)[0];
      //순서가 변하지 않는 부분
      let fix = numList.slice(0, i - 1);
      //뒷부분 오름차순정렬
      let ascendingNum = numList
        .slice(i - 1, numList.length)
        .sort((a, b) => a - b);
      const indexToRemove = ascendingNum.indexOf(changeNum);
      ascendingNum.splice(indexToRemove, 1);

      fix[i - 1] = changeNum;
      //리스트 합치기
      let answer_list = fix.concat(ascendingNum);
      let list_to_number = Number(answer_list.join(""));
      console.log(list_to_number);
      return list_to_number;
    }
  }
  console.log(-1);
  return -1;
};

maxNum(123); //321
maxNum(321); //-1
maxNum(20573); //20735
maxNum(27711); //71127
maxNum(54312); //54321
maxNum(20054); //20405
