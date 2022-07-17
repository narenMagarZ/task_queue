import net from 'node:net'


const server = net.createServer((conn)=>{
    conn.write('done done ')
})
server.listen(4000)


const client = net.connect(4000)
client.on('data',(data)=>{
    console.log(data)
})
