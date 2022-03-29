const amqp = require("amqplib");

func();


async function func(){
    try {
        const connect = await amqp.connect("amqp://localhost:5672");
        const channel = await connect.createChannel();

        await channel.assertExchange("logs","topic",{durable: false});
        const q = await channel.assertQueue("",{exclusive: true});

        await channel.bindQueue(q.queue, "logs", "*.info");
        await channel.bindQueue(q.queue, "logs", "sys.warning");
        await channel.consume(q.queue,(message)=>{
            console.log(message.content.toString());
        },{noAck: true});

    } catch (error) {
        console.log('error', error);
    }
}