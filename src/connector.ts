import EventEmitter from "node:events"
import Queue from "./queue"
class Connector extends EventEmitter {
    public wire : EventEmitter | null
    private queue : Queue | null
    constructor(){
        super()
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