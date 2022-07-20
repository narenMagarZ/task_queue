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
        this.queue = connector.queueIdentifier + queue
        this.ioRedis = connection as IORedis
        this.listener = connector.wire as EventEmitter
    }
    listen(task:string,cb:(err:Error | null,job:{name:string,data:any})=>void){
        this.listener.on(task,async()=>{
            const queueContainer = new QueueContainer(this.ioRedis,this.queue)
            const poppedTask = await queueContainer.pop() ?? null
            console.log(poppedTask,'this is popped data')
            let taskInfo = {
                'name' : '',
                'data' : null
            }
            if(poppedTask){
                const {name,data} = JSON.parse(poppedTask[1])
                taskInfo = {
                    name,
                    data
                }
            }
            cb(null,taskInfo)
            
        })
        return this
    }
    
    private executeTask(cb:(err:Error|null,data:any)=>void){

    }

}
export default Worker


const worker = new Worker('') 
worker.listen('task1',(err,{name,data})=>{

})