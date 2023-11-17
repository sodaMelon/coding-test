
class Queue{
    constructor(){
        this.queue=[]
        this.front=0
        this.rear=0
    }
    size(){
        return this.rear-this.front
    }
    enqueue(value){
        this.queue[this.rear++]=value
    }
    dequeue() {
        const num = this.queue[this.front];
        delete this.queue[this.front];
        this.front++;
        return num
    }
}

function solution(maps) {
    let [n,m] = [maps.length, maps[0].length]
    let q = new Queue()
    q.enqueue([0,0])
    const dx = [1, 0, -1 , 0]
    const dy = [0, -1, 0, 1]
    
    while (q.size() >0){
        let [current_x, current_y] = q.dequeue()
        for (i=0; i<4; i++){
            let [new_x, new_y] = [current_x+dx[i], current_y+dy[i]]
            if (new_x>=0 && new_x<n && new_y>=0 && new_y<m){
                if (maps[new_x][new_y] === 1){
                    maps[new_x][new_y] = maps[current_x][current_y]+1
                    q.enqueue([new_x, new_y]);
                }
            }
        }
    }
    return maps[n - 1][m - 1] !== 1 ? maps[n - 1][m - 1] : -1;
}