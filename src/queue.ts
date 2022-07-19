import IORedis from "ioredis"
import TaskQueue from './task_queue'
import {connector} from "./connector"
import EventEmitter from "node:events"
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

    addTask(taskName:string,data?:any){
        console.log(this.emitter,'from queue')
        this.emitter.emit(taskName,data)
        // return this.pipeline(taskName,data ?? null)
    }

    
}

export default Queue



