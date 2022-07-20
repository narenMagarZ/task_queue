import EventEmitter from "node:events"
import Queue from "./queue"
import TaskQueue from "./task_queue"
import {v4 as uuidv4} from 'uuid'
class Connector extends TaskQueue {
    public wire : EventEmitter | null
    private queue : Queue | null
    public queueIdentifier : string
    constructor(){
        super()
        this.queueIdentifier = uuidv4().split('-').join('')
        this.wire = new EventEmitter()
        this.queue = null
    }
    get myQueue(){
        return this.queue
    }
    set myQueue(queue:Queue | null){
        this.queue = queue
    }


}

export const connector = new Connector()