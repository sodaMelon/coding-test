#문제정보: boj#2075

import heapq

N = int(input())


heap = []

for i in range(N):
    numbers = list(map(int, input().split()))
    if i == 0:
        for number in numbers:
            heapq.heappush(heap, number)
    else:
        for number in numbers:
            if number > heap[0]:
                heapq.heappop(heap)
                heapq.heappush(heap, number)



print(heapq.heappop(heap))