import {redis} from '../redis'
import { expect } from 'chai'
import color from 'colors'
import Worker from '../src/worker'
const describeText = color.blue.bold

describe(describeText('Check the worker implementation'),()=>{
    it('Create worker and do task ',async()=>{
        const worker = new Worker('queue',redis)
       worker.listen('task1',(err,data)=>{
            console.log(err,data)
        })

    })
})