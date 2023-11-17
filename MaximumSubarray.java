// 플래폼 : 백준
// https://www.acmicpc.net/problem/10211
public class MaximumSubarray {
    public void solution() {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        for (int j = 0; j < n; j++) {
            int k = sc.nextInt();
            int[] arr = new int[k];
            for (int i = 0; i < k; i++) {
                arr[i] = Integer.parseInt(sc.next());
            }
            System.out.println(getMax(arr));
        }
    }

    private int getMax(int[] arr) {
        int max = arr[0];
        for (int i = 0; i < arr.length; i++) {
            int sum = 0;
            for (int j = i; j < arr.length; j++) {
                sum += arr[j];
                if (max < sum) {
                    max = sum;
                }
            }
        }
        return max;
    }
}
