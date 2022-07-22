
import EventEmitter from "events";
import IORedis from "ioredis";


import Worker from "../src/worker";

const ev = new EventEmitter()


setTimeout(()=>{
    ev.emit('add')
    ev.on('sub',()=>{
        console.log('sub')
    })
},1000)

ev.on('add',()=>{
    console.log('add')
    ev.emit('sub')
})