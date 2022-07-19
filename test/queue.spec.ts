import { redis } from "./redis.spec";


import color from 'colors'
import Queue from "../src/queue";

const describeText = color.blue.bold


describe(describeText('Create the queue'),()=>{
    it(describeText('Add task to the queue'),()=>{
        const queue = new Queue('queue',{
            connection:redis
        })
        queue.addTask('task1',232)
    })
})