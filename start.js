/*[-- require --]*/
const { 
	WAConnection,
	MessageType
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { image } = MessageType
const waifu = require('./waifu')
const welcome = require('./lib/welcome')
const { banner } = require('./lib/functions')
const { color } = require('./lib/color')
const moment = require("moment-timezone")

const client = new WAConnection()
const time = moment.tz('Asia/Jakarta').format("HH:mm:ss")

/*[-- first auth --]*/
async function auth() {
client.logger.level = 'warn'
console.log(banner.string)
client.on('qr', qr => {
   console.log(color(time,"white"),color('[','white'),color('∆','red'),color(']','white'),color('Subscribete','white'),color('YOU','red'),color('TUBE','white'),color('Confu_Mods','yellow'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
client.on('connecting', () => {
	console.log(color(time,"white"),color("[ESTADO]","green"), "Conectando xd...")
})
client.on('open', () => {
	console.log(color(time,"white"),color("[ESTADO]", "green"), "Conectado :3")
})
await client.connect({timeoutMs: 30*1000})
fs.writeFileSync('./session.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
}
/*[-- function --]*/
async function start(){
	client.on('group-participants-update', async (mem) => {
		await welcome(client, mem , image)
	})
	client.on('chat-update', async (mek) => {
		await waifu(client , mek)
	})
}

auth()
start()
				
	