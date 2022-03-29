const amqp = require("amqplib");

get();


async function get(){

    const exchange = "logs";

    try {
        const connect = await amqp.connect("amqp://localhost:5672");
        const channel = await connect.createChannel();

        await channel.assertExchange(exchange,"fanout",{durable: false});
        const q = await channel.assertQueue("",{exclusive: true});
        
        await channel.bindQueue(q.queue,exchange,"");
        await channel.consume(q.queue,(message)=>{
            console.log(message.content.toString());
        },{noAck:true});

    } catch (error) {
        console.log('error', error)
    }
}