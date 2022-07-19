import IORedis from 'ioredis'
import EventEmitter from 'node:events'
import { connector } from './connector'
import TaskQueue from './task_queue'
import QueueContainer from './queuecontainer'
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Worker extends TaskQueue {
    private queue : string
    private ioRedis : IORedis
    private listener : EventEmitter
    constructor(queue:string,connection?:IORedis | null){
        super()
        this.queue = queue
        this.ioRedis = connection as IORedis
        this.listener = connector.wire as EventEmitter
    }
    listen(task:string,cb:(err:Error | null,data:any)=>void){
        this.listener.on(task,async()=>{
            const queueContainer = new QueueContainer(this.ioRedis,this.queue)
            const poppedTask = await queueContainer.pop()
            console.log(poppedTask,'this is popped data')
            if(poppedTask){
                cb(null,poppedTask)
            }
        })
    }
    
    private executeTask(cb:(err:Error|null,data:any)=>void){

    }

}
export default Worker


const worker = new Worker('') 