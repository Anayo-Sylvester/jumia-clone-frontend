const {createReadStream} = require('fs')
const http = require('http')


http
    .createServer((req,res)=>{
        // const text = createReadStream('./content/big.txt','utf8');
        // text.pipe(res);
        const fileStream = createReadStream('./content/big.txt','utf8');
        
        fileStream.on('open',()=>{
            fileStream.pipe(res)
        })

        fileStream.on('error',()=>{

        })
    })
    .listen(5000);