require('dotenv').config()
const Discord = require('discord.js')
const client= new Discord.Client()
const https = require('https')
const express=require('express')
const app=express()

//this code is to test api availability on hosting servers

app.get('/api/kerala',(req,res)=>{
    https.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/17',(resp)=>{
        resp.on('data',(data)=>{
            res.send(JSON.parse(data))
        })
    })
   
})

client.on('ready',(msg)=>{
    console.log('logged in as '+client.user.tag)
})

client.on('message',(msg)=>{
    console.log('username : '+msg.author.username)
    console.log('channel : '+msg.channel)
    console.log('content : '+msg.content)
    console.log('------------------------------------------')
    if(!msg.author.bot){
        const message=msg.content.toLowerCase();
        switch(message){
            case 'hello':msg.reply('hello')
                        break
            case 'about':msg.reply('just a test bot')
                        break
            case 'bye':msg.reply('bye')
                        break

            default:msg.channel.send('invalid command')
        }
    }
})

client.login(process.env.TOKEN)

app.listen(3000)
