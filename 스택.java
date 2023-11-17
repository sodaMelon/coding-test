package study.week1;
//백준
//https://www.acmicpc.net/problem/10828
import java.io.*;
import java.util.Stack;

public class 스택 {

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int n = Integer.parseInt(br.readLine().trim());
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            String str = br.readLine();
            String[] s = str.split(" ");
            if (str.startsWith("push")) {
                st.push(Integer.parseInt(s[1]));
                continue;
            }
            else if (str.equals("top")) {
                if(st.isEmpty()) bw.write("-1\n");
                else bw.write(st.peek() + "\n");
                continue;
            }
            else if (str.equals("pop")) {
                if(st.isEmpty()) bw.write("-1\n");
                else bw.write(st.pop() + "\n");
                continue;
            }
            else if (str.equals("size")) {
                bw.write(st.size() + "\n");
            }
            else if (str.equals("empty")) {
                if(st.isEmpty()) bw.write("1\n");
                else bw.write("0\n");
            }
        }
        bw.flush();
        bw.close();
        br.close();
    }
}
