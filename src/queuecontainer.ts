import IORedis from "ioredis";
class QueueContainer {
    private redisConn : IORedis
    private queue : string
    constructor(ioRedis:IORedis,queue:string){
        this.redisConn = ioRedis
        this.queue = queue
    }
    async push(task:string,data?:any){
        
        let taskInfo = {
            'name' : task,
            'data' : typeof data === 'object' ? JSON.stringify(data) : data
        }
        let plainTaskInfo = JSON.stringify(taskInfo)
        await this.redisConn.rpush(this.queue,plainTaskInfo)
    }

    async pop(){
        const defaultTimeOut = 0
        return await this.redisConn.blpop(this.queue,defaultTimeOut)
    }
}

export default QueueContainer