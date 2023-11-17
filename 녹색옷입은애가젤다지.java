package study.week1;
//백준
//https://www.acmicpc.net/problem/4485
import java.util.*;

public class 녹색옷입은애가젤다지 {
    static int[] dx = {0, 1, 0, -1};
    static int[] dy = {1, 0, -1, 0};

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int idx = 1;
        while (true) {
            int n = sc.nextInt();
            if (n == 0) break;
            int[][] arr = new int[n][n];
            for (int i = 0; i < arr.length; i++) {
                for (int j = 0; j < arr.length; j++) {
                    arr[i][j] = sc.nextInt();
                }
            }
            int[][] dp = new int[n][n];
            for (int i = 0; i < n; i++) Arrays.fill(dp[i], Integer.MAX_VALUE);
            PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[2] - b[2]);
            pq.offer(new int[]{0, 0, arr[0][0]});
            dp[0][0] = arr[0][0];
            while (!pq.isEmpty()) {
                int[] p = pq.poll();
                if (dp[p[0]][p[1]] < p[2]) continue;
                for (int i = 0; i < 4; i++) {
                    int nx = p[0] + dx[i];
                    int ny = p[1] + dy[i];
                    if (nx < 0 || ny < 0 || nx >= n || ny >= n) continue;
                    int sum = dp[p[0]][p[1]] + arr[nx][ny];
                    if (sum < dp[nx][ny]) {
                        dp[nx][ny] = sum;
                        pq.offer(new int[]{nx, ny, sum});
                    }

                }
            }
            System.out.println("Problem " + idx++ + ": " + dp[n - 1][n - 1]);

        }
    }
}
