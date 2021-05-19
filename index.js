require('dotenv').config()
const Discord = require('discord.js')
const client= new Discord.Client()
const https = require('https');
const { compileFunction } = require('vm');
const db=require('./database')


client.on('ready',()=>{
    console.log('logged in as '+client.user.tag)   
})

client.on('message',async (message)=>{
    if(!message.author.bot){
        if(message.channel.type=='text'){
            const commands = message.content.toLocaleLowerCase().split(' ') 
            switch(commands[0]){
                case 'saveme' :
                case '$saveme':  saveUser(message.author.id);
                                break;
                case '$messageall' : messageAll();
            }   
        }
        else if(message.channel.type=='dm'){
            console.log('dm')
        }
    }
})

async function sendMessage (userId){
    console.log('send message called')
    const user = await client.users.fetch(userId).catch(() => console.log('could not find user'));

    if (!user) return console.log("User not found:(");

    await user.send("message for users (subscribed)").catch(() => {
    console.log("could not send message");
    });
}

function messageAll(){

    db.con.query("SELECT id FROM usr WHERE 1",function (err, result) {
        if (err) {
            console.log('error occured while searching in db')
        }else{
            result.forEach(user => {
                console.log(user.id)
                sendMessage(user.id)
            });     
        }
    })
}

function saveUser(userId){
    console.log(userId)
    db.insertData(userId);  
}

client.login(process.env.TOKEN)

