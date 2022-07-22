import http from 'node:http'
import IORedis from 'ioredis'
import Queue from '../src/queue'
import Worker from '../src/worker'
import fs from 'node:fs'
import { resolve } from 'node:path'
const redis = IORedis.createClient()
const queue = new Queue('queue',{
    connection:redis
})
const worker = new Worker('queue',redis)
worker.listen('login',async(_err,{name,data})=>{
    function delay(time:number){
        return new Promise((resolve)=>{
            setTimeout(resolve,time)
        })
    }
    await delay(5000)
    console.log('finally you are logged in')
})
worker.listen('signup',(_err,{name,data})=>{
    console.log('you are signed up now')
})
worker.listen('adduser',(_err,{data})=>{
    const filePath = resolve(__dirname,'./user.json')
    fs.readFile(filePath,(_err,buff)=>{
        let user = JSON.parse(buff.toString())
        console.log(user)
        const {name,email} = JSON.parse(data)
        user.push({
            'name': name,
            'email': email
        })
        fs.writeFile(filePath,JSON.stringify(user),(_err)=>{})
    })
})
http.createServer((req,res)=>{
    if(req.url === '/login'){
        queue.addTask('login','ok')
        res.end('your data are processing behine ')

    } else if(req.url === '/signup'){
        queue.addTask('signup',{'name':'naren magar','password':12345})
        res.end('you are signedup')
    }  else if(req.url === '/adduser'){
        req.on('data',(data)=>{
            if(data){
                const user = JSON.parse(data.toString())
                queue.addTask('adduser',user)
            }
        })
        req.on('end',()=>{
            res.end(JSON.stringify({'msg':'user is added to the system'}))
        })

    }
    else {
        res.end('ok you are done now')
    }
}).listen(2000)
