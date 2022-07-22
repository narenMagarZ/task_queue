import EventEmitter from "node:events"
import Queue from "./queue"
class Connector {
    public wire : EventEmitter | null
    private queue : Queue | null
    public queueId : string | null
    constructor(){
        this.wire = new EventEmitter()
        this.wire.setMaxListeners(100)
        this.queueId = null
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