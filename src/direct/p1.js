const amqp = require("amqplib");


func();

async function func(){

    try {
        const exchange = "color";
        
        const connect = await amqp.connect("amqp://localhost:5672");
        const channel = await connect.createChannel();

        channel.assertExchange(exchange, "direct",{durable:false});
        channel.publish(exchange,"red",Buffer.from("This color is red"));
        channel.publish(exchange,"blue",Buffer.from("This color is blue"));
        channel.publish(exchange,"green",Buffer.from("This color is green"));

    } catch (error) {
        console.log('error', error)
    }
}