import { redis } from "./redis.spec";
import Worker from "../src/worker";
import color from 'colors'

const describeText= color.blue.bold


describe(describeText('Create the worker'),()=>{
    it(describeText('listen for job'),()=>{
        const worker = new Worker('queue',redis)
        worker.listen('task1',(err,data)=>{
            console.log(err,data,'these are the task data and error')
        })
    })
})