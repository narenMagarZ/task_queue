import Queue from "../src/queue";
import IORedis from "ioredis";

const redis = IORedis.createClient()
new Queue('queue',{
    connection:redis
})

new Queue('queue1',{
    connection:redis
})