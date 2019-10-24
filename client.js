const net = require('net');
const fs = require('fs');

//connect to file server
const connect = function() {
  const conn = net.createConnection({
    host: '127.0.0.1',
    port: 3000
  });

  conn.on('connect', () => {
    console.log("Successfully connected to File Server.");
    console.log("Request for file: index.html");
    
    //this is hard coded right now, can change to accept user inputs 
    conn.write("index.html");  
  });

  // interpret incoming data as text
  conn.setEncoding('utf8');
  conn.on("data", (data) => {
    console.log("Save file ...");
    fs.writeFile("./download/index.html", data, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Download File successfully!");
      }
    });

  });

  return conn;
}

connect();
