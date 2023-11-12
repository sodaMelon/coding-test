#문제정보: boj#10986

import sys
input = sys.stdin.readline

N, M = map(int, input().split())
array = list(map(int, input().split()))
pair_sums = [0]*(N+1) # 부분합 리스트 준비 (단, 값들은 M으로 나눈 나머지로 저장할것)

# count[idx]는 1부터 x까지의 부분합&(%M값이)이 담긴
# pair_sums의 원소들 중에, 그 값이 idx인 것의 개수를 의미함
count = [0]*(M+1)

# pair_sums과 count 구하기
for i in range(N):
    pair_sums[i+1] = (pair_sums[i] + array[i]) % M
    count[pair_sums[i+1]] += 1

# caseA: 1부터 x까지의 부분합을 M으로 나눈 나머지가 0이라면, 그 부분합 자체로 하나를 카운팅해줘야됨
answer = count[0]

# caseB: 그 외의 부분합들을 처리: 
# 만약 어떤 두 부분합(1부터 x까지의)을 M으로 나눈 나머지가 같고. 각각 1부터 a, b 까지의 부분합이라고 가정하면,
# a+1부터 b까지의 부분합은 M으로 나누어떨어지게됨. 
for i in range(M+1):
    # 뽑는 개수가 2인 combination의 변형식임
    answer += (count[i] * (count[i]-1)) // 2
    
print(answer)