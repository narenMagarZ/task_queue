import IORedis from 'ioredis'
import { helper } from './helper'
import TaskQueue from './task_queue'
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Worker extends TaskQueue {
    private queue : string
    private ioRedis : IORedis | null
    constructor(queue:string,connection?:IORedis | null){
        super()
        this.queue = queue
        this.ioRedis = connection ?? null
    }

    async listen(name:string,cb:(err:Error | null,data:any)=>void){
        super.on(name,(data)=>{
            cb(null,data)
        })
    }

    private executeTask(){

    }

}
export default Worker

