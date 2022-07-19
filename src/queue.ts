import IORedis from "ioredis"
import TaskQueue from './task_queue'
import {connector} from "./connector"
import EventEmitter from "node:events"
import QueueContainer from './queuecontainer'
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Queue  extends TaskQueue  {
   private ioRedis : IORedis
   private queue : string
   private emitter : EventEmitter
    constructor(
        queue:string,
        connectionOption?:connectionOptions){
            super()
            connector.myQueue = this
            this.emitter = connector.wire as EventEmitter
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

    async addTask(task:string,data?:any){
        const queuecontainer = new QueueContainer(this.ioRedis,this.queue)
        await queuecontainer.push(task,data??null)
        this.emitter.emit(task)
        return this

    }

    
}

export default Queue



