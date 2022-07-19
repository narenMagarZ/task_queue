import Queue from "./queue"
class Helper{
    private base : Queue | null
    constructor(){
        this.base = null
    }
    set queueBase(base:Queue){
        this.base = base
    }
    get queueBase(){
        return this.base ?? new Queue('')
    }
}

export const helper = new Helper()