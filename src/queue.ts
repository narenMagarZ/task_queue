import IORedis from "ioredis"
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Queue {
   private ioRedis : IORedis
   private queue : string
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
        const queueContainer = this.ioRedis
        let taskData : any
        if(typeof data === 'object'){
            taskData = JSON.stringify(data)
        } 
        else taskData = data
        queueContainer.hset(this.queue,taskName,taskData ?? null)
        return this
    }

    
}

export default Queue
