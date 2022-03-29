const amqp = require("amqplib");

fanoutSend();

async function fanoutSend(){


    const exchange = "logs"
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();

        await channel.assertExchange(exchange,"fanout",{durable: false});

        for(let i = 0; i<400; i++) {

            await channel.publish(exchange,"",Buffer.from(JSON.stringify({desc: i})));
        }

    } catch (error) {
        console.log('error', error);
    }
}