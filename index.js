require('dotenv').config()//env variables

const Discord = require('discord.js')// imported discord js
const discord_bot= new Discord.Client()// created client object
const https = require('https') // imported http module
const MongoClient = require('mongodb').MongoClient; // imported mongodb 
const msg= require('./messages') // imported files containing some discord messages
var scheduler = require('node-schedule')//imported node-sheduler 

var db_name="test" // set database name to this variable (as we are using da-name in many places)

const mongoUri = "mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_CLUSTER+"/"+db_name;
const dbClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//dbClient is used to connect to mongodb 





discord_bot.on('message',(message)=>{
    const commands = message.content.toLocaleLowerCase().split(' ') 
    if(!message.author.bot){
        if(message.channel.type=='dm'){            
            switch(commands[0]){
              
            }   
        }
        else if(message.channel.type=='text'){           
            if(commands[0]=='$vacbot'&&message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
                message.channel.send(msg.aboutMessage)
            }//respond with an about message to channels which bot have 'SEND_MESSAGES' permission
        }
    }else if(message.author!=discord_bot.user){
        //just responding to pings send to keep the bot alive
        console.log('ping')
        message.reply('i am running..')
    }
})



discord_bot.on('ready',()=>{
    console.log('logged in as '+discord_bot.user.tag)   
})// bot is logged in











// functions

async function addDistrictDb(id){
    dbClient.connect(async(err) => {
        const database = dbClient.db(db_name)
        let exists = await database.collection('districts').countDocuments({code:id})
        if(!exists){
            await database.collection('districts').insertOne({code: id})
        }
        dbClient.close();
    });   
}//add a district to database so that bot can check available slots in these districts daily.


async function addUser(id,district,age){
    dbClient.connect(async(err) => {
        const database = dbClient.db(db_name)
        let exists = await database.collection('users').countDocuments({id:id})
        if(!exists){
            await database.collection('users').insertOne({id: id,code:district,age:age})
        }else{
            await database.collection('users').updateOne({id:id},{$set:{age:age,code:district}}) 
        }
        dbClient.close();
    }); 
}//function to add a user to db 
//these users will be able to get hourly updates 

async function updateAge(id,age){
    dbClient.connect(async(err) => {
        const database = dbClient.db(db_name)
        let exists = await database.collection('users').countDocuments({id:id})
        if(exists){
            await database.collection('users').updateOne({id:id},{$set:{age:age}}) 
        }      
        dbClient.close();
    });
}//update age of user

async function updateDistrict(id,district){
    dbClient.connect(async(err) => {
        const database = dbClient.db(db_name)
        let exists = await database.collection('users').countDocuments({id:id})
        if(exists){
            await database.collection('users').updateOne({id:id},{$set:{code:district}}) 
        }      
        dbClient.close();
    });
}//update district of user

async function deleteUser(id){
    dbClient.connect(async(err) => {
        const database = dbClient.db(db_name)
        let exists = await database.collection('users').countDocuments({id:id})
        if(exists){
            await database.collection('users').deleteOne({id:id})  
        }    
        dbClient.close();
    });
}//delete a user from db, the user will not be able to get hourly updates 

var rule = new scheduler.RecurrenceRule();
rule.minute = 10;
scheduler.scheduleJob(rule, function(){
    console.log('this will run every hour ')
})//check updates daily




//login as bot
//discord_bot.login(process.env.BOT_TOKEN)/