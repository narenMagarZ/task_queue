
import EventEmitter from "events";

const event = new EventEmitter()



const emitter = event
const listener = event
setTimeout(() => {
    
    emitter.emit('hi')
}, 2000);


listener.on('hi',()=>{
    console.log('i got your high')
})