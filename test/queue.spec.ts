import {redis} from '../redis'
import { expect } from 'chai'
import color from 'colors'
import Queue from '../src/queue'
const describeText = color.blue.bold

describe(describeText('Check the queue implementation'),()=>{
    it('Create queue and add task to it',async()=>{
        const queue = new Queue('queue',{
            connection:redis
        })
        expect(queue.addTask('task1')).to.equal(queue)

    })
})