package study;
//백준
//https://www.acmicpc.net/problem/1339
import java.util.*;

public class 단어수학 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        String[] arr = new String[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.next();
        }

        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            int len = arr[i].length() - 1;
            for (int j = 0; j < arr[i].length(); j++) {
                int sum = 1;
                for (int k = 0; k < len; k++) {
                    sum *= 10;
                }
                len--;
                map.put(arr[i].charAt(j), map.getOrDefault(arr[i].charAt(j), 0) + sum);
            }
        }

        List<Character> list = new ArrayList<>(map.keySet());
        Collections.sort(list, (a, b) -> map.get(b) - map.get(a));

        String[] strArr = {"9", "8", "7", "6", "5", "4", "3", "2", "1", "0"};
        Map<Character, String> resMap = new HashMap<>();
        int idx = 0;
        for (Character ch : list) {
            resMap.put(ch, strArr[idx++]);
        }

        int answer = 0;
        for (int i = 0; i < arr.length; i++) {
            String str = "";
            for (int j = 0; j < arr[i].length(); j++) {
                str += resMap.get(arr[i].charAt(j));
            }
            answer += Integer.parseInt(str);
        }
        System.out.println(answer);
    }
}
