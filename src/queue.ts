import IORedis from "ioredis"
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Queue {
    ioRedis : IORedis
    queue : string
    constructor(
        queue:string,
        connectionOption?:connectionOptions){
            this.queue = queue
            const isValidQueueName = /^[A-z]+$/.test(this.queue)
            this.ioRedis = connectionOption?.connection as IORedis
            if(isValidQueueName){
                if(this.ioRedis instanceof IORedis){
                } else {
                    throw new Error('connection is not available')
                }
            } else {
                throw new Error('please give valid name to the queue')
            }
    }

    addTask(taskName:string,data?:any){
        // here taskName can be same 
        // hence we have to hash this taskName
        console.log(this)
        let taskData : any
        const queueContainer = this.ioRedis
        switch(typeof data){
            case "object":
                taskData = JSON.stringify(data)
                break;
            case "function":
                taskData = null
                break
            default :
                taskData = data
                break
        }
        queueContainer.hset(this.queue,taskName,taskData)
        return this
    }

    
}

export default Queue
const connection : IORedis = IORedis.createClient()

const queue = new Queue('')