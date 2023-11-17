package study.week1;
//백준 아기상어
//https://www.acmicpc.net/problem/16236
import java.util.*;

public class 아기상어 {
    static int[][] arr;
    static int[] dx = {-1, 0, 1, 0};
    static int[] dy = {0, 1, 0, -1};
    static int startX, startY, n, weight, eat;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();

        arr = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                arr[i][j] = sc.nextInt();
                if (arr[i][j] == 9) {
                    startX = i;
                    startY = j;
                    arr[i][j] = 0;
                }
            }
        }
        weight = 2;
        eat = 0;
        int answer = 0;
        while (true) {
            int[] next = bfs();
            if (next == null) break;
            answer += next[2];
            startX = next[0];
            startY = next[1];
            arr[next[0]][next[1]] = 0;
            eat++;
            if (eat == weight) {
                weight++;
                eat = 0;
            }
        }
        System.out.println(answer);
    }

    private static int[] bfs() {
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[2] == b[2] ? (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]) : a[2] - b[2]);
        pq.offer(new int[]{startX, startY, 0});
        int[][] ch = new int[n][n];
        ch[startX][startY] = 1;

        while (!pq.isEmpty()) {
            int[] p = pq.poll();
            int x = p[0], y = p[1], dist = p[2];
            if (arr[x][y] != 0 && arr[x][y] < weight) return new int[]{x, y, dist};
            for (int i = 0; i < 4; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];
                if (nx >= 0 && ny >= 0 && nx < n && ny < n && ch[nx][ny] == 0 && arr[nx][ny] <= weight) {
                    ch[nx][ny] = 1;
                    pq.offer(new int[]{nx, ny, dist + 1});
                }
            }
        }
        return null;
    }
}
