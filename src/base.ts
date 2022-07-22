import IORedis from "ioredis"
import EventEmitter from "node:events"
import Queue from "./queue"
import Worker from "./worker"
class Base{
    public queueConn : IORedis | null
    public workerConn : IORedis | null
    public queue : string 
    public workerQueue : string
    public watcher : EventEmitter
    public queueInstance : Queue | null
    public workerInstance : Worker | null
    public notifier : EventEmitter 
    constructor(){
        this.queueConn = null
        this.workerConn = null
        this.queue = ''
        this.workerQueue = ''
        this.watcher = new EventEmitter()
        this.notifier = new EventEmitter()
        this.watcher.setMaxListeners(100)
    }
    set workerConnection(conn:IORedis|null){
        this.workerConn = conn 
    }
    set queueConnection(conn:IORedis|null){
        this.queueConn = conn
    }
    get workerConnection(){
        return this.workerConn
    }
    get queueConnection(){
        return this.queueConn
    }


}


export const base = new Base()