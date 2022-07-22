import { redis } from "./redis.spec";


import color from 'colors'
import Queue from "../src/queue";
import { expect } from "chai";

const describeText = color.blue.bold


describe(describeText('Create the queue'),()=>{
    it(describeText('Add task to the queue'),async()=>{
        const queue = new Queue('queue',{
            connection : redis
        })

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
        for (let i of tasks){
            const {name,data} = i
            const result = await queue.addTask(name,data)
            expect(result).instanceOf(Queue)
        }

    })
})