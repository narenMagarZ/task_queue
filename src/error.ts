
class TaskQueueError extends Error {
    public message : string 
    constructor(message:string){
        super()
        this.message = message
    }

}

export default TaskQueueError