<p align="center"><img src="https://trello-attachments.s3.amazonaws.com/542e9c6316504d5797afbfb9/542e9c6316504d5797afbfc1/39dee8d993841943b5723510ce663233/Frame_19.png" width="100%"></p>



<div align="center"><img src="https://raw.githubusercontent.com/aquibe/VacBot/main/assets/wlogo.png"  width="500em" ></div>

<h1 align="center">VacBot(Discord CoWIN Bot)</h1>

<p align="center">Hey there!👋🏻, this is a Discord Bot called VacBot, which will check Covid vaccination slots availability in your area and alert you when a slot becomes available. Build by <a href="#team"> 3 students</a> from Safi Institute of Advanced Study for <mark>TinkerHub Build From Home 2021</mark> Discord Bot for CoWIN Project.</p>
<br>
<h3 align="center"><a href="https://discord.com/oauth2/authorize?client_id=844918394888388629&permissions=68608&scope=bot">Add the bot to your server</a> | <a href="https://discord.gg/DUPNJp7vYB/">Join our VacBot server</a></h3>

<br>
<h4>So,<br>
    1. <a href="#work">How it Works?</a><br>
    2. <a href="#use">How to Use the Bot?</a><br>
    3. <a href="#configure">How to Configure Project?</a><br>
    4. <a href="#library">Which all Libraries used?</a><br></h4>





<br><br>

<h1 id="work">How does this work?</h1>

<p>This is a discord app to get upcoming COWIN appointments based on commands. For each command you can register yourself to the database, with your District and Age, you can check the slots for vaccination using your Pincode, update your district while you moving put and a lot more. This bot works in Direct Message, but you can also add the bot to your server, and you can see a link to send Direct Message to the bot. After you register your district with the bot, you'll get the slot availability notification every day at 6:40AM(IST). Excited to check out the bot? Click here to go to '<a href="#use">How to use the bot.</a>'</p>

* <a href="https://www.loom.com/share/c4e2333b55894b43b9d6ce194d77de1e">Click here to know how the bot works (Video)</a>



<br><br>
<h1 id="use">How to Use the Bot?</h1>

1. <a href="https://discord.com/oauth2/authorize?client_id=844918394888388629&permissions=68608&scope=bot">Click here</a> to add the bot to your server or you can <a href="https://discord.gg/DUPNJp7vYB/">click here</a> to join our VacBot server<br>
2. Type <code>$vacbot</code> in text channels to show the wizard where you can see the link to add the bot to other servers and also an option to direct message to the bot. Click that link or clcik on profile.
3. When you open Direct Message to the bot you can see every command using the <code>help</code> command<br>
4. First, find your State code using the <code>show states</code> command.<br>
5. Now find your district code using <code>show district STATE_CODE</code>  -> Eg: for Kerala state, <code>show district 17</code><br>
6. Now you get a list of districts with district codes, now you have to register so that you'll receive the notifications related to open slots for Covid Vaccination. For that use <code>register DISTRICT_CODE AGE</code> -> Eg: If you are from Malappuram District of Kerala and your age is 25, <code>register 302 25</code><br>
7. If you want to know what all data we store, you can use the <code>show mydata</code> command<br>
8. To check available slots by Pincode you can use <code>check pincode PINCODE_OF_YOUR_PLACE DATE_YOU_ARE_LOOKING_IN_DD-MM-YYYY_FORMAT</code> command. For example -> If your Pincode is 676504 and you need to know the available slot on 25th May 2021, <code>check pincode 676504 25-05-2021</code><br>
9. You can also update your age using <code>update age YOUR_UPDATED_AGE</code>command. <br>
10. Similarly, you can update the district using the <code>update district NEW_DISTRICT_CODE</code> command. For example if you want to change your district to Kozhikode you can use, <code>update district 305</code>, where 305 is the code for Kozhikode District<br>
11. If you want to unsubscribe to daily updates, send  <code>unregister</code>


<br><br>
<h1 id="configure">How to Configure Project?</h1>

1. Clone Project
```
git clone https://github.com/aquibe/VacBot
```
2. Change directory to VacBot
```
cd VacBot
```
3. Install libraries
```
npm install
```
4. Create file <code>.env</code> and add the line
```
BOT_TOKEN=enter_your_bot_token
MONGO_DBNAME=enter_mongoDB_name
MONGO_USERNAME=enter_your_mongoDB_Username
MONGO_PASSWORD=enter_your_bot_mongoDB_Password
MONGO_CLUSTER=enter_your_mongoDB_Cluster
```
5. Run project
```
npm start
```


<br><br>

<h1 id="library">Libraries used</h1>

1. Discord.js : To make our NodeJS Bot for Discord<br>
2. dotenv : To set environmental Variable<br>
3. https : To send API requests<br>
4. MongoDB : Used as Database<br>
5. scheduler : To schedule daily updates

<br><br>

<h1 id="team">Team VacBot</h1>

<table align="center">

<tr>
    <th>No.</th>
    <th>Name</th>
    <th>Github</th>
    <th>Discord ID</th>
  </tr>

<tr>
    <td>1</td>
    <td>Aquibe V<br>(Team Lead)</td>
    <td><a href=https://github.com/aquibe>aquibe</a></td>
    <td><a href=https://discordapp.com/users/837630620477423616/>aquibe#7565</a></td>
  </tr>

<tr>
    <td>2</td>
    <td>Shaheem PP</td>
    <td><a href=https://github.com/the-codeholic>the-codeholic</a></td>
    <td><a href=https://discordapp.com/users/704791676044050483/>Shaheem PP#8073</a></td>
  </tr>

<tr>
    <td>3</td>
    <td>Naswih Abdurahiman</td>
    <td><a href=https://github.com/neewtn>neewtn</a></td>
    <td><a href=https://discordapp.com/users/434640898605711360/>Naswih#2013</a></td>
  </tr>
  
  <tr>
    <th colspan="4">Team ID: BFH/rechULibqwqj1WZ6i/2021</th>
  </tr>
</table>
