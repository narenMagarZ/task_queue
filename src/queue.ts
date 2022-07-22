import IORedis from "ioredis"
import {connector} from "./connector"
import EventEmitter from "node:events"
import QueueContainer from './queuecontainer'
import { GenerateUid } from "./generatequeueid"
import { base } from "./base"
import TaskQueueError from './error'
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Queue   {
   private ioRedis : IORedis
   private queue : string
   private emitter : EventEmitter
   private watcher : EventEmitter
    constructor(
        queue:string,
        connectionOption?:connectionOptions){
            if(connector.myQueue){
                throw new TaskQueueError('queue already exist, cannot make more than 1 queue')
            }
            connector.myQueue = this
            this.emitter = connector.wire as EventEmitter
            this.queue = GenerateUid(queue)
            connector.queueId = this.queue
            const isValidQueueName = /^[A-z0-9]+$/.test(this.queue)
            this.ioRedis = connectionOption?.connection as IORedis
            base.queue = this.queue
            base.queueConn = this.ioRedis
            this.watcher = base.watcher
            base.queueInstance = this
            if(base.workerInstance){
                this.watcher.emit('queue_ready')
            }
            if(this.queue && this.ioRedis){
                setTimeout(async()=>{
                    while(await this.ioRedis.rpop(this.queue));;
                })
            }
            if(isValidQueueName){
                if(this.ioRedis instanceof IORedis){
                } else {
                    throw new Error('connection is not available')
                }
            } else {
                throw new Error('please give valid name to the queue')
            }
    }

    async addTask(task:string,data?:any){
        const queuecontainer = new QueueContainer(this.ioRedis,this.queue)
        await queuecontainer.push(task,data??null) 
        if(base.workerInstance){
            this.emitter.emit(task)
        } else {
            const emitTask =()=>{
                this.addTask(task,data)
                base.notifier.removeListener('worker_ready',emitTask)
            }
            base.notifier.once('worker_ready',emitTask)
        }
        return this

    }

    
}

export default Queue



