import IORedis from 'ioredis'
import EventEmitter from 'node:events'
import { connector } from './connector'
import QueueContainer from './queuecontainer'
import { GenerateUid } from './generatequeueid'
import { base } from './base'
class Worker {
    private queue : string
    private ioRedis : IORedis 
    private listener : EventEmitter | null
    private watcher : EventEmitter | null
    constructor(queue:string,connection?:IORedis | null){
        base.workerInstance = this
        this.watcher = base.watcher
        if(!base.queueInstance){
            this.watcher.once('queue_ready',isQueueReady)
            function isQueueReady(){
                this.removeListener('ready',isQueueReady)
            }
        } else {
            base.notifier.emit('worker_ready')
        }
        this.queue = connector.queueId ?? GenerateUid(queue)
        this.ioRedis = connection as IORedis
        base.workerConn = this.ioRedis
        base.workerQueue = queue
        this.listener = connector.wire as EventEmitter
    }
    listen(task:string,cb:(err:Error | null,job:{name:string,data:any})=>void){
        new Promise(()=>{     
            this.listener?.on(task,async()=>{
                    const queueContainer = new QueueContainer(this.ioRedis,this.queue)
                    const poppedTask = await queueContainer.pop() 
                    console.log(poppedTask)
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
            })
        return this
    }

}
export default Worker
