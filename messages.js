const Discord = require('discord.js')
// aboutMessage is send to text channels.
//registerMessage,showMessage, checkMessage, updateMessage are added to inhance user experience.(eg: if the first word is 'register' and command syntax is incorrect,bot will display syntax of register command)
//commandsMessage contain all commands.its send when user type 'help'
//states and districts are stored loccally to save api calls,so that more users can use the service,
//also a file named district-list stores all valid values of district code.when user request commands with district codes,bot checks whether that code is in the list and then only make api request,so it saves api calls wasted by wrong district code

module.exports.aboutMessage = new Discord.MessageEmbed()
	.setColor('#4545ff')
	.setImage('https://raw.githubusercontent.com/aquibe/VacBot/main/assets/wlogo.png')
	.setTitle('Welcome to VacBot')
	.setDescription("Hey there!:wave: I am VacBot, I will check Covid vaccination slots availability in your area and alert you when a slot becomes available.\n\nDirect Message , I will not respond in channels\n\n\u200B\n[Visit Website to know more](https://vacbot.netlify.app)")
	.setFooter('This Bot is only available on DM.');

module.exports.registerMessage=new Discord.MessageEmbed()
	.setColor('#fd9900')
	.setTitle('VacBot Help')
	.addFields({ name: '\u200B', value: "**To register for updates:** \n`register <district code> <age>`"},
				{name: '\u200B', value: "eg:- if you are a for 19 year old at calicut send: \n`register 305 19`" },
				{name:'\u200B',value:'\u200B'})
	.setFooter("Type 'help' to see all commands");

module.exports.showMessages=new Discord.MessageEmbed()
	.setColor('#fd9900')
	.setTitle('VacBot Help')
	.addFields(
		{name: '\u200B', value:[
			"**To show list of states:** \n`show states`\n", 
			"**To show list of districts:** \n`show districts <state code>`\n",
			"**To see Your data:** \n`show mydata`\n",
		]},{name:'\u200B',value:'\u200B'}
	)
	.setFooter("Type 'help' to see all commands");

module.exports.checkMessages=new Discord.MessageEmbed()
	.setColor('#fd9900')
	.setTitle('VacBot Help')
	.addFields(
		{name: '\u200B', value:[
			"**To check slot by pincode:** \n`check pincode <pincode> <dd-mm-yyyy>`\n",
			"**To check slot by district:** \n`check district <district code> <dd-mm-yyyy>`\n",
		]},{name:'\u200B',value:'\u200B'}
	)
	.setFooter("Type 'help' to see all commands");

module.exports.updateMessage=new Discord.MessageEmbed()
	.setColor('#fd9900')
	.setTitle('VacBot Help')
	.addFields(
		{name: '\u200B', value:[
			"**To update your age:** \n`update age <age>`\n",
			"**To update your district:** \n`update district <district code>`\n",
		]},{name:'\u200B',value:'\u200B'}
	)
	.setFooter("Type 'help' to see all commands");

module.exports.commandsMessage = new Discord.MessageEmbed()
	.setColor('#4545ff')
	.setThumbnail('https://raw.githubusercontent.com/aquibe/VacBot/main/assets/wlogo.png')
	.setTitle('**VacBot**')
	.setDescription("Hey there!👋 I am VacBot, I will check Covid vaccination slots availability in your area and alert you when a slot becomes available.\n\u200B\n[Visit Website to know more](https://vacbot.netlify.app)\n\u200B")
	.addFields(
		{name:"Commands", value:[
				"To show list of states: \n`show states`", 
				"To show list of districts: \n`show districts <state code>`\n",
				"To check slot by pincode: \n`check pincode <pincode> <dd-mm-yyyy>`",
				"To check slot by district: \n`check district <district code> <dd-mm-yyyy>`\n",
				"To register for updates: \n`register <district code> <age>`",
				"To see Your data: \n`show mydata`",
				"To update your age: \n`update age <age>`",
				"To update your district: \n`update district <district code>`",
				"To un-register updates: \n`unregister`\n",
			]},{name:'\u200B',value:'\u200B'}
		)
		.setFooter("eg:- for registering updates for 19 at calicut send: register 305 19");



module.exports.states=new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('States List')
	.addField("states","*1* : Andaman and Nicobar Islands \n*2* : Andhra Pradesh \n*3* : Arunachal Pradesh \n*4* : Assam \n*5* : Bihar \n*6* : Chandigarh \n*7* : Chhattisgarh \n*8* : Dadra and Nagar Haveli  \n*9* : Delhi \n*10* : Goa \n*11* : Gujarat \n*12* : Haryana \n*13* : Himachal Pradesh \n*14* : Jammu and Kashmir \n*15* : Jharkhand \n*16* : Karnataka \n*17* : Kerala \n*18* : Ladakh \n*19* : Lakshadweep \n*20* : Madhya Pradesh \n*21* : Maharashtra \n*22* : Manipur \n*23* : Meghalaya \n*24* : Mizoram \n*25* : Nagaland \n*26* : Odisha \n*27* : Puducherry \n*28* : Punjab \n*29* : Rajasthan \n*30* : Sikkim \n*31* : Tamil Nadu \n*32* : Telangana \n*33* : Tripura \n*34* : Uttar Pradesh \n*35* : Uttarakhand \n*36* : West Bengal\n*37* : Daman and Diu")

module.exports.district=[]
module.exports.district[1] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Andaman and Nicobar Islands","**1** : North and Middle Andaman \n**2** : South Andaman \n**3** : Nicobar")

module.exports.district[2] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Andhra Pradesh","**9** : Anantapur \n**10** : Chittoor \n**11** : East Godavari \n**5** : Guntur \n**4** : Krishna \n**7** : Kurnool \n**12** : Prakasam \n**13** : Sri Potti Sriramulu Nellore \n**14** : Srikakulam \n**8** : Visakhapatnam \n**15** : Vizianagaram \n**16** : West Godavari \n**6** : YSR District, Kadapa (Cuddapah)")

module.exports.district[3] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Arunachal Pradesh","**22** : Anjaw \n**20** : Changlang \n**25** : Dibang Valley \n**23** : East Kameng \n**42** : East Siang \n**17** : Itanagar Capital Complex \n**24** : Kamle \n**27** : Kra Daadi \n**21** : Kurung Kumey \n**33** : Lepa Rada \n**29** : Lohit \n**40** : Longding \n**31** : Lower Dibang Valley \n**18** : Lower Siang \n**32** : Lower Subansiri \n**36** : Namsai \n**19** : Pakke Kessang \n**39** : Papum Pare \n**35** : Shi Yomi \n**37** : Siang \n**30** : Tawang \n**26** : Tirap \n**34** : Upper Siang \n**41** : Upper Subansiri \n**28** : West Kameng \n**38** : West Siang")

module.exports.district[4] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Assam","**46** : Baksa \n**47** : Barpeta \n**765** : Biswanath \n**57** : Bongaigaon \n**66** : Cachar \n**766** : Charaideo \n**58** : Chirang \n**48** : Darrang \n**62** : Dhemaji \n**59** : Dhubri \n**43** : Dibrugarh \n**67** : Dima Hasao \n**60** : Goalpara \n**53** : Golaghat \n**68** : Hailakandi \n**764** : Hojai \n**54** : Jorhat \n**49** : Kamrup Metropolitan \n**50** : Kamrup Rural \n**51** : Karbi-Anglong \n**69** : Karimganj \n**61** : Kokrajhar \n**63** : Lakhimpur \n**767** : Majuli \n**55** : Morigaon \n**56** : Nagaon \n**52** : Nalbari \n**44** : Sivasagar \n**64** : Sonitpur \n**768** : South Salmara Mankachar \n**45** : Tinsukia \n**65** : Udalguri \n**769** : West Karbi Anglong")

module.exports.district[5] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Bihar","**74** : Araria \n**78** : Arwal \n**77** : Aurangabad \n**83** : Banka \n**98** : Begusarai \n**82** : Bhagalpur \n**99** : Bhojpur \n**100** : Buxar \n**94** : Darbhanga \n**105** : East Champaran \n**79** : Gaya \n**104** : Gopalganj \n**107** : Jamui \n**91** : Jehanabad \n**80** : Kaimur \n**75** : Katihar \n**101** : Khagaria \n**76** : Kishanganj \n**84** : Lakhisarai \n**70** : Madhepura \n**95** : Madhubani \n**85** : Munger \n**86** : Muzaffarpur \n**90** : Nalanda \n**92** : Nawada \n**97** : Patna \n**73** : Purnia \n**81** : Rohtas \n**71** : Saharsa \n**96** : Samastipur \n**102** : Saran \n**93** : Sheikhpura \n**87** : Sheohar \n**88** : Sitamarhi \n**103** : Siwan \n**72** : Supaul \n**89** : Vaishali \n**106** : West Champaran")

module.exports.district[6] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Chandigarh","**108** : Chandigarh")

module.exports.district[7] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Chhattisgarh","**110** : Balod \n**111** : Baloda bazar \n**112** : Balrampur \n**113** : Bastar \n**114** : Bemetara \n**115** : Bijapur \n**116** : Bilaspur \n**117** : Dantewada \n**118** : Dhamtari \n**119** : Durg \n**120** : Gariaband \n**136** : Gaurela Pendra Marwahi  \n**121** : Janjgir-Champa \n**122** : Jashpur \n**123** : Kanker \n**135** : Kawardha \n**124** : Kondagaon \n**125** : Korba \n**126** : Koriya \n**127** : Mahasamund \n**128** : Mungeli \n**129** : Narayanpur \n**130** : Raigarh \n**109** : Raipur \n**131** : Rajnandgaon \n**132** : Sukma \n**133** : Surajpur \n**134** : Surguja")

module.exports.district[8] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Dadra and Nagar Haveli","**137** : Dadra and Nagar Haveli")

module.exports.district[9] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Delhi","**141** : Central Delhi \n**145** : East Delhi \n**140** : New Delhi \n**146** : North Delhi \n**147** : North East Delhi \n**143** : North West Delhi \n**148** : Shahdara \n**149** : South Delhi \n**144** : South East Delhi \n**150** : South West Delhi \n**142** : West Delhi")

module.exports.district[10] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Goa","**151** : North Goa \n**152** : South Goa")

module.exports.district[11] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Gujarat","**154** : Ahmedabad \n**770** : Ahmedabad Corporation \n**174** : Amreli \n**179** : Anand \n**158** : Aravalli \n**159** : Banaskantha \n**180** : Bharuch \n**175** : Bhavnagar \n**771** : Bhavnagar Corporation \n**176** : Botad \n**181** : Chhotaudepur \n**182** : Dahod \n**163** : Dang \n**168** : Devbhumi Dwaraka \n**153** : Gandhinagar \n**772** : Gandhinagar Corporation \n**177** : Gir Somnath \n**169** : Jamnagar \n**773** : Jamnagar Corporation \n**178** : Junagadh \n**774** : Junagadh Corporation \n**156** : Kheda \n**170** : Kutch \n**183** : Mahisagar \n**160** : Mehsana \n**171** : Morbi \n**184** : Narmada \n**164** : Navsari \n**185** : Panchmahal \n**161** : Patan \n**172** : Porbandar \n**173** : Rajkot \n**775** : Rajkot Corporation \n**162** : Sabarkantha \n**165** : Surat \n**776** : Surat Corporation \n**157** : Surendranagar \n**166** : Tapi \n**155** : Vadodara \n**777** : Vadodara Corporation \n**167** : Valsad")

module.exports.district[12] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Haryana","**193** : Ambala \n**200** : Bhiwani \n**201** : Charkhi Dadri \n**199** : Faridabad \n**196** : Fatehabad \n**188** : Gurgaon \n**191** : Hisar \n**189** : Jhajjar \n**204** : Jind \n**190** : Kaithal \n**203** : Karnal \n**186** : Kurukshetra \n**206** : Mahendragarh \n**205** : Nuh \n**207** : Palwal \n**187** : Panchkula \n**195** : Panipat \n**202** : Rewari \n**192** : Rohtak \n**194** : Sirsa \n**198** : Sonipat \n**197** : Yamunanagar")

module.exports.district[13] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Himachal Pradesh","**219** : Bilaspur \n**214** : Chamba \n**217** : Hamirpur \n**213** : Kangra \n**216** : Kinnaur \n**211** : Kullu \n**210** : Lahaul Spiti \n**215** : Mandi \n**208** : Shimla \n**212** : Sirmaur \n**209** : Solan \n**218** : Una")

module.exports.district[14] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Jammu and Kashmir","**224** : Anantnag \n**223** : Bandipore \n**225** : Baramulla \n**229** : Budgam \n**232** : Doda \n**228** : Ganderbal \n**230** : Jammu \n**234** : Kathua \n**231** : Kishtwar \n**221** : Kulgam \n**226** : Kupwara \n**238** : Poonch \n**227** : Pulwama \n**237** : Rajouri \n**235** : Ramban \n**239** : Reasi \n**236** : Samba \n**222** : Shopian \n**220** : Srinagar \n**233** : Udhampur")

module.exports.district[15] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Jharkhand","**242** : Bokaro \n**245** : Chatra \n**253** : Deoghar \n**257** : Dhanbad \n**258** : Dumka \n**247** : East Singhbhum \n**243** : Garhwa \n**256** : Giridih \n**262** : Godda \n**251** : Gumla \n**255** : Hazaribagh \n**259** : Jamtara \n**252** : Khunti \n**241** : Koderma \n**244** : Latehar \n**250** : Lohardaga \n**261** : Pakur \n**246** : Palamu \n**254** : Ramgarh \n**240** : Ranchi \n**260** : Sahebganj \n**248** : Seraikela Kharsawan \n**249** : Simdega \n**263** : West Singhbhum")

module.exports.district[16] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Karnataka","**270** : Bagalkot \n**276** : Bangalore Rural \n**265** : Bangalore Urban \n**294** : BBMP \n**264** : Belgaum \n**274** : Bellary \n**272** : Bidar \n**271** : Chamarajanagar \n**273** : Chikamagalur \n**291** : Chikkaballapur \n**268** : Chitradurga \n**269** : Dakshina Kannada \n**275** : Davanagere \n**278** : Dharwad \n**280** : Gadag \n**267** : Gulbarga \n**289** : Hassan \n**279** : Haveri \n**283** : Kodagu \n**277** : Kolar \n**282** : Koppal \n**290** : Mandya \n**266** : Mysore \n**284** : Raichur \n**292** : Ramanagara \n**287** : Shimoga \n**288** : Tumkur \n**286** : Udupi \n**281** : Uttar Kannada \n**293** : Vijayapura \n**285** : Yadgir")

module.exports.district[17] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Kerala","**301** : Alappuzha \n**307** : Ernakulam \n**306** : Idukki \n**297** : Kannur \n**295** : Kasaragod \n**298** : Kollam \n**304** : Kottayam \n**305** : Kozhikode \n**302** : Malappuram \n**308** : Palakkad \n**300** : Pathanamthitta \n**296** : Thiruvananthapuram \n**303** : Thrissur \n**299** : Wayanad")

module.exports.district[18] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Ladakh","**309** : Kargil \n**310** : Leh")

module.exports.district[19] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Lakshadweep","**796** : Agatti Island \n**311** : Lakshadweep")

module.exports.district[20] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Madhya Pradesh","**320** : Agar \n**357** : Alirajpur \n**334** : Anuppur \n**354** : Ashoknagar \n**338** : Balaghat \n**343** : Barwani \n**362** : Betul \n**351** : Bhind \n**312** : Bhopal \n**342** : Burhanpur \n**328** : Chhatarpur \n**337** : Chhindwara \n**327** : Damoh \n**350** : Datia \n**324** : Dewas \n**341** : Dhar \n**336** : Dindori \n**348** : Guna \n**313** : Gwalior \n**361** : Harda \n**360** : Hoshangabad \n**314** : Indore \n**315** : Jabalpur \n**340** : Jhabua \n**353** : Katni \n**339** : Khandwa \n**344** : Khargone \n**335** : Mandla \n**319** : Mandsaur \n**347** : Morena \n**352** : Narsinghpur \n**323** : Neemuch \n**326** : Panna \n**359** : Raisen \n**358** : Rajgarh \n**322** : Ratlam \n**316** : Rewa \n**317** : Sagar \n**333** : Satna \n**356** : Sehore \n**349** : Seoni \n**332** : Shahdol \n**321** : Shajapur \n**346** : Sheopur \n**345** : Shivpuri \n**331** : Sidhi \n**330** : Singrauli \n**325** : Tikamgarh \n**318** : Ujjain \n**329** : Umaria \n**355** : Vidisha")

module.exports.district[21] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Maharashtra","**391** : Ahmednagar \n**364** : Akola \n**366** : Amravati \n**397** : Aurangabad  \n**384** : Beed \n**370** : Bhandara \n**367** : Buldhana \n**380** : Chandrapur \n**388** : Dhule \n**379** : Gadchiroli \n**378** : Gondia \n**386** : Hingoli \n**390** : Jalgaon \n**396** : Jalna \n**371** : Kolhapur \n**383** : Latur \n**395** : Mumbai \n**365** : Nagpur \n**382** : Nanded \n**387** : Nandurbar \n**389** : Nashik \n**381** : Osmanabad \n**394** : Palghar \n**385** : Parbhani \n**363** : Pune \n**393** : Raigad \n**372** : Ratnagiri \n**373** : Sangli \n**376** : Satara \n**374** : Sindhudurg \n**375** : Solapur \n**392** : Thane \n**377** : Wardha \n**369** : Washim \n**368** : Yavatmal")

module.exports.district[22] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Manipur","**398** : Bishnupur \n**399** : Chandel \n**400** : Churachandpur \n**401** : Imphal East \n**402** : Imphal West \n**410** : Jiribam \n**413** : Kakching \n**409** : Kamjong \n**408** : Kangpokpi \n**412** : Noney \n**411** : Pherzawl \n**403** : Senapati \n**404** : Tamenglong \n**407** : Tengnoupal \n**405** : Thoubal \n**406** : Ukhrul")

module.exports.district[23] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Meghalaya","**424** : East Garo Hills \n**418** : East Jaintia Hills \n**414** : East Khasi Hills \n**423** : North Garo Hills \n**417** : Ri-Bhoi \n**421** : South Garo Hills \n**422** : South West Garo Hills \n**415** : South West Khasi Hills \n**420** : West Garo Hills \n**416** : West Jaintia Hills \n**419** : West Khasi Hills")

module.exports.district[24] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Mizoram","**425** : Aizawl East \n**426** : Aizawl West \n**429** : Champhai \n**428** : Kolasib \n**432** : Lawngtlai \n**431** : Lunglei \n**427** : Mamit \n**430** : Serchhip \n**433** : Siaha")

module.exports.district[25] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Nagaland","**434** : Dimapur \n**444** : Kiphire \n**441** : Kohima \n**438** : Longleng \n**437** : Mokokchung \n**439** : Mon \n**435** : Peren \n**443** : Phek \n**440** : Tuensang \n**436** : Wokha \n**442** : Zunheboto")

module.exports.district[26] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Odisha","**445** : Angul \n**448** : Balangir \n**447** : Balasore \n**472** : Bargarh \n**454** : Bhadrak \n**468** : Boudh \n**457** : Cuttack \n**473** : Deogarh \n**458** : Dhenkanal \n**467** : Gajapati \n**449** : Ganjam \n**459** : Jagatsinghpur \n**460** : Jajpur \n**474** : Jharsuguda \n**464** : Kalahandi \n**450** : Kandhamal \n**461** : Kendrapara \n**455** : Kendujhar \n**446** : Khurda \n**451** : Koraput \n**469** : Malkangiri \n**456** : Mayurbhanj \n**470** : Nabarangpur \n**462** : Nayagarh \n**465** : Nuapada \n**463** : Puri \n**471** : Rayagada \n**452** : Sambalpur \n**466** : Subarnapur \n**453** : Sundargarh")

module.exports.district[27] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Puducherry","**476** : Karaikal \n**477** : Mahe \n**475** : Puducherry \n**478** : Yanam")

module.exports.district[28] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Punjab","**485** : Amritsar \n**483** : Barnala \n**493** : Bathinda \n**499** : Faridkot \n**484** : Fatehgarh Sahib \n**487** : Fazilka \n**480** : Ferozpur \n**489** : Gurdaspur \n**481** : Hoshiarpur \n**492** : Jalandhar \n**479** : Kapurthala \n**488** : Ludhiana \n**482** : Mansa \n**491** : Moga \n**486** : Pathankot \n**494** : Patiala \n**497** : Rup Nagar \n**498** : Sangrur \n**496** : SAS Nagar \n**500** : SBS Nagar \n**490** : Sri Muktsar Sahib \n**495** : Tarn Taran")

module.exports.district[29] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Rajasthan","**507** : Ajmer \n**512** : Alwar \n**519** : Banswara \n**516** : Baran \n**528** : Barmer \n**508** : Bharatpur \n**523** : Bhilwara \n**501** : Bikaner \n**514** : Bundi \n**521** : Chittorgarh \n**530** : Churu \n**511** : Dausa \n**524** : Dholpur \n**520** : Dungarpur \n**517** : Hanumangarh \n**505** : Jaipur I \n**506** : Jaipur II \n**527** : Jaisalmer \n**533** : Jalore \n**515** : Jhalawar \n**510** : Jhunjhunu \n**502** : Jodhpur \n**525** : Karauli \n**503** : Kota \n**532** : Nagaur \n**529** : Pali \n**522** : Pratapgarh \n**518** : Rajsamand \n**534** : Sawai Madhopur \n**513** : Sikar \n**531** : Sirohi \n**509** : Sri Ganganagar \n**526** : Tonk \n**504** : Udaipur")

module.exports.district[30] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Sikkim","**535** : East Sikkim \n**537** : North Sikkim \n**538** : South Sikkim \n**536** : West Sikkim")

module.exports.district[31] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Tamil Nadu","**779** : Aranthangi \n**555** : Ariyalur \n**578** : Attur \n**565** : Chengalpet \n**571** : Chennai \n**778** : Cheyyar \n**539** : Coimbatore \n**547** : Cuddalore \n**566** : Dharmapuri \n**556** : Dindigul \n**563** : Erode \n**552** : Kallakurichi \n**557** : Kanchipuram \n**544** : Kanyakumari \n**559** : Karur \n**780** : Kovilpatti \n**562** : Krishnagiri \n**540** : Madurai \n**576** : Nagapattinam \n**558** : Namakkal \n**577** : Nilgiris \n**564** : Palani \n**573** : Paramakudi \n**570** : Perambalur \n**575** : Poonamallee \n**546** : Pudukkottai \n**567** : Ramanathapuram \n**781** : Ranipet \n**545** : Salem \n**561** : Sivaganga \n**580** : Sivakasi \n**551** : Tenkasi \n**541** : Thanjavur \n**569** : Theni \n**554** : Thoothukudi (Tuticorin) \n**560** : Tiruchirappalli \n**548** : Tirunelveli \n**550** : Tirupattur \n**568** : Tiruppur \n**572** : Tiruvallur \n**553** : Tiruvannamalai \n**574** : Tiruvarur \n**543** : Vellore \n**542** : Viluppuram \n**549** : Virudhunagar")

module.exports.district[32] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Telangana","**582** : Adilabad \n**583** : Bhadradri Kothagudem \n**581** : Hyderabad \n**584** : Jagtial \n**585** : Jangaon \n**586** : Jayashankar Bhupalpally \n**587** : Jogulamba Gadwal \n**588** : Kamareddy \n**589** : Karimnagar \n**590** : Khammam \n**591** : Kumuram Bheem \n**592** : Mahabubabad \n**593** : Mahabubnagar \n**594** : Mancherial \n**595** : Medak \n**596** : Medchal \n**612** : Mulugu \n**597** : Nagarkurnool \n**598** : Nalgonda \n**613** : Narayanpet \n**599** : Nirmal \n**600** : Nizamabad \n**601** : Peddapalli \n**602** : Rajanna Sircilla \n**603** : Rangareddy \n**604** : Sangareddy \n**605** : Siddipet \n**606** : Suryapet \n**607** : Vikarabad \n**608** : Wanaparthy \n**609** : Warangal(Rural) \n**610** : Warangal(Urban) \n**611** : Yadadri Bhuvanagiri")

module.exports.district[33] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Tripura","**614** : Dhalai \n**615** : Gomati \n**616** : Khowai \n**617** : North Tripura \n**618** : Sepahijala \n**619** : South Tripura \n**620** : Unakoti \n**621** : West Tripura")

module.exports.district[34] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Uttar Pradesh","**622** : Agra \n**623** : Aligarh \n**625** : Ambedkar Nagar \n**626** : Amethi \n**627** : Amroha \n**628** : Auraiya \n**646** : Ayodhya \n**629** : Azamgarh \n**630** : Badaun \n**631** : Baghpat \n**632** : Bahraich \n**633** : Balarampur \n**634** : Ballia \n**635** : Banda \n**636** : Barabanki \n**637** : Bareilly \n**638** : Basti \n**687** : Bhadohi \n**639** : Bijnour \n**640** : Bulandshahr \n**641** : Chandauli \n**642** : Chitrakoot \n**643** : Deoria \n**644** : Etah \n**645** : Etawah \n**647** : Farrukhabad \n**648** : Fatehpur \n**649** : Firozabad \n**650** : Gautam Buddha Nagar \n**651** : Ghaziabad \n**652** : Ghazipur \n**653** : Gonda \n**654** : Gorakhpur \n**655** : Hamirpur \n**656** : Hapur \n**657** : Hardoi \n**658** : Hathras \n**659** : Jalaun \n**660** : Jaunpur \n**661** : Jhansi \n**662** : Kannauj \n**663** : Kanpur Dehat \n**664** : Kanpur Nagar \n**665** : Kasganj \n**666** : Kaushambi \n**667** : Kushinagar \n**668** : Lakhimpur Kheri \n**669** : Lalitpur \n**670** : Lucknow \n**671** : Maharajganj \n**672** : Mahoba \n**673** : Mainpuri \n**674** : Mathura \n**675** : Mau \n**676** : Meerut \n**677** : Mirzapur \n**678** : Moradabad \n**679** : Muzaffarnagar \n**680** : Pilibhit \n**682** : Pratapgarh \n**624** : Prayagraj \n**681** : Raebareli \n**683** : Rampur \n**684** : Saharanpur \n**685** : Sambhal \n**686** : Sant Kabir Nagar \n**688** : Shahjahanpur \n**689** : Shamli \n**690** : Shravasti \n**691** : Siddharthnagar \n**692** : Sitapur \n**693** : Sonbhadra \n**694** : Sultanpur \n**695** : Unnao \n**696** : Varanasi")

module.exports.district[35] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Uttarakhand","**704** : Almora \n**707** : Bageshwar \n**699** : Chamoli \n**708** : Champawat \n**697** : Dehradun \n**702** : Haridwar \n**709** : Nainital \n**698** : Pauri Garhwal \n**706** : Pithoragarh \n**700** : Rudraprayag \n**701** : Tehri Garhwal \n**705** : Udham Singh Nagar \n**703** : Uttarkashi")

module.exports.district[36] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("West Bengal","**710** : Alipurduar District \n**711** : Bankura \n**712** : Basirhat HD (North 24 Parganas) \n**713** : Birbhum \n**714** : Bishnupur HD (Bankura) \n**715** : Cooch Behar \n**783** : COOCHBEHAR \n**716** : Dakshin Dinajpur \n**717** : Darjeeling \n**718** : Diamond Harbor HD (S 24 Parganas) \n**719** : East Bardhaman \n**720** : Hoogly \n**721** : Howrah \n**722** : Jalpaiguri \n**723** : Jhargram \n**724** : Kalimpong \n**725** : Kolkata \n**726** : Malda \n**727** : Murshidabad \n**728** : Nadia \n**729** : Nandigram HD (East Medinipore) \n**730** : North 24 Parganas \n**731** : Paschim Medinipore \n**732** : Purba Medinipore \n**733** : Purulia \n**734** : Rampurhat HD (Birbhum) \n**735** : South 24 Parganas \n**736** : Uttar Dinajpur \n**737** : West Bardhaman")

module.exports.district[37] = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Districts List')
	.addField("Daman and Diu","**138** : Daman \n**139** : Diu")