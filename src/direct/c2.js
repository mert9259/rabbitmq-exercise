const amqp = require("amqplib");

func();

async function func(){
    try {
        const exchange = "color";
        const connect = await amqp.connect("amqp://localhost:5672");
        const channel = await connect.createChannel();

        await channel.assertExchange(exchange,"direct",{durable: false});
        const q = await channel.assertQueue("");

        await channel.bindQueue(q.queue, exchange, "green");
        await channel.consume(q.queue, (message) => {
            console.log(message.content.toString());
        });

    } catch (error) {
        console.log('error', error);
    }
}