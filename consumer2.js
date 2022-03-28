const amqp = require("amqplib");

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");//Connect rabbitmq server
        const channel = await connection.createChannel();//Create connection
        await channel.assertQueue("channel");//join for this channel name
    
        channel.consume("channel2",(message)=>{
            console.log(message.content.toString());
            channel.ackAll();
        });
    } catch (error) {
        console.log('error', error);
    }
}