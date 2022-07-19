import EventEmitter from 'node:events'
abstract class TaskQueue extends EventEmitter{
    queueName : string 
    constructor(){
        super()
        this.queueName = ''
    }
    protected pipeline(task:string,data:any){
        this.emit(task,data)
        return this
    }
}

export default TaskQueue