//백준
//https://www.acmicpc.net/problem/14502

package study;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class 연구소 {
    static int n, m, answer;
    static int[] dx = {-1, 0, 1, 0};
    static int[] dy = {0, 1, 0, -1};
    public static void D(int L, int[][] arr, int[][] ch) {
        if (L == 3) {
            int[][] copyArr = new int[n][m];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    copyArr[i][j] = arr[i][j];
                }
            }

            Queue<int[]> q = new LinkedList<>();
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if (copyArr[i][j] == 2) {
                        q.offer(new int[]{i, j});
                    }
                }
            }
            while (!q.isEmpty()) {
                int len = q.size();
                for (int i = 0; i < len; i++) {
                    int[] p = q.poll();
                    for (int j = 0; j < 4; j++) {
                        int nx = p[0] + dx[j];
                        int ny = p[1] + dy[j];
                        if (nx < 0 || ny < 0 || nx >= n || ny >= m || copyArr[nx][ny] != 0) continue;
                        copyArr[nx][ny] = 2;
                        q.offer(new int[]{nx, ny});
                    }
                }
            }
            int cnt = 0;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if (copyArr[i][j] == 0) cnt++;
                }
            }
            answer = Math.max(answer, cnt);
            return;
        } else {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if (arr[i][j] == 0 && ch[i][j] == 0) {
                        ch[i][j] = 1;
                        arr[i][j] = 1;
                        D(L + 1, arr, ch);
                        ch[i][j] = 0;
                        arr[i][j] = 0;
                    }
                }
            }
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        n = sc.nextInt();
        m = sc.nextInt();
        int[][] arr = new int[n][m];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                arr[i][j] = sc.nextInt();
            }
        }
        answer = 0;
        int[][] ch = new int[n][m];

        D(0, arr, ch);

        System.out.println(answer);

    }
}
