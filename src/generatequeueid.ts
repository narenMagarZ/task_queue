import {createHmac} from 'node:crypto'

export function GenerateUid(key:string){
    const hmac = createHmac('md5',key)
    return hmac.update('queueid').digest('hex')
}
