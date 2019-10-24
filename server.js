const net = require('net');
const fs = require('fs');

const server = net.createServer();

//blocked when listening
server.listen(3000, () => {
  console.log('File Server is listening on port 3000!');
});

//blocked until heard some client coming in (connected), then the
//callback will be invoked
server.on('connection', (client) => {
  console.log('New client connected!');
  //client.write('Hello there!');
  client.setEncoding('utf8'); // interpret data as text

  //dislplay request and reply with data
  client.on('data', (filename) => {
    console.log('File Requst from client:', filename);

    //prepare for file reading
    fs.open(`./${filename}` , 'r' , (err, fd) => {
      if(err) {
        console.error(err);
        return;
      } 

      let buf = new Buffer(1024);
      fs.read(fd, buf, 0, 8, null, (err, bytesRead, buffer) => {
        if(err){
          console.log(err);
          return;
        }
        //fs.close(fd);
        //console.log('bytesRead: ' + bytesRead);
        //console.log(buffer.slice(0, bytesRead - 1));
        
        console.log('Send File to client: ', filename);
        client.write(buffer.slice(0, bytesRead));
      }); //fs.read

    }) //fs.open

   }); //client.on
});
