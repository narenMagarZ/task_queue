import { redis } from "./redis.spec";
import Worker from "../src/worker";
import color from 'colors'

const describeText= color.blue.bold

describe(describeText('Create the worker'),()=>{
    it(describeText('listen for job'),()=>{
        const worker = new Worker('queue',redis)
        const tasks = [
            {
                'name' : 'task1',
                'data' : {
                    'user' : 'naren magar',
                    'age' : 20,
                    'email' : 'narenmagarz98@gmail.com'
                }
            },
            {
                'name' : 'task2',
                'data' : {
                    'user' : 'umesh magar',
                    'age' : 18,
                    'email' : 'umeshmagar98@gmail.com'
                }
            },
            {
                'name' : 'task3',
                'data' : {
                }
            },
            {
                'name' : 'task4',
                'data' : null
            },
            {
                'name' : 'task5',
                'data' : 'do task5'
            },
            {
                'name' : 'task6',
                'data' : 12345
            }
        ]
        for(let i of tasks){
            const {name,data} = i
            const _data = data
            const _name = name
            worker.listen(name,(err,{data})=>{
            })
        }
    })
})