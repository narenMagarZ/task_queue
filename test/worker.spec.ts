import { redis } from "./redis.spec";
import Worker from "../src/worker";
import color from 'colors'

const describeText= color.blue.bold


describe(describeText('Create the worker'),()=>{
    it(describeText('listen for job'),()=>{
        const worker = new Worker('queue',redis)
        worker.listen('task1',(err,{name,data})=>{
            console.log(err,name,data,'from task1')
        })
        worker.listen('task2',(err,{name,data})=>{
            console.log(err,name,data,'from task2')
        })
            worker.listen('task3',(err,{name,data})=>{
            console.log(err,name,data,'from task3')
        })
        worker.listen('task4',(err,{name,data})=>{
            console.log(err,name,data,'from task4')
        })
        worker.listen('task5',(err,{name,data})=>{
            console.log(err,name,data,'from task5')
        })
        worker.listen('task6',(err,{name,data})=>{
            console.log(err,name,data,'from task6')
        })
        worker.listen('task7',(err,{name,data})=>{
            console.log(err,name,data,'from task7')
        })
        worker.listen('task8',(err,{name,data})=>{
            console.log(err,name,data,'from task8')
        })
        worker.listen('task9',(err,{name,data})=>{
            console.log(err,name,data,'from task9')
        })
        worker.listen('task10',(err,{name,data})=>{
            console.log(err,name,data,'from task10')
        })
        worker.listen('task11',(err,{name,data})=>{
            console.log(err,name,data,'from task11')
        })
        worker.listen('task12',(err,{name,data})=>{
            console.log(err,name,data,'from task12')
        })
        worker.listen('task13',(err,{name,data})=>{
            console.log(err,name,data,'from task13')
        })
        worker.listen('task14',(err,{name,data})=>{
            console.log(err,name,data,'from task14')
        })
        worker.listen('task15',(err,{name,data})=>{
            console.log(err,name,data,'from task15')
        })
        worker.listen('task16',(err,{name,data})=>{
            console.log(err,name,data,'from task16')
        })
        worker.listen('task17',(err,{name,data})=>{
            console.log(err,name,data,'from task17')
        })
        worker.listen('task18',(err,{name,data})=>{
            console.log(err,name,data,'from task18')
        })
        worker.listen('task19',(err,{name,data})=>{
            console.log(err,name,data,'from task19')
        })
        worker.listen('task20',(err,{name,data})=>{
            console.log(err,name,data,'from task20')
        })
    })
})