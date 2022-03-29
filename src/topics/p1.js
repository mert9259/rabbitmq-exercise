const amqp = require("amqplib");

func();

async function func(){
    try {
        const connect = await amqp.connect("amqp://localhost:5672");
        const channel = await connect.createChannel();

        await channel.assertExchange("logs","topic",{durable: false})
        await channel.publish("logs","sys.error",Buffer.from("System error"));
        await channel.publish("logs","sys.info",Buffer.from("System info"));
        await channel.publish("logs","sys.warning",Buffer.from("System warning"));
        await channel.publish("logs","os.error",Buffer.from("Operating System error"));
        await channel.publish("logs","os.info",Buffer.from("Operating System info"));
        await channel.publish("logs","os.warning",Buffer.from("Operating System warning"));


        setTimeout(async ()=>{
            await channel.deleteExchange("logs");
            await channel.close();
            console.log("Exchange deleted to successfully");
            console.log("Channel closed to successfully");
            process.exit(1);
        },3000);
        
    } catch (error) {
        console.log('error', error);
    }
}