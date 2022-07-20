import { redis } from "./redis.spec";


import color from 'colors'
import Queue from "../src/queue";

const describeText = color.blue.bold


describe(describeText('Create the queue'),()=>{
    it(describeText('Add task to the queue'),()=>{
        const queue = new Queue('queue',{
            connection:redis
        })
        setTimeout(()=>{
            queue.addTask('task1',{'name':'naren magar','email':'naren@gmail.com'})
            queue.addTask('task2',232)
            queue.addTask('task3',{'name':'umesh magar','email':'naren@gmail.com'})
            queue.addTask('task4',233)
            queue.addTask('task5',{'name':'dum magar','email':'naren@gmail.com'})
            queue.addTask('task6',234)
            queue.addTask('task7',{'name':'hum magar','email':'naren@gmail.com'})
            queue.addTask('task8',235)
            queue.addTask('task9',{'name':'jame magar','email':'naren@gmail.com'})
            queue.addTask('task10',236)
            queue.addTask('task11',{'name':'let magar','email':'naren@gmail.com'})
            queue.addTask('task12',237)
            queue.addTask('task13',{'name':'ket magar','email':'naren@gmail.com'})
            queue.addTask('task14',238)
            queue.addTask('task15',{'name':'drake magar','email':'naren@gmail.com'})
            queue.addTask('task16',239)
            queue.addTask('task17',{'name':'shrek magar','email':'naren@gmail.com'})
            queue.addTask('task18',240)
            queue.addTask('task19',{'name':'gamoki magar','email':'naren@gmail.com'})
            queue.addTask('task20',241)
        },1000)
    })
})