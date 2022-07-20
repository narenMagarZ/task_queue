
// import EventEmitter from "events";

// const event = new EventEmitter()



// const emitter = event
// const listener = event
// setTimeout(() => {
    
//     emitter.emit('hi')
// }, 2000);


// listener.on('hi',()=>{
//     console.log('i got your high')
// })

// listener.on('hi',()=>{
//     console.log('this is me second high')
// })

import IORedis from "ioredis";

const redis = IORedis.createClient()

setTimeout(async ()=>{
    let j
    while(await redis.rpop('queue')){
        console.log('done done')
    }
    console.log('finally done yr')
},2000)