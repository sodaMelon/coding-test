#문제정보: boj#14499
import sys

input = sys.stdin.readline
# 왼, 정면, 오, 위, 아래, 뒤
dice = [0, 0, 0, 0, 0, 0] 

# 각 방향으로 이동했을때 주사위의 눈금위치를 변화시켜주는 함수
def move_right():
    a, b, c, d, e, f = dice
    dice[0] = f
    dice[1] = a
    dice[2] = b
    dice[5] = c
def move_left():
    a, b, c, d, e, f = dice
    dice[0] = b
    dice[1] = c
    dice[2] = f
    dice[5] = a

def move_up():
    a, b, c, d, e, f = dice
    dice[1] = e
    dice[3] = b
    dice[4] = f
    dice[5] = d
def move_down():
    a, b, c, d, e, f = dice
    dice[1] = d
    dice[3] = f
    dice[4] = b
    dice[5] = e


# command를 받고 이동이 가능한지 확인하는 함수
def move_dice(num, x, y):
    if num==1:
        if x <m-1:
            x += 1
            move_right()
            top_dice(x, y)
        else: return -1, x, y
    elif num==2:
        if 0< x:
            x -= 1
            move_left()
            top_dice(x, y)
        else: return -1, x, y
    elif num==3:
        if 0< y:
            y -= 1
            move_up()
            top_dice(x, y)
        else: return -1, x, y
    else:
        if y < n-1:
            y += 1
            move_down()
            top_dice(x, y)
        else: return -1, x, y
    return dice[1], x, y


# graph 와 주사위를 수정하는 함수
def top_dice(x, y):
    if graph[y][x] == 0:
        graph[y][x] = dice[5]
    else:
        dice[5] = graph[y][x]
        graph[y][x] = 0

n, m, y, x, k = map(int, input().split())
graph = [list(map(int ,input().split())) for _ in range(n)]
commands = list(map(int, input().split()))

results = []
for command in commands:
    res, x, y = move_dice(command, x, y)
    if res==-1: continue
    results.append(res)

for result in results:
    print(result)