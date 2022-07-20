import EventEmitter from 'node:events'
abstract class TaskQueue extends EventEmitter{
    constructor(){
        super()
    }
    protected pipeline(task:string,data:any){
        this.emit(task,data)
        return this
    }
}

export default TaskQueue