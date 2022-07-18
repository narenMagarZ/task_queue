import IORedis from 'ioredis'
interface connectionOptions {
    connection? : IORedis 
    attempt? : number | 3 | null
}
class Worker {
    private queue : string
    private ioRedis : IORedis | null
    constructor(queue:string,connection?:IORedis | null){
        this.queue = queue
        this.ioRedis = connection ?? null
    }

    async listen(name:string,cb?:(err:Error | null,data:any)=>void){
        // here name must be hased and unique 
        // but the case is that we can assign the task with same name for different condition
        const queueContainer = this.ioRedis
        let taskInfo : any
        let interval = setInterval(async()=>{
                taskInfo = await queueContainer?.hget(this.queue,name)
                if(taskInfo) {
                    clearInterval(interval)
                    console.log(taskInfo)
                    if(typeof cb === 'function')
                    cb(null,taskInfo)
                }
            })
    }

    private executeTask(){

    }

}
export default Worker


// const worker = new Worker('queue1')

// worker.listen('task1',(err,data)=>{
//     if(err) {

//     } else {
//         console.log(data)
//     }
// })


// worker.listen('task2',(err,data)=>{

// })