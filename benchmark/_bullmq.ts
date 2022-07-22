

import http from 'node:http'
import IORedis from 'ioredis'
import {Queue,Worker} from 'bullmq'
const redis = IORedis.createClient()

new Worker('queue',async(job)=>{
    const {name,data} = job
    if(name === 'login'){
        console.log('you are logged in!')
    } else if(name === 'signup'){
        while(true){
            console.log(name,data,'you are going to signedup in')
        }
    }
},{connection:redis})
const server = http.createServer((req,res)=>{
    if(req.url === '/login'){
        console.log('you are now login ...')
        queue.add('login','ok')
        res.end('your data are processing behine ')

    } else if(req.url === '/signup'){
        queue.add('signup',{'name':'naren magar','password':12345})
        res.end('you are signedup')
    } else {
        res.end('ok you are done now')
    }
}).listen(2000)


const queue = new Queue('queue',{
connection:redis
})
