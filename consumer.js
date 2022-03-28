const amqp = require("amqplib");

connect_rabbitmq();

async function connect_rabbitmq(){
    try {
        const connection = await amqp.connect("amqp://localhost:5672");//Connect rabbitmq server
        const channel = await connection.createChannel();//Create connection
        await channel.assertExchange("channel");//join for this channel name
    
        channel.consume("channel",(message)=>{
            console.log(message.content.toString());
            channel.ack(message);//ack is sent when received successfully
            //channel.nack(message);
        });

    } catch (error) {
        console.log('error', error);
    }
}