const amqp = require("amqplib");

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");//Connect rabbitmq server
        const channel = await connection.createChannel();//Create connection
    
        await channel.assertQueue("channel");//join for this channel name
        await channel.assertQueue("channel2");//join for this channel name
    
        channel.sendToQueue("channel",Buffer.from(JSON.stringify({
            description: "This message sending for channel.section1"
        })));//Send message to using buffer

        channel.sendToQueue("channel2",Buffer.from(JSON.stringify({
            description: "This message sending for channel2"
        })));//Send message to using buffer
    } catch (error) {
        console.log('error', error);
    }
}