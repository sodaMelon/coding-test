#문제정보: boj#4179

from collections import deque
import sys

#maze's row, column
R, C = map(int, sys.stdin.readline().rstrip().split() )

maze = []

for i in range(R) :
  maze.append( list(sys.stdin.readline().rstrip() ) )

#상 하 좌 우
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

jihoon_time = [[-1]*C for _ in range(R)]
fire_time = [[-1]*C for _ in range(R)]

fire_q = deque()
jihoon_q = deque()

flag = 0

#find_start_point
for i in range(R):
  for j in range(C):
    if maze[i][j] == 'F' :
      fire_q.append((i,j))
      fire_time[i][j]=0 
    if maze[i][j] == 'J' :
      jihoon_q.append((i,j))
      jihoon_time[i][j]=0

#불에대한 bfs
while fire_q :
  x, y = fire_q.popleft()
    
  for i in range(4):
    nx = x + dx[i]
    ny = y + dy[i]    
    
    if nx < 0 or nx>=R or ny <0 or ny>=C :
      continue
    if fire_time[nx][ny] >= 0 or maze[nx][ny] == "#" :
      continue
      
    fire_time[nx][ny] = fire_time[x][y] + 1
    fire_q.append((nx,ny))

flag = False
    
#지훈이 bfs
while jihoon_q :
  x, y = jihoon_q.popleft()
    
  for i in range(4):
    nx = x + dx[i]
    ny = y + dy[i]    
    
    if nx < 0 or nx>=R or ny <0 or ny>=C : #범위 벗어남->탈출
      print( jihoon_time[x][y]+1 )
      flag = True
      exit(0)
      

    if jihoon_time[nx][ny] >=0 or maze[nx][ny] == '#':  
      continue
    if fire_time[nx][ny] != -1 and fire_time[nx][ny] <= jihoon_time[x][y]+1 :
      continue #불 번지는 조건

    jihoon_time[nx][ny] = jihoon_time[x][y]+1
    jihoon_q.append((nx,ny))

if flag== False :
  print("IMPOSSIBLE")     