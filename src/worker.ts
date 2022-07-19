import IORedis from 'ioredis'
import EventEmitter from 'node:events'
import { connector } from './connector'
import TaskQueue from './task_queue'
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Worker extends TaskQueue {
    private queue : string
    private ioRedis : IORedis | null
    private listener : EventEmitter
    constructor(queue:string,connection?:IORedis | null){
        super()
        this.queue = queue
        this.ioRedis = connection ?? null
        this.listener = connector.wire as EventEmitter
    }
    async listen(name:string,cb:(err:Error | null,data:any)=>void){
        console.log(this.listener,'from worker')
        this.listener.on(name,(data)=>{
            cb(null,data)
        })
    }
    
    private executeTask(){

    }

}
export default Worker


const worker = new Worker('') 