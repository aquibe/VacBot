require('dotenv').config()//env variables
//vacbot
const Discord = require('discord.js')// imported discord js
const discord_bot= new Discord.Client()// created client object

const https = require('https') // imported http module
const msg= require('./messages') // imported files containing some discord messages
const districtList=require('./district-list')// list of valid district codes

const MongoClient = require('mongodb').MongoClient; // imported mongodb 
const db_name=process.env.MONGO_DBNAME// set database name to this variable (as we are using da-name in many places)
const mongoUri = "mongodb+srv://"+process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_CLUSTER+"/"+db_name;
const dbClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//dbClient is used to connect to mongodb 


dbClient.connect((err)=>{
     if(err){
         console.log(err)
     }else{
        console.log('db connected')
     }
 })//connect to mongodb atlas


discord_bot.on('message',async (message)=>{
    const commands = message.content.toLocaleLowerCase().split(' ') //divide message to words and store in array
    
    if(!message.author.bot){
        if(message.channel.type=='dm'){ 
            const userId=message.author.id;           
            if(commands[0]=='show'){
                if(commands[1]=='states'||commands[1]=='state'){
                    message.channel.send(msg.states)
                    //show states
                }else if(commands[1]=='districts'||commands[1]=='district'){
                    if(commands[2]>0&&commands[2]<38){
                        message.channel.send(msg.district[commands[2]])
                        //show districts
                    }else{
                        message.channel.send('invalid state code')
                        //invalid state code
                    }
                }else if(commands[1]=='mydata'){
                    await showUser(userId)
                    //show user data
                }else{
                    message.channel.send(msg.showMessages)
                    //send show codes 
                }
            }else if(commands[0]=='check'){
                if(commands[1]=='district'&&commands[2]&&commands[3]){
                    const d= districtList.find(e=>e.district_id==commands[2])
                    if(d){
                        checkDistrict(userId,commands[2],commands[3])
                    }else{
                        message.channel.send('invalid district code')
                    }//check whether district code is valid
                }else if(commands[1]=='pincode'&&commands[2].length==6&&commands[3]){
                    checkPincode(userId,commands[2],commands[3])                
                }else{
                    message.channel.send(msg.checkMessages)
                    // send check codes
                }
            }else if(commands[0]=='register') {
                if(commands[1]&&commands[2]){
                    const d= districtList.find(e=>e.district_id==commands[1])
                    if(d){
                        await addUser(userId,message.author.username,commands[1],d.district_name,commands[2])
                        await addDistrict(commands[1],d.district_name)
                        await showUser(userId)
                    }else{
                        message.channel.send('invalid district code')
                    }                   
                    // add user db
                }else{
                    message.channel.send(msg.registerMessage)
                }
            }else if(commands[0]=='update'){
                if(commands[1]=='age'&&commands[2]){
                    await updateAge(userId,commands[2])
                    await showUser(userId)
                    //update age
                }else if(commands[1]=='district'&&commands[2]){
                    const d= districtList.find(e=>e.district_id==commands[2])
                    if(d){
                        await updateDistrict(userId,commands[2],d.district_name)
                        await showUser(userId)
                    }else{
                        message.channel.send('Invalid District code')
                    }                   
                    // update district
                }else{
                    message.channel.send(msg.updateMessage)
                    //send update code
                }
            }else if(commands[0]=='unregister'){
                await deleteUser(userId)
                message.channel.send('Unregistered from daily updates')
                // delete user
            }else if(commands[0]=='help'){
                message.channel.send(msg.commandsMessage);
            }else{
                message.channel.send("invalid command\n\n send 'help' to see all commands")
                //invalid command
            }
        }
        else if(message.channel.type=='text'){           
            if(commands[0]=='$vacbot'&&commands[1]=='website'&&message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
                message.channel.send('Visit : https://vacbot.netlify.app')
            }else if(commands[0]=='$vacbot'&&commands[1]=='help'&&message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
                message.channel.send('How to use VacBot : https://www.youtube.com/watch?v=K-_oxnVltrw\n\nVisit VacBot Website : https://vacbot.netlify.app')
            }else if(commands[0]=='$vacbot'&&message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
                    message.channel.send(msg.aboutMessage)//respond with an about message to channels which bot have 'SEND_MESSAGES' permission
            }
        }
    }
})



discord_bot.on('ready',()=>{
    console.log('logged in as '+discord_bot.user.tag)
    discord_bot.user.setActivity('$vacbot',{type:"LISTENING"})
})// bot logged in


discord_bot.login(process.env.BOT_TOKEN)
// login as bot




async function addDistrict(id,name){
    const database = dbClient.db(db_name)
    let exists = await database.collection('districts').countDocuments({code:id})
    if(!exists){
        await database.collection('districts').insertOne({code: id,name:name})
    }  
}//add a district to database so that bot can check available slots in these districts daily.


async function addUser(id,name,code,district_name,age){
    const database = dbClient.db(db_name)
    let exists = await database.collection('users').countDocuments({id:id})
    if(!exists){
        await database.collection('total').insertOne({id: id,name:name,code:code,age:age,district:district_name})
        await database.collection('users').insertOne({id: id,name:name,code:code,age:age,district:district_name})
        await addDistrict(code,district_name)
    }else{
        const dis = await database.collection('users').findOne({id:id})
        await removeDistrict(dis.code) 
        await database.collection('users').updateOne({id:id},{$set:{age:age,code:code,district:district_name,name:name}}) 
        await database.collection('total').updateOne({id:id},{$set:{age:age,code:code,district:district_name,name:name}}) 
        await addDistrict(code,district_name)
    }
}//function to add a user to db 
//these users will be able to get daily updates 

async function updateAge(id,age){
    const database = dbClient.db(db_name)
    let exists = await database.collection('users').countDocuments({id:id})
    if(exists){
        await database.collection('users').updateOne({id:id},{$set:{age:age}}) 
        await database.collection('total').updateOne({id:id},{$set:{age:age}}) 
    }else{
        const fetchedUser=await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
        await fetchedUser.send('You are a not registered user.') 
    }           
}//update age of user

async function updateDistrict(id,code,name){
    const database = dbClient.db(db_name)
    let exists = await database.collection('users').countDocuments({id:id})
    if(exists){   
        const dis = await database.collection('users').findOne({id:id})
        await removeDistrict(dis.code)   
        await database.collection('users').updateOne({id:id},{$set:{code:code,district:name}})  
        await database.collection('total').updateOne({id:id},{$set:{code:code,district:name}})  
        await addDistrict(code,name)      
    }else{
        const fetchedUser=await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
        await fetchedUser.send('You are a not registered user.') 
    }     
}//update district of user

async function deleteUser(id){
    const database = dbClient.db(db_name)
    let exists = await database.collection('users').countDocuments({id:id})
    if(exists){
        const dis = await database.collection('users').findOne({id:id})
        await removeDistrict(dis.code)
        await database.collection('users').deleteOne({id:id})  
    }  
}//delete a user from db, the user will not be able to get hourly updates 

async function showUser(id){
    const database = dbClient.db(db_name)        
    let exists = await database.collection('users').countDocuments({id:id})
    if(exists){
        const userData=await database.collection('users').findOne({id:id})
        let userMessage = new Discord.MessageEmbed()
            .setColor('#44c544')
            .setTitle('User Data')
            .addFields(
                { name: 'Name', value: userData.name},
                { name: 'Age', value: userData.age},
                { name: 'District code', value: userData.code},
                {name:'District Name',value:userData.district},            
            );
        const fetchedUser=await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
        await fetchedUser.send(userMessage)
    }else{
        const fetchedUser=await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
        await fetchedUser.send('You are not a registered user.')
        //send message to user
    }  
}// show the user registered data

async function removeDistrict(id){
    const database = dbClient.db(db_name) 
    let number = await database.collection('users').countDocuments({code:id})
    if(number<2){
        await database.collection('districts').deleteOne({code:id})
    } 
}//remove district from districts database

function checkDistrict(id,code,date){
    https.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+code+"&date="+date,async (resp)=>{    

        if(resp.statusCode==200){
           let d=''
            resp.on('data',(c)=>{
                d+=c
            })

            resp.on('end',async()=>{
                let flag=0;
                const data=JSON.parse(d);
                const fetchedUser= await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
                await data.sessions.forEach(async(i)=>{
                    if(i.available_capacity>0){
                        flag++
                        await fetchedUser.send("\nname : "+i.name+"\ncenter id : "+i.center_id+"\naddress : "+i.address+"\nblock name : "+i.block_name+"\npincode : "+i.pincode+"\n\nfee type : "+i.fee_type+"\nfee : "+i.fee+"\nvaccine : "+i.vaccine+"\nminimum age : "+i.min_age_limit+"\n\ndose 1 capacity : "+i.available_capacity_dose1+"\ndose 2 capacity : "+i.available_capacity_dose2+"\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")
                    }
                })
                let regMsg=new Discord.MessageEmbed()
                            .setColor('#44c544')
                            .addFields({name:"To register,visit",value:"https://www.cowin.gov.in/home"})
                let nodataMsg=new Discord.MessageEmbed()
                            .setTitle('Available slots : '+date)
                            .setColor('#ff1111')
                            .setDescription('No available slots in this location')        
                 if(flag>0){
                    await fetchedUser.send(regMsg) 
                }else{
                    await fetchedUser.send(nodataMsg) 
                }                                       
            })
        }else{
            const fetchedUser= await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
            await fetchedUser.send('Could not complete this request\n\nPlease check the request and try again')
        }
    })
}//available slots in given district on given date


function checkPincode(id,code,date){
    https.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+code+"&date="+date, async(resp)=>{       
        if(resp.statusCode==200){
            let d=''
            resp.on('data',(c)=>{
                d+=c
            })
            resp.on('end',async()=>{
                let flag=0;
                const data=JSON.parse(d)
                const fetchedUser= await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
               
                await data.sessions.forEach(async(i)=>{
                    if(i.available_capacity>0){  
                        flag++                   
                        await fetchedUser.send("\nname : "+i.name+"\ncenter id : "+i.center_id+"\naddress : "+i.address+"\nblock name : "+i.block_name+"\npincode : "+i.pincode+"\n\nfee type : "+i.fee_type+"\nfee : "+i.fee+"\nvaccine : "+i.vaccine+"\nminimum age : "+i.min_age_limit+"\n\ndose 1 capacity : "+i.available_capacity_dose1+"\ndose 2 capacity : "+i.available_capacity_dose2+"\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -")
                    }
                })
                let regMsg=new Discord.MessageEmbed()
                            .setColor('#44c544')
                            .addFields({name:"To register,visit",value:"https://www.cowin.gov.in/home"})
                let nodataMsg=new Discord.MessageEmbed()
                            .setTitle('Available slots : '+date)
                            .setColor('#ff1111')
                            .setDescription('No available slots in this location')        
                 if(flag>0){
                    await fetchedUser.send(regMsg) 
                }else{
                    await fetchedUser.send(nodataMsg) 
                }                  
            })
        }else{
            const fetchedUser= await discord_bot.users.fetch(id).catch(() => console.log('could not find user'));
            await fetchedUser.send('Could not complete this request\n\nPlease check the request and try again')
        }
    })
}//available slots on given pincode on given date




async function dailyUpdate(){
    const database = dbClient.db(db_name) 
    const allDistricts =  database.collection('districts').find({})
    let today=new Date()
    let month=today.getMonth()
    month++
    if(month<10){
        month=`0${month}`
    }
    let date=`${today.getDate()}-${month}-${today.getFullYear()}`
    console.log('daily update : '+date)
    await allDistricts.forEach(async(dist)=>{
        await searchUpdates(date,dist.code)         
    })   
}//daily update

async function searchUpdates(date,code){
    https.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+code+"&date="+date,async (resp)=>{    
        if(resp.statusCode==200){
           let d=''
            resp.on('data',(c)=>{
                d+=c
            })

            resp.on('end',async()=>{             
                const data=JSON.parse(d);
                const database = dbClient.db(db_name) 
                const people =  database.collection('users').find({code:code})
                await people.forEach(async(person)=>{
                    let count=0;
                    await data.centers.forEach(async(c)=>{
                        await c.sessions.forEach(async(s)=>{
                            if(s.available_capacity>0&&s.min_age_limit<=person.age){
                                count++
                            }
                            
                        })
                    })
                    let regMsg=new Discord.MessageEmbed()
                        .setColor('#44c544')
                        .setTitle('VacBot Update')
                        .setDescription(count+' centers are available for you')
                        .addFields({name:"To register,visit",value:"https://www.cowin.gov.in/home"})
                    if(count>0){
                        const fetchedUser= await discord_bot.users.fetch(person.id).catch(() => console.log('could not find user'));                  
                        await fetchedUser.send(regMsg) 
                    } 
                })                                         
            })
        }
    })
    return
}//send daily updates



setInterval(()=>{
    dailyUpdate()
},1000*60*10)




