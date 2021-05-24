
const {
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
    processTime,
    Browser
} = require('@adiwajshing/baileys');
const moment = require("moment-timezone") 
const fs = require("fs") 
const util = require('util')
const fetch = require('node-fetch')
const speed = require('performance-now')
const Exif = require('./exif.js')
const exif = new Exif()
const os = require('os')
const imageToBase64 = require('image-to-base64')
const axios = require('axios')
const { color, bgcolor } = require('./lib/color')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { exec, spawn } = require("child_process")
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const ms = require('parse-ms')
const toMs = require('ms')
const path = require('path')
const cd = 4.32e+7
const { ind } = require('./language')

const settingan = JSON.parse(fs.readFileSync('./admin/set.json'))
const {
	limitawal,
	memberlimit,
	cr,
	BotPrefix,
	author,
	pack
} = settingan
const ownerNumber = ["593992826085@s.whatsapp.net","51923568749@s.whatsapp.net"]

prefix = "/"
blocked = []   


const {
	getLevelingXp,
	getLevelingLevel,
	getLevelingId,
	addLevelingXp,
	addLevelingLevel,
	addLevelingId
} = require('./lib/level.js')


const {
	getRegisteredRandomId,
	addRegisteredUser,
	createSerial,
	checkRegisteredUser
} = require('./lib/register.js')

/*[-> ATM & Limit <-]*/
const {
	addATM,
	addKoinUser,
	checkATMuser,
	bayarLimit,
	confirmATM,
	limitAdd
} = require('./lib/limitatm.js')

/*[-> afk <-]*/
const {
	addAfkUser,
    checkAfkUser,
    getAfkReason,
    getAfkTime,
    getAfkId,
    getAfkPosition,
    afkDel
} = require('./lib/afk.js')

/*[-> total cmd <-]*/
const {
	cmdadd
} = require('./lib/totalcmd.js')
	
/*[-- VCARD --]*/
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:𝑪𝒐𝒏𝒇𝒖𝒔𝒊𝒐𝒏\n' 
            + 'ORG:𝑊𝑎𝑖𝑓𝑢-𝐵𝑜𝑡;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=51923568749:+51923568749\n' 
            + 'END:VCARD' 
       
/*[-- load file --]*/
const setiker = JSON.parse(fs.readFileSync('./strg/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./strg/video.json'))
const audionye = JSON.parse(fs.readFileSync('./strg/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./strg/image.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const welkom = JSON.parse(fs.readFileSync('./database/bot/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/bot/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./database/bot/simi.json'))
const event = JSON.parse(fs.readFileSync('./database/bot/event.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const bad = JSON.parse(fs.readFileSync('./database/group/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/group/badword.json'))

/*[-- function --]*/
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

function addMetadata(packname, author) {	
	if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
	author = author.replace(/[^a-zA-Z0-9]/g, '');	
	let name = `${author}_${packname}`
	if (fs.existsSync(`./${name}.exif`)) return `./${name}.exif`
	const json = {	
		"sticker-pack-name": packname,
		"sticker-pack-publisher": author,
	}
	const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
	const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

	let len = JSON.stringify(json).length	
	let last	

	if (len > 256) {	
		len = len - 256	
		bytes.unshift(0x01)	
	} else {	
		bytes.unshift(0x00)	
	}	

	if (len < 16) {	
		last = len.toString(16)	
		last = "0" + len	
	} else {	
		last = len.toString(16)	
	}	

	const buf2 = Buffer.from(last, "hex")	
	const buf3 = Buffer.from(bytes)	
	const buf4 = Buffer.from(JSON.stringify(json))	

	const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

	fs.writeFile(`./${name}.exif`, buffer, (err) => {	
		return `./${name}.exif`	
	})	

} 
	
	

	/*[-- Update Message --]*/
module.exports = msgHdlr = async (client , mek) => {
	/*[-- Update block --]*/
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
		try {
             if (!mek.hasNewMessage) return
            mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
            global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const timi = moment.tz('Asia/Jakarta').add(30, 'days').calendar();
			const timu = moment.tz('Asia/Jakarta').add(20, 'days').calendar();
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = client.user.jid
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            
            /*[-- Scure command --]*/
            const isEventon = isGroup ? event.includes(from) : false
            const isRegistered = checkRegisteredUser(sender)
            const isBadWord = isGroup ? badword.includes(from) : false
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isAfkOn = checkAfkUser(sender)
			const isAntiLink = isGroup ? antilink.includes(from) : false
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const sendImage = (teks) => {
		    client.sendMessage(from, teks, image, {quoted:mek})
		    }
		    const costum = (pesan, tipe, target, target2) => {
			client.sendMessage(from, pesan, tipe, { contextInfo: { forwardingScore: 400, isForwarded: true } , quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) },message: { conversation: `${target2}` }}})
			}
			const costumimg = ( pesan , tipe, target , caption) => {
			client.sendMessage(from, pesan , tipe , {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: {"imageMessage":{url: 'https://mmg.whatsapp.net/d/f/Ahj0ACnTjSHHm6-HjqAUBYiCu2-85zMZp_-EhiXlsd6A.enc',mimetype: 'image/jpeg',caption: `${caption}`,fileSha256: '0Pk0qJyQFn9FCtslZrydJHRQDKryjYcdP7I3CmRrHRs=',fileLength: '20696',height: 360,width: 382,mediaKey: 'N43d/3GY7GYQpgBymb9qFY5O9iNDXuBirXsNZk+X61I=',fileEncSha256: 'IdFM58vy8URV+IUmOqAY3OZsvCN6Px8gaJlRCElqhd4=',directPath: '/v/t62.7118-24/35174026_475909656741093_8174708112574209693_n.enc?oh=2a690b130cf8f912a9ca35f366558743&oe=6061F0C6',mediaKeyTimestamp: '1614240917',jpegThumbnail: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMASAMBIgACEQEDEQH/xAAwAAADAAMBAAAAAAAAAAAAAAAABAUBAwYCAQADAQEAAAAAAAAAAAAAAAABAgMABP/aAAwDAQACEAMQAAAAoy6kcWS2eH8miq17B553Thh1BgyTY9iULYfndGBmbSwNEV3eWXpjwZElG09WJckXCj8sWBVc1ZKXj2ZYaoWHnc67K3PbKwtZOqzLrzdQAg5fWFRUeCNTQG2pEKJ0wCD/xAAoEAACAgIBAQkAAwEAAAAAAAABAgADBBEScQUQEyEiMTJBYSNRYmP/2gAIAQEAAT8AaZzfEdwWcGMTE1jNv3M1ozDb+SD2jTO+Yigk6A3KqhseIdfkroTYbXQRrkVuJOplKEuOpjtpxF+IjTO+YnZoBvj4pa/msHtMnHZrgymZ6hCnSJsDl+ys7rTpGmevxMwLFS/1fcA7iNzPsDXaH1NccYH+2lJ1SnSNMlOdcbY6iYGa9g4OJzXW9zI7SBJrpjqxsA9zMkcMetf2V7NKD/McgAkxsis7EcA2fkxkqSkaYbMGRu3hr0x6q6ckufaUMpsexj0ma4Y0qDKhqlektyntXiQO4qWI0PONVZWNsNTmZwewekEwo1fpYaMZdvWf2DYrXoO/ARWLNL6VuXiYcSsuK9eXGYtHhM/nsTPVQgb7iDkydRCNBYYx1Ozj6nmSStRIgJ8UH/nMJiTZs/c7RPwExhu+vrH+p//EAB4RAAIBBAMBAAAAAAAAAAAAAAABAhAREjIhMDFC/9oACAECAQE/AOpJsxEqIj4TfNqXygIWpLc+ZEdBH//EAB4RAAICAgIDAAAAAAAAAAAAAAABAjEQETJBAxJx/9oACAEDAQE/AHWVeHQtYrDaNkno7GOzxP10xzWipDHZHidx+EuQz//Z',scansSidecar: 'choizTOCOFXo21QcOR/IlCehTFztHGnB3xo4F4d/kwmxSJJIbMmvxg==',scanLengths: [Array],midQualityFileSha256: '68OHK4IyhiKDNgNAZ3SoXsngzYENebQkV4b/RwhhYIY=',midQualityFileEncSha256: '2EYOLCXx+aqg9RyP6xJYChQNbEjXZmc0EcSwHzoyXx0='}}}})
			}
	    


			/*[-- function level bar --]*/
			var per = '*[▒▒▒▒▒▒▒▒▒▒] 0%*'
			const peri = 50 * (Math.pow(2, getLevelingLevel(sender)) - 1)
			const perl = peri-getLevelingXp(sender) 
			const resl = Math.round(100-((perl/getLevelingXp(sender))*100))
			if (resl <= 10) {
				per = `*[█▒▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 20) {
				per = `*[██▒▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 30) {
				per = `*[███▒▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 40) {
				per = `*[████▒▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 50) {
				per = `*[█████▒▒▒▒▒] ${resl}%*`
			} else if (resl <= 60) {
				per = `*[██████▒▒▒▒] ${resl}%*`
			} else if (resl <= 70) {
				per = `*[███████▒▒▒] ${resl}%*`
			} else if (resl <= 80) {
				per = `*[████████▒▒] ${resl}%*`
			} else if (resl <= 90) {
				per = `*[█████████▒] ${resl}%*`
			} else if (resl <= 100) {
				per = `*[██████████] ${resl}%*`
			} 
				
				
			
			
			/*[-- function rank --]*/
			const levelRole = getLevelingLevel(sender)
   	       var role = 'Dicipulo'
        if (levelRole <= 2) {
            role = 'Dicipulo'
        } else if (levelRole <= 4) {
            role = 'Dicipulo Dia 1 ⚊¹'
        } else if (levelRole <= 6) {
            role = 'Dicipulo Dia 2 ⚊²'
        } else if (levelRole <= 8) {
            role = 'Dicipulo Dia 3 ⚊³'
        } else if (levelRole <= 10) {
            role = 'Dicipulo Dia 4 ⚊⁴'
        } else if (levelRole <= 12) {
            role = 'Avanzado mes 1 ⚌¹'
        } else if (levelRole <= 14) {
            role = 'Avanzado mes 2 ⚌²'
        } else if (levelRole <= 16) {
            role = 'Avanzado mes 3 ⚌³'
        } else if (levelRole <= 18) {
            role = 'Avanzado mes 4 ⚌⁴'
        } else if (levelRole <= 20) {
            role = 'Avanzado mes 5 ⚌⁵'
        } else if (levelRole <= 22) {
            role = 'Aventurero novato dia 1 ☰¹'
        } else if (levelRole <= 24) {
            role = 'Aventurero novato dia 2 ☰²'
        } else if (levelRole <= 26) {
            role = 'Aventurero novato dia 3 ☰³'
        } else if (levelRole <= 28) {
            role = 'Aventurero novato dia 4 ☰⁴'
        } else if (levelRole <= 30) {
            role = 'Aventurero novato dia 5 ☰⁵'
        } else if (levelRole <= 32) {
            role = 'Aventurero experimentado año 1 ≣¹'
        } else if (levelRole <= 34) {
            role = 'Aventurero experimentado año 2 ≣²'
        } else if (levelRole <= 36) {
            role = 'Aventurero experimentado año 3 ≣³'
        } else if (levelRole <= 38) {
            role = 'Aventurero experimentado año 4 ≣⁴'
        } else if (levelRole <= 40) {
            role = 'Aventurero experimentado año 5 ≣⁵'
        } else if (levelRole <= 42) {
            role = 'Aventurero profesional año 1 ﹀¹'
        } else if (levelRole <= 44) {
            role = 'Aventurero profesional año 2 ﹀²'
        } else if (levelRole <= 46) {
            role = 'Aventurero profesional año 3 ﹀³'
        } else if (levelRole <= 48) {
            role = 'Aventurero profesional año 4 ﹀⁴'
        } else if (levelRole <= 50) {
            role = 'Aventurero profesional año 5 ﹀⁵'
        } else if (levelRole <= 52) {
            role = 'Maestro mes 1 ︾¹'
        } else if (levelRole <= 54) {
            role = 'Maestro mes 2 ︾²'
        } else if (levelRole <= 56) {
            role = 'Maestro mes 3 ︾³'
        } else if (levelRole <= 58) {
            role = 'Maestro mes 4 ︾⁴'
        } else if (levelRole <= 60) {
            role = 'Maestro mes 5 ︾⁵'
        } else if (levelRole <= 62) {
            role = 'Elite mes 1 ♢¹ '
        } else if (levelRole <= 64) {
            role = 'Elite mes 2 ♢²'
        } else if (levelRole <= 66) {
            role = 'Elite mes 3 ♢³'
        } else if (levelRole <= 68) {
            role = 'Elite mes 4 ♢⁴'
        } else if (levelRole <= 70) {
            role = 'Elite mes 5 ♢⁵'
        } else if (levelRole <= 72) {
            role = 'Elite año 1 ♢♢¹'
        } else if (levelRole <= 74) {
            role = 'Elite año 2 ♢♢²'
        } else if (levelRole <= 76) {
            role = 'Elite año 3 ♢♢³'
        } else if (levelRole <= 78) {
            role = 'Elite año 4 ♢♢⁴'
        } else if (levelRole <= 80) {
            role = 'Elite año 5 ♢♢⁵'
        } else if (levelRole <= 82) {
            role = 'Elite de la elite dia 1 ✷¹'
        } else if (levelRole <= 84) {
            role = 'Elite de la elite dia 2 ✷²'
        } else if (levelRole <= 86) {
            role = 'Elite de la elite dia 3 ✷³'
        } else if (levelRole <= 88) {
            role = 'Elite de la elite dia 4 ✷⁴'
        } else if (levelRole <= 90) {
            role = 'Elite de la elite dia 5 ✷⁵'
        } else if (levelRole <= 92) {
            role = 'Escolta dia 1 ✷✷¹'
        } else if (levelRole <= 94) {
            role = 'Escolta dia 2 ✷✷²'
        } else if (levelRole <= 96) {
            role = 'Escolta dia 3 ✷✷³'
        } else if (levelRole <= 98) {
            role = 'Escolta dia 4 ✷✷⁴'
        } else if (levelRole <= 100) {
            role = 'Escolta dia 5 ✷✷⁵'
        } else if (levelRole <= 102) {                   
            role = 'Leyenda I 忍'
        } else if (levelRole <= 154) {
            role = 'Leyenda I 忍'
        } else if (levelRole <= 156) {
            role = 'Leyenda I 忍'
        } else if (levelRole <= 158) {
            role = 'Leyenda I 忍'
        } else if (levelRole <= 160) {
            role = 'Leyenda I 忍'
        } else if (levelRole <= 162) {
            role = 'Leyenda I 忍'
        } else if (levelRole <= 164) {
            role = 'Leyenda I 忍'
        } else if (levelRole <= 166) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 168) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 170) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 172) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 174) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 176) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 178) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 180) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 182) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 184) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 186) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 188) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 190) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 192) {
            role = 'Leyenda I 忍'
        } else if (levelRole <= 194) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 196) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 198) {
            role = 'Leyenda II 忍'
        } else if (levelRole <= 200) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 210) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 220) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 230) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 240) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 250) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 260) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 270) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 280) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 290) {
            role = 'Leyenda III 忍'
        } else if (levelRole <= 300) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 310) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 320) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 330) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 340) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 350) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 360) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 370) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 380) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 390) {
            role = 'Leyenda IV 忍'
        } else if (levelRole <= 400) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 410) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 420) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 430) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 440) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 450) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 460) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 470) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 480) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 490) {
            role = 'Leyenda V 忍'
        } else if (levelRole <= 500) {
            role = 'Leyenda VI 忍'
        } else if (levelRole <= 666) {
            role = 'Leyenda VII 忍'
        } else if (levelRole <= 700) {
            role = 'Leyenda VIII 忍'
        } else if (levelRole <= 800) {
            role = 'Leyenda IX 忍'
        } else if (levelRole <= 900) {
            role = 'Leyenda X 忍'
        } else if (levelRole <= 1000) {
            role = 'Mythic I 上帝'
        } else if (levelRole <= 2000) {
            role = 'Mythic II 上帝'
        } else if (levelRole <= 3000) {
            role = 'Mythic III 上帝'
        } else if (levelRole <= 4000) {
            role = 'Mythic IV 上帝'
        } else if (levelRole <= 5000) {
            role = 'Mythic V 上帝'
        } else if (levelRole <= 6000) {
            role = 'Mythical Glory 上帝'
        } else if (levelRole <= 7000) {
            role = 'Mythical Glory x1000帝'
        } else if (levelRole <= 8000) {
            role = 'Mythical Glory 1100 上帝'
        } else if (levelRole <= 9000) {
            role = 'Mythical Glory 2000 上帝'
        } else if (levelRole <= 10000) {
            role = 'Despertar Mythical Glory 特尔邦贡'
	    } else if (levelRole <= 66666666) {
   	         role = 'MATA DIOSES❗'
   	     }
   		 
				
				
	        /*[-- function Level --]*/
            if (isGroup && isRegistered && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 500 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    bayarLimit(sender, 3)
                     addKoinUser(sender, 20)
                    await reply(ind.levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role))            
 	               
 	              
	               
 
                  }
            } catch (err) {
                console.error(err)
            }
        }
         

          /*[-- function check limit --]*/
          const checkLimit = (sender) => {
          	let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            let limitCounts = limitawal - lmt.limit
                            if (limitCounts <= 0) return client.sendMessage(from,`Su límite de solicitudes ha expirado`, text,{ quoted: mek})
                            client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 0 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                        client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                    }
				} 
		
			/*[-- limit end --]*/
            const isLimit = (sender) =>{ 
          	if (isOwner ) {return false;}
		      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
              	let limits = i.limit
              if (limits >= limitawal ) {
              	  position = true
                    client.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
                    return true
              } else {
              	_limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
           	const obj = { id: sender, limit: 0 }
                _limit.push(obj)
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
           return false
     	  }
     	}
     	   
     	   /*[-- auto out form gc if member under limit --]*/
 	       if (isGroup) {
				try {
					const getmemex = groupMembers.length	
				    if (getmemex <= memberlimit) {
					reply(`lo siento, los miembros del grupo no han cumplido con los requisitos. miembros mínimos deben ser ${memberlimit}`)					
 	                           client.groupLeave(from) 			  
							client.updatePresence(from, Presence.composing)						
				    }
		       } catch (err) { console.error(err)  }
 	       }
 
 		   				/*[-- function antilink --]*/
				if (messagesC.includes("://chat.whatsapp.com/")){
					if (!isGroup) return
					if (!isAntiLink) return
					if (isGroupAdmins) return reply('Eres un administrador de grupo, No te eliminaré')
					client.updatePresence(from, Presence.composing)				
					var kic = `${sender.split("@")[0]}@s.whatsapp.net`						
						client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
								}
 	       
 	       
 	  		   if (budy.includes(`@18156806165`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}
	
	 if (budy.includes(`B闦R闦I闦G闦A闦D闦`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}
 if (budy.includes(`~@`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}
					 if (budy.includes(`saur.com`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}

					//v
					
	if (budy.includes(`~*@555484137179*~`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}				
					
					
	if (budy.includes(`19565244699`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}			
					
		if (budy.includes(`SUSHANT.`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
					
					
	
		
	if (budy.includes(`Mosca_Virus`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
	if (budy.includes(`ɩȿạɩɾ.com`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
			
	if (budy.includes(`www.instagram.com/p/CE0pVKZs5Wk/?igshid=5ihhd4xdsgrh`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
	if (budy.includes(`www.xnxx.com/`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
	if (budy.includes(`🔴`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
	if (budy.includes(`Mosca_Virus`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
	if (budy.includes(`Mosca_Virus`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
	if (budy.includes(`Mosca_Virus`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
	if (budy.includes(`Mosca_Virus`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
						
			if (budy.includes(`chat.whatsapp.com/K2vyQpkxfT2Eh63O55L0B8@hird_fekalinos:👿👿👿𒀱☹️𒀱𒀱𒀱⃢⃢⃢𒀱𒀱⃢⃢⃢𒀱𒀱⃢⃢⃢𒀱𒀱⃢𒀱☹️𒀱💝🤔𒀱𒀱⃢z𒀱🅱️𒀱𒀱⃢𒀱⃢🇬🇧𒀱⃢⃢⃢👾⃠⃤𒀱⃠⃤𒀱𒂭𒂭𒇫𒇫𒇫𒇫⃢⃢:👺🤡̵̛͔͍̱͙̥͔̯͖̥͙̲͆ͬ̊̑̔̂🥰:👿👿👿👿𒀱☹️𒀱𒀱𒀱⃢⃢⃢𒀱✖❌✖❌✖❌✖❌❌✖❌✖❌✖❌✖❌❌🔱❌❌❌❌✳✳❕❕❗✴✴✴✴✴✴✴✴❗〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️💔❔❔❔❔⚫▪️➿💮💮🕐🕟🕔🔕⭕💯`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
					if (budy.includes(`⃟ᡃ⃟ᡃ⃟ᡃ⃟`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
						
										
				if (budy.includes(`ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
									
														
																		if (budy.includes(`৯৯৯৯`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		if (budy.includes(`100030449499276`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		if (budy.includes(`xn--hatsapp-rh4c.com/free-tickets‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎‏‎`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		if (budy.includes(`Wa.me/559891312574`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		if (budy.includes(`www.instagram.com/p/CE6f8afF85G/?igshid=4p33q69wr89q`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		if (budy.includes(`JXgH0fuabFR5VijfrdwyxY`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
	
			if (budy.includes(`images.app.goo.gl/d3sU6Z6hgbVmPwx79`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
	
			if (budy.includes(`www.instagram.com/p/CE0pVKZs5Wk/?igshid=5ihhd4xdsgrh`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		
		if (budy.includes(`www.instagram.com/p/CE9OsNblDcq`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		
				if (budy.includes(`www.facebook.com/mohamed.faslan.121772`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
		
			
					if (budy.includes(`ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝‎ᡃ⃟‎ᡃ⃝`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
					
	//vvv
		if (budy.includes(`pinterest.com/detetive`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		

		if (budy.includes(`lol.davizinmaker.ml/nagazap`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		

		if (budy.includes(`www.instagram.com/p/CMx2kO9pnW-/?utm_source=ig_web_copy_link`)) {
		if (!isGroup) return
			client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}		
			
					
					
		  
	if (budy.includes(`ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ`)) {
		if (!isGroup) return
		client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}	     
		        
		              
		         if (budy.includes(`🆇҉⃟⃢🅲҉⃟⃢🅻҉⃟⃢`)) {
		if (!isGroup) return
		client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}

		       	
if	 (budy.includes(`www.instagram.com/p/CE0pVKZs5Wk/?igshid=5ihhd4xdsgrh🅻҉⃟⃢🅸҉⃟⃢🅽҉⃟⃢🆄҉⃟⃢🆇҉⃟⃢🅲҉⃟⃢🅻҉⃟⃢🅰҉⃟⃢🅽҉⃟⃢tratrav🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯🔯`)) {
		if (!isGroup) return
		client.updatePresence(from, Presence.composing)
		var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		client.groupRemove(from, [Kick]).catch((e) => {reply(`*ERROR:* ${e}`)}) 
					}       	          			   			
     
 	     
 	           /*[-- function money --]*/
 	           if (isRegistered ) {
 	           const checkATM = checkATMuser(sender)	     
	        }
	
			 //feature total command
			 if (isCmd) cmdadd()
           	
             //kolor
			colors = ['red','white','black','blue','yellow','green']
			
			//detector media
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			//private chat message
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			//group message
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) { 
			
																	
				//daftar 
				case 'daftar':
                if (isRegistered) return  reply(ind.rediregis())
                if (!q.includes('|')) return  reply(ind.wrongf())
                const namaUser = q.substring(0, q.indexOf('|') - 0)
                const umurUser = q.substring(q.lastIndexOf('|') + 1)
                const serialUser = createSerial(20)
                if(isNaN(umurUser)) return await reply('La edad debe ser un número!!')
                if (namaUser.length >= 30) return reply(`¿Por qué tu nombre es tan largo? Es un nombre o un tren xd`)
                if (umurUser > 40) return reply(`tu edad es demasiado mayor, máximo 40 años`)
                if (umurUser < 12) return reply(`su edad es demasiado joven mínimo 12 años`)
                try {
					ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
					daftarimg = await getBuffer(ppimg)
                veri = sender
                if (isGroup) {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await client.sendMessage(from, daftarimg, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
                    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
                } else {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await client.sendMessage(from, daftarimg, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
                    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                }
				break
				
							case 'pinkg':
          		if (!isRegistered) return reply(ind.noregis())
           		 await client.sendMessage(from, `Pong!!!!\nVelocidad: ${processTime(time, moment())} _Second_`)
					break
					      case 'speed':
                case 'ping':
                
                const timestamp = speed();
                const latensi = speed() - timestamp 
                client.sendMessage(from, `Velocidad: ${latensi.toFixed(4)} _Por segundo_`, text, { quoted: mek})
                    break
              
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nombre de el bot* : ${me.name}\n*Creador* : *Confu*\n*AUTHORA* : May Chan~\n*Numero de el Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
								break
				case 'admin':
         	   case 'owner':
         	   case 'creator':
         	   case 'creador':
         	   case 'creadores':
                  client.sendMessage(from, {displayname: "Confu", vcard: vcard}, MessageType.contact, { quoted: mek})
                            client.sendMessage(from, 'El es mi creador 🥵 re secsi ᕙ( : ˘ ∧ ˘ : )ᕗ',MessageType.text, { quoted: mek} )
					break    
				case 'leaderboard':
				case 'lb':
				bo = args[0]
				_level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
				uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
                let leaderboardlvl = '-----[ *NIVEL DE LIDERAZGO* ]----\n\n'
                let leaderboarduang = '-----[ *TABLA DE MILLONARIOS* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboardlvl += `*[${nom}]* wa.me/${_level[i].id.replace('@s.whatsapp.net', '')}\n┗⊱ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n`
                        leaderboarduang += `*[${nom}]* wa.me/${uang[i].id.replace('@s.whatsapp.net', '')}\n┣⊱ *Dinero*: _Rp${uang[i].uang}_\n┗⊱ *Limit*: ${limitawal - _limit[i].limit}\n`
                    }
                    await reply(leaderboardlvl)
                    await reply(leaderboarduang)
                } catch (err) {
                    console.error(err)
                    await reply(`usuario mínimo de  para poder acceder a la base de datos`)
                }
				break
				case 'limit':
				   if (!isRegistered) return reply(ind.noregis())
				   checkLimit(sender)
					break 
				case 'giftlimit': 
				if (!isOwner) return reply(ind.ownerb())
				const nomerr = args[0].replace('@','')
                const jmla = args[1]
                if (jmla <= 1) return reply(`el límite mínimo de regalos es 1`)
                if (isNaN(jmla)) return reply(`el límite debe ser un número`)
                if (!nomerr) return reply(`lo siento formato incorrecto \ningrese el parámetro correcto\nEjemplo : ${prefix}giftlimit @593992826085 20`)
                const cysz = nomerr + '@s.whatsapp.net'
                var found = false
                        Object.keys(_limit).forEach((i) => {
                            if(_limit[i].id === cysz){
                                found = i
                            }
                        })
                        if (found !== false) {
                            _limit[found].limit -= jmla
                            const updated = _limit[found]
                            const result = `El límite de la cuota de regalos fue exitoso con SN: ${createSerial(8)} en ${moment().format('DD/MM/YY HH:mm:ss')}
*「 LÍMITE DE LA CUOTA DE REGALOS 」*

• Usuario : @${updated.id.replace('@s.whatsapp.net','')}
• Limit: ${limitawal-updated.limit}`
                            console.log(_limit[found])
                            fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit));
                            reply(result)
                        } else {
                                reply(`Lo sentimos, el número ${nomerr} no está registrado en la base de datos.!`)
                        }
                break
            break
				case 'transfer':
				case 'trasferir':
				if (!isRegistered) return reply(ind.noregis())
				if (!q.includes('|')) return  reply(ind.wrongf())
                const tujuan = q.substring(0, q.indexOf('|') - 1)
                const jumblah = q.substring(q.lastIndexOf('|') + 1)
                if(isNaN(jumblah)) return await reply('la cantidad debe ser un número!!')
                if (jumblah < 100 ) return reply(`transferencia mínima 100`)
                if (checkATMuser(sender) < jumblah) return reply(`No tienes suficiente dinero para realizar la transferencia`)
                const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
                fee = 0.005 *  jumblah
                hasiltf = jumblah - fee
                addKoinUser(tujuantf, hasiltf)
                confirmATM(sender, jumblah)
                addKoinUser('+593992826085@s.whatsapp.net', fee)
                reply(`*「 ÉXITO 」*\n\nla transferencia de dinero ha sido exitosa\nde : +${sender.split("@")[0]}\n a : +${tujuan}\nmonto de la transferencia : ${jumblah}\nimpuesto : ${fee}%`)
                break
			
				case 'cartera':
				case 'catera':
				case 'cartea':
				case 'cartra':
				if (!isRegistered) return reply(ind.noregis())
				const kantong = checkATMuser(sender)
				reply(ind.uangkau(pushname, sender, kantong))
				break
				case 'buylimit':
				if (!isRegistered) return reply(ind.noregis())
				payout = body.slice(10)
				if(isNaN(payout)) return await reply('el límite debe ser un número!!')
				const koinPerlimit = 30
				const total = koinPerlimit * payout
				if ( checkATMuser(sender) <= total) return reply(`lo siento, tu dinero no es suficiente. recoger y comprar más tarde`)
				if ( checkATMuser(sender) >= total ) {
					confirmATM(sender, total)
					bayarLimit(sender, payout)
					await reply(`*「 PAGO EXITOSO 」*\n\n*remitente* : Admin\n*receptor* : ${pushname}\n*compra nominal* : ${payout} \n*precio límite* : ${koinPerlimit}/limit\n*el resto de tu dinero* : ${checkATMuser(sender)}\n\nel proceso es exitoso con el número de pago\n${createSerial(15)}`)
				} 
				break
				
case 'stickerwm':
						  	case 'stikerwm':
						  	case 'sticker':
						  	case 's':
						  	case 'stiker':
						  	case 'stike':
						  	case 'sticke':
						  	case 'stikewm':
						  	case 'stikr':
						  	case 'stker':						  
				if (isMedia && !mek.message.videoMessage || isQuotedImage) {
					var arg2 = args.join('')
					if (!arg2.includes('|')) return reply(`*Debes poner asi:*\n\n*#sticker Author|Nombre*\n\n*Ejemplo*\n\n*#sticker Confu|Waifu*`)
					const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await client.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
					const packname1 = arg2.split('|')[0]
					const author1 = arg2.split('|')[1]
					exif.create(packname1, author1, `confu_${sender}`)
					await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply('*eror ):*')
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./trash/confu_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
									if (error) return reply('*eror ):*')
									client.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)
									fs.unlinkSync(media)	
									fs.unlinkSync(`./trash/${sender}.webp`)	
									fs.unlinkSync(`./trash/confu_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./trash/${sender}.webp`)
				} else if ((isMedia && mek.message.videoMessage.fileLength < 10000000 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
					var arg2 = args.join('')
					if (!arg2.includes('|')) return reply(`*Debes poner asi:*\n\n*#sticker Author|Nombre*\n*Ejemplo*\n\n*#sticker Confu|Waifu*`)
					const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
					const media = await client.downloadAndSaveMediaMessage(encmedia, `./trash/${sender}`)
					const packname1 = arg2.split('|')[0]
					const author1 = arg2.split('|')[1]
					exif.create(packname1, author1, `confu_${sender}`)
					reply(ind.wait())
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply('*Ocurio un error :u*')
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./trash/confu_${sender}.exif ./trash/${sender}.webp -o ./trash/${sender}.webp`, async (error) => {
									if (error) return reply('eror')
									client.sendMessage(from, fs.readFileSync(`./trash/${sender}.webp`), sticker)									
									fs.unlinkSync(media)
									fs.unlinkSync(`./trash/${sender}.webp`)
									fs.unlinkSync(`./trash/confu_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./trash/${sender}.webp`)
			} else {
			reply(`Envia una foto o un video con subtitulo ${prefix}sticker nombre|autor\n\n O bien puedes etiquetar una imagen o video que ya alla sido enviado\n\nNota: Si es un video la duración máxima tiene que ser de 10 segundos`)
			}
		    break          	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          									       	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          									       	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          														            									           	          									
				case 'tts':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return client.sendMessage(from, '¡Se requiere código de idioma!', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Y el texto?', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Es Demasiado largo')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buffer = fs.readFileSync(rano)
							if (err) return reply('Error :( ')
							client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					await limitAdd(sender)
				break
				case 'level':
                if (!isRegistered) return reply(ind.noregis())
                if (!isLevelingOn) return reply(ind.lvlnoon())
                if (!isGroup) return reply(ind.groupo())
                const userLevel = getLevelingLevel(sender)
                const userXp = getLevelingXp(sender)
                if (userLevel === undefined && userXp === undefined) return reply(ind.lvlnul())
                const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
                resul = `┏━━❉ *LEVEL* ❉━━\n┣⊱ *Nombre* : ${pushname}\n┣⊱ Numero : wa.me/${sender.split("@")[0]}\n┣⊱ User XP :  ${userXp}/${requiredXp}\n┣⊱ User Level : ${userLevel}\n┗━━━━━━━━━━━━`
                costum(resul, text, tescuk, per)
				break 
				case 'mining':
				case 'minar':
                      if (!isRegistered) return reply(ind.noregis())
                      if (isLimit(sender)) return reply(ind.limitend(pushname))
                      if (!isEventon) return reply(`Lo siento ${pushname} El propietario no activo la minería de eventos`)
                      if (isOwner) {
                      const one = 999999999
                      addLevelingXp(sender, one)
                      addLevelingLevel(sender, 99)
                      reply(`porque eres mi propietariom... enviando ${one}Xp para ti`)
                      }else{
                      const mining = Math.ceil(Math.random() * 10000)
                      addLevelingXp(sender, mining)
                      await reply(`*felicitaciones* ${pushname} usted obtiene *${mining}Xp*`)
                      }
                    await limitAdd(sender)
					break
				case 'grup':
				case 'group':
				case 'grupo':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'abrir') {
					    reply(`*APERTURA EXITOSA DEL GRUPO*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'cerrar') {
						reply(`*CIERRE EXITOSO DEL GRUPO`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
				break      
				           case 'demote':
				           case 'quitar':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Etiqueta un admin!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*tu posición es eliminada*🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`@${mentioned[0].split('@')[0]} Ya no eres administrador`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
				case 'dar':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Etiqueta!!!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Felicidades Ahora eres admin!!! (+_+) :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Felicidades🥳 @${mentioned[0].split('@')[0]} *Ahora eres administrador (+_+)`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'kick':
			     	case 'eliminar':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Etiqueta!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `ok bye🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Bye bye@${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
					if (!isGroup) return reply(ind.groupo())
					teks = `Admins de el grupo : *${groupMetadata.subject}*\n𝗧𝗼𝘁𝗮𝗹 : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'welcome':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('*ACTIVADO* !!!')
						welkom.push(from)
						fs.writeFileSync('./database/bot/welkom.json', JSON.stringify(welkom))
						reply('❬ EXITO ❭ active la bienvenida en este grupo ')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./database/bot/welkom.json', JSON.stringify(welkom))
						reply('❬ EXITO ❭  Desactivé la bienvenida en este grupo ')
					} else {
						reply(ind.satukos())
					}
					break 
								
				case 'nsfw':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply(' *ACTIVO!!!!')
						nsfw.push(from)
						fs.writeFileSync('./database/bot/nsfw.json', JSON.stringify(nsfw))
						reply('❬ EXITO ❭ ACTIVE NSFW EN EL GRUPO ')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/bot/nsfw.json', JSON.stringify(nsfw))
						reply('❬ EXITO ❭ DESACTIVÉ NSFW EN EL GRUPO')
					} else {
						reply(ind.satukos())
					}
				break
			                case 'leveling':
                if (!isGroup) return reply(ind.groupo())
                if (!isGroupAdmins) return reply(ind.admin())
                if (args.length < 1) return reply('Boo :??')
                if (args[0] === 'activar') {
                if (isLevelingOn) return reply('*la función de nivel ha estado activa antes*')
                 	   _leveling.push(from)
                 	   fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                  	   reply(ind.lvlon())
              	  } else if (args[0] === 'desactivar') {
                  	  _leveling.splice(from, 1)
                 	   fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                 	    reply(ind.lvloff())
             	   } else {
                 	   reply(ind.satukos())
                	}
				break 
							case 'linkgc':
				    if (!isGroup) return reply(ind.groupo())
				    if (isLimit(sender)) return reply(ind.limitend(pusname))
				    if (!isBotGroupAdmins) return reply(ind.badmin())
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink de el Grupo : *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        await limitAdd(sender)
					break
				case 'tagall':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `┣➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
				case 'delete':
				case 'del':
				case 'd':
				case 'borrar':
				client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true }) 
				break 
					  	case 'event':
					 				  
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*ACTIVADO* !!!')
						event.push(from)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*❬ EXITO ❭ ACTIVE LOS EVENTOS EN ESTE GRUPO*')
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*❬ EXITO ❭ APAGANDO EL EVENTO EN ESTE GRUPO*')
					} else {
						reply(ind.satukos())
					}
					break 




					
					 case 'pinterest':
    				if (isLimit(sender)) return reply(ind.limitend(pusname))  
    				  if	(!isRegistered) return reply(ind.noregis())				
				 client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
	reply(ind.wait())
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `𝑾𝒂𝒊𝒇𝒖𝑩𝒐𝒕`})
					await limitAdd(sender)
					break 
					
				case 'antilink':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.ownerg())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*ACTIVADO* !!!')
						antilink.push(from)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply('*❬ EXITO ❭ ACTIVADO ANTILINK*')
					} else if (Number(args[0]) === 0) {
						antilink.splice(from, 1)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply('*❬ EXITO ❭ DESACTIVADO EL ANTILINK*')
					} else {
						reply(ind.satukos())
					}
					break
									
        		case 'listonline': 
        			if (isLimit(sender)) return reply(ind.limitend(pusname)) 
        		if	(!isRegistered) return reply(ind.noregis())
        		if (!isOwner) return reply(ind.ownerb())
        		let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
			    let online = [...Object.keys(client.chats.get(ido).presences), client.user.jid]
			    client.sendMessage(from, 'Lista de usuarios online Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, { quoted: mek,
  			  contextInfo: { mentionedJid: online }
			    })
				break 
				
				
case 'recomienda':
		   	if (isLimit(sender)) return reply(ind.limitend(pusname))
		   if	 (!isRegistered) return reply(ind.noregis())
			    reply(`
01: A Heat for All Seasons
02: A Size Classmate
03: Accelerando Datenshi-tachi no Sasayaki
04: Ai Kyan Joukan
05: Ai no Katachi
06: Ail Maniax
07: Aisai Nikki 
08: Akebi no Hana Maho
09: Akina to Onsen de H Shiyo
10: Alignment You! You!
11: Allargando The Animation 
12: Amanee! 
13: Ana no Oku no Ii Tokoro 
14: Anata dake Konbanwa
15: Anata no Shiranai Kangofu
16: Anata wa Watashi no Mono -
17: Ane Chijo Max Heart
18: Ane Koi Suki Kirai Daisuki
19: Ane Kyun!
20: Ane Yome Quartet,
21: Aneimo
22: Aneki no Kounai Kaikinbi
23: Aniki no Yome-san nara, Ore ni Hamerarete Hiihii Itteru Tokoro Da yo
24: Aneki no Kounai Kaikinbi 
25: Aniyome wa Ijippari
26: Anoko to Iikoto
27: Arubaito Shiyou!!
28: Ayatsuri Haramase Dream Note

*B*
29: Baka na Imouto
30: Babuka Gokudou no Tsuma
31: Baka Dakedo Chinchin Shaburu no Dake wa Jouzu na Chii-chan
32: Bakunyuu BOMB
33: Bakunyuu Maid Kari
34: Betsuni Anta no Tame ni Ookiku Nattan Janain Dakarane!!
35: Bikyaku Seidou Kaichou Ai
36: Binkan Athlete
37: Bloods Inraku no Ketsuzoku 2
38: Boku dake no Hentai Kanojo Motto The Animation
39: Boku no Yayoi-san
40: Boku to Nurse no Kenshuu Nisshi
41: Bokura no Sex
42: Boy Meets Harem The Animation 
43: Brandish
44: Busou Shoujotai Blade Briders The Animation
45: Bust to Bust
46: Buta no Gotoki Sanzoku ni Torawarete Shojo wo Ubawareru Kyonyuu Himekishi & Onna Senshi The Animation

*C*
47: Cafe Junkie
48: Cartagra
49: Cherry & Gals
50: Chicchana Onaka
51: Chichi-iro Toiki 
52: Chijoku no Seifuku
53: Chijoku Shinsatsushitsu
54: Chikan no Licence
55: Chikan Shita Joshikousei to Sonogo 
56: Chinetsu Karte The Devilish Cherry
57: Chu Shite Agechau Oshikake Onee-san no Seikou Chiryou
58: Colosseum no Senki Another Story 
59: Cosplay Rakuen 
60: Cosplay Roshutsu Kenkyuukai
61: Creamy Pie
62: Crimson Girls Chikan Shihai

*D*
63: D-Spray
64: Dainiji Ura Nyuugakushiken
65: Daisuki na Haha
66: Daraku Reijou The Animation Hakoiri Ojousama Netorare Choukyou Kiroku
67: Dark Blue
68: Dekakute Ecchi na Ore no Ane
69: Demon Busters Ecchi na Ecchi na Demon Taiji The Animation
70: Demonion Gaiden
71: Diabolus Kikoku
72: Do S na Seitokaichou-sama ga M Note ni Shihai Saremashita
73: Dokidoki Little Ooyasan
74: Dokidoki Oyako Lesson
75: Dorei Usagi To Anthony
76: Dropout

*E*
77: Ecchi na Shintai Sokutei Anime Edition
78: Eisai Kyoiku
79: Elf no Futagohime Willan to Arsura
80: Elf no Oshiego to Sensei
81: Enbi
82: Enbo E H M
83: Energy Kyouka!!
84: Enkou JK Bitch Gal Ojisan to Namapako Seikatsu
85: Enkou Shoujo Rikujoubu Yukki no Baai The Animation
86: Enyoku
87: Ero Manga! H mo Manga mo Step-up
88: Ero Semi Ecchi ni Yaruki ni ABC The Animation
89: Ero-manga Mitai na Koi Shiyou
90: Eroge! H mo Game mo Kaihatsu Zanmai -
91: Eromame
92: Etsuraku no Tane
93: Euphoria

*F*
94: Fault!!
95: Fault!! Service Aratanaru Rival
96: Fella Hame Lips
97: Fighting of Ecstasy
98: First Love 
99: Floating Material 
100: Front Innocent
101: Fukubiki! Triangle Futaba wa Atafuta
102: Furifure 2
103: Furifure The Animation
104: Furueru Kuchibiru
105: Furyou ni Hamerarete Jusei Suru Kyonyuu Okaa-san The Animation
106: Fuurinkanzan

*G*
107: Gaki ni Modotte Yarinaoshi
108: Gakuen 3 
109: Gakuen de Jikan yo Tomare
110: Gakuen no Ikenie
111: Gakuen Saimin Reido
112: Garden The Animation
113: Genkaku Cool na Sensei ga Aheboteochi! 
114: Gibo no Toki
115: Gogo no Kouchou Junai Mellow Yori
116: Green Eyes Ane Kyun! yori The Animation
117: Grope Yami no Naka no Kotoritachi
118: Gyakuten Majo Saiban Chijo na Majo ni Sabakarechau The Animation

*H*
119: Hachishaku Hachiwa Keraku Meguri Igyou Kaikitan The Animation
120: Haha Sange (Step MILF)
121: Haitoku Tsuma
122: Haramasete Seiryuu-kun!
123: Harem Time The Animation
124: Harukoi Otome
125: Hasan de Ageru 
126: Hataraku Otona no Renai Jijou
127: Hatsujou Switch
128: Heartful Maman The Animation
129: HHH Triple Ecchi
130: Hime-sama Gentei! (Princess Limited!)
131: Himekishi Angelica The Animation
132: Himekishi Lilia
133: Himekishi Olivia 
134: Hishoka Drop The Animation
135: Hissatsu Chikan Nin
136: Hitoriga The Animation 
137: Hitou Meguri Kakure Yu
138: Hitou Meguri Kakure Yu Mao Hen
139: Hitou Meguri The Animation
140: Hitozuma Cosplay Kissa 2 Hitozuma LoveLove
141: Hitozuma Kasumi-san
142: Hitozuma Koukan Nikki
143: Hitozuma Life One Time Gal
144: Hitozuma Ryoujoku Sankanbi
145: Honoo no Haramase Doukyuusei
146: Honoo no Haramase Motto! Hatsuiku! Karada Sokutei 2
147: Honoo no Haramase Oppai Ero Appli Gakuen The Animation
148: Honoo no Haramase Paidol My Star Gakuen Z The Animation
149: Hontou ni Atta Joshi Asuka
150: Houkago 2 Sayuri
151: Houkago 2 The Animation
152: Houkago Initiation
153: Houkago no Yuutousei
154: Houkago NyanNyan 
155: Hump Bang!
156: Hyoudou Ibuki Kanpeki Ibuki Kaichou ga Kousoku Do M! na Wake

*I*
157: Ichigo Chocola Flavor
158: Ichinen Buri no The Animation
159: Ienai Koto
160: Iinari! Saimin Kanojo
161: Iizuka-senpai x Blazer Ane Kyun! yori The Animation
162: Ijou Chitai Jikken Dorei
163: ikenai Koto
164: Ikkyuu Nyuukon
165: Ikoku na Retro
166: Imakara Atashi
167: Imako System
168: Imouto Bitch ni Shiboraretai
169: Imouto de Ikou! 
170: Imouto Paradise! 2
171: Imouto Paradise! 3 The Animation
172: Imouto to Sono Yuujin ga Ero Sugite Ore no Kokan ga Yabai
173: Implicity
174: In no Houteishiki
175: Inda no Himekishi Janne The Animation
176: Inmu Gakuen Inmu ni Torawareta Bijin Shimai
177: Innocent Blue
178: Innocent Shoujo Memoria 
179: Inshitsu Otaku ni Ikareru Kanojo
180: Inyutsu no Yakata The Animation
181: Issho ni Ecchi
182: Itadaki! Seieki
183: Itazura the Animation

*J*
184: Jewelry The Animation
185: Jitaku Keibiin
186: JK Bitch ni Shiboraretai
187: JK to Ero Giin Sensei
188: JK to Ero Konbini Tenchou
189: JK to Inkou Kyoushi 4
190: JK to Inkou Kyoushi 4 feat. Ero Giin-sensei
191: JK to Orc Heidan Aku Buta Oni ni Ryougyaku Sareta Seijo Gakuen
192: Jokei Kazoku III Himitsu
193: Jokei Kazoku Inbou
194: Joshikousei no Koshitsuki
195: Jukujo Shigan
196: Junai Maniac
197: Junjou Shoujo Et Cetera
198: Junk Land The Animation
199: Jutaijima
200: Juvenile Pornography

*K*
201: Kafun Shoujo Chuuihou! The Animation
202: Kagachi-sama Onagusame Tatematsurimasu The Animation
203: Kagirohi Shaku Kei - Another
204: Kakushi Dere
205: Kangoku Injoku no Jikkentou
206: Kanojo ga Mimai ni Konai Wake
207: Kanojo ga Nekomimi ni Kigaetara 
208: Kanojo wa Dare to Demo Sex Suru
209: Kanojo x Kanojo x Kanojo
210: Kanpeki Ojou-sama no Watakushi
211: Kansen 5 The Daybreak
213: Kansen Ball Buster
214: Kansen Inyoku no Rensa
215: Kansen Sodom
216: Katainaka ni Totsui de Kita Russia Musume to H Shimakuru Ohanashi
217: Katekano Idol Sister
218: Kedamono-tachi no Sumu Ie de
219: Kime Koi!
220: Kimi no Mana wa Rina Witch
221: Kimi no na wo Yobeba Kindan no Byoutou
222: Kindan no Byoutou The Animation
223: Kiniitta Chitsu ni Ikinari Nakadashi OK na Resort-tou
224: Kininaru Roommate
225: Kiriya Hakushakuke no Roku Shimai
226: Koakuma Kanojo The Animation
227: Koi Maguwai
228: Koiito Kinenbi The Animation
229: Koikishi Purely Kiss The Animation
230: Koinaka Koinaka de Hatsukoi x Nakadashi
231: Konna ni Yasashiku Sareta no
232: Kotowari Kimi no Kokoro no Koboreta Kakera
233: Koukai Benjo The Animation
234: Kowaku no Toki
235: Kowaremono Risa Plus The Animation
236: Kowaremono Risa The Animation
237: Kowaremono The Animation
238: Kunoichi Botan
239: Kunoichi Sakuya
240: Kuraibito
241: Kuro Ai
242: Kuro no Kyoushitsu
243: Kurohime Shikkoku no Yakata
244: Kuroinu K S wa H ni S
245: Kurutta Kyoutou Danzai no Gakuen
246: Kyonyuu Daikazoku Saimin
247 Kyonyuu Dosukebe Gakuen
248 Kyonyuu Fantasy 249Kyonyuu Hitozuma Onna Kyoushi Saimin
250 Kyonyuu JK ga Ojisan Chinpo
251 Kyonyuu Kazoku Saimin
252 Kyonyuu Reijou MC Gakuen
253 Kyonyuu Try! Tanki Shuuchuu Chichi Momi Lesson
254 Kyouiku Shidou The Animation
255 Kyuuketsuki!!
*L* 
*256 Last Waltz Hakudaku Mamire no Natsu Gasshuku
*257 Lilitales
*258 Little Monica Monogatari
*259 Lo Re Pako Sukusuku Mizuki-chan The Animation
*260 Love 2 Quad
*261 Love B Yasashii Onna 
*262 Love Colon
*263 Love es M The Animation
*264 Love Selection The Animation
*265 Lovely Day Boku to Kanojo no Nana Nichikan
*266 Lovely x Cation The Animation 
**M* 
267 M Ogui Last Order
268 Ma ga Ochiru Yoru
269 Machi Gurumi no Wana
270 Madonna Kanjuku Body Collection
271 Magical Moe
272 Maid Ane
273 Maid-san to Boin Damashii The Animation
274 Makai Kishi Ingrid Re
275 Maken no Hime wa Ero Ero Desu
276 Maki-chan to Nau
277 Mama Puri!
278 Manin Densha
279 Mankitsu Happening 
280 Maple Colors
281 Maro no Kanja wa Gatenkei
282 Marriage Blue
283 Marshmallow Imouto Succubus
284 Mayoiga no oneesan
285 Megachu!
286 Meikoku Gakuen Jutai-hen
287 Mejoku
288 Menhera Ayuri no Yamanai Onedari Headphone wa Hazusenai
289 Mesu Kyoushi 4 Kegasareta Kyoudan
290 Mesu Nochi Torare
291 Miboujin Nikki The Animation
292 Misuzu Ikenai Koto
293 Miyazaki Maya Daizukan
294 Mizugi Kanojo The Animation
295 Mofukuzuma
296 Mokkai Shiyo
297 Momoiro Bouenkyou Anime Edition
298 Momoiro Milk 
299 Monmusu Quest!
300 Mou Hasamazu ni wa Irarenai Hoshi ni Onegai Shitara Konna ni Okkiku Nacchatta!
301 Mozu no Nie
302 Mrs. Junkie 
303 Muchi Muchi Kyousei Seichouchuu!!!
304 Muma no Machi Cornelica
305 Musuko no Tomodachi ni Okasarete
306 Muttsuri Dosukebe Tsuyu Gibo Shimai no Honshitsu Minuite Sex Sanmai
307 My Imouto Koakuma na A Cup
*N* 
*308 Naisho no Wakana-san
*309 Nama Lo Re Furachimono The Animation
*310 Nama Lo Re Namakemono The Animation
*311 Namaiki Kissuisou e Youkoso! The Animation
*312 Namanaka Hyaku Percent! Katamusubi no Shinpa
*313 Nariyuki Papakatsu Girls!! The Animation
*314 Natsumushi The Animation
*315 Natural Vacation
*316 Nee Summer!
*317 Nee, ...Shiyo
*318 Nerawareta Megami Tenshi Angeltia Mamotta Ningentachi ni Uragirarete
*319 Netorare Fighter Yaricchingu!
*320 Netorare Tanabe Yuuka no Dokuhaku
*321 Netorare Zuma
*322 Netoraserare
*323 Newmanoid
*324 Niizuma Koyomi The Animation
*325 Niku Mesu R30 The Animation
*326 Nikuyome T Ke no H
*327 Nosewasure
*328 Nudist Beach ni Shuugakuryokou de!! The Animation
*329 Nuki Doki! Tenshi to Akuma no Sakusei Battle
*330 Nuresuke JK Ameyadori R 
**O* 
331 Oide yo! Mizuryuu Kei Land
332 Oide yo! Shiritsu Yarimakuri Gakuen
333 Ojousama wa H ga Osuki
334 Ojousama Yomeiri Kousou! 
335 Okusama wa Moto Yariman
336 Oni Chichi 1
337 Oni Chichi 2
338 Oppai Gakuen Marching Band Bu!
339 Oppai Heart Kanojo wa Kedamono Hatsujouki
340 Oppai Infinity The Animation
341 Oppai no Ouja 48
342 Ore ga Kanojo o Okasu Wake 
343 Ore wa Kanojo o Shinjiteru!
344 Oshaburi Announcer
345 Oshiete Re Maid
346 Oshioki Gakuen Reijou Kousei Keikaku
347 Otoko no Ko Ojousama
348 Otome Chibaku Yuugi
349 Otome Domain The Animation 
350 Otome Dori
351 Otome Hime
352 Otome Juurin Yuugi Maiden Infringement Play
353 Oyako Rankan The Animation
354 Oyasumi Sex
355 Oyome-sama Honey Days
*P* 
*356 Paizuri Cheerleader vs. Sakunyuu Ouendan!
*357 Pakomane Watashi, Kyou kara Meimon Yakyuubu no Seishorigakari ni Narimasu... The Animation
*358 Papa Love
*359 Pet Life 
*360 Pinkerton 
*361 Pisu Hame!
*362 Please Rape Me!
*363 Pretty x Cation The Animation
*364 Pretty x Cation 2 The Animation
*365 Princess Lover! 
*366 Pure Heart Shooting Girl
**R* 
367 Ran-Sem Hakudaku Delmo Tsuma no Miira Tori
368 Rance 01 Hikari wo Motomete The Animation
369 Rankou Choukyou Maid ni Natta Shoujo
370 Rape Gouhouka!!!
371 Rasen Sokou no Dystopia
372 Real Eroge Situation! The Animation
373 Rei Zero 
374 Renai Fuyou Gakuha
375 Renketsu Houshiki
376 Rennyuu Tales The Animation
377 Rensa Byoutou
378 Residence
379 Resort Boin
380 Reunion
381 Rin x Sen + Ran - Sem Cross Mix
382 Rin x Sen Hakudaku Onna Kyoushi to Yaroudomo
383 Ringetsu The Animation
384 Rinkan Biyaku Chuudoku Nigeba Nashi! 1428-nin no Seito Zenin ni Sex Sareru Reijou Sayaka
385 Rinkan club 
386 Romance wa Tsurugi no Kagayaki II
387 Rune Pharmacy
388 Ryou Seibai! Gakuen Bishoujo Seisai Hiroku
389 Ryoujoku Famiresu Choukyou Menu
*S* 
*390 Sagurare Otome The Animation
*391 Saimin Class
*392 Saimin Gakuen (2018)
*393 Saimin Jutsu Zero 
*394 Saimin Jutsu 2nd
*395 Saimin Seishidou 
*396 Saishuu Chikan Densha Next
*397 School 
*398 Secret Journey
*399 Sei Brunehilde Gakuen Shoujo Kishidan to Junpaku no Panty The Animation
*400 Sei Shoujo The Animation
*401 Sei Yariman Gakuen Enkou Nikki
*402 Sei Yariman Sisters Pakopako Nikki The Animation 
*403 Seikatsu Shidou!! Anime Edition
*404 Seikou! Osananajimi wa Terekusasou ni Uso wo Tsuku
*405 Seikoujo Haitoku no Biden Dorei 
*406 Seiso de Majime na Kanojo ga Saikyou Yaricir ni Kanyuu Saretara. The Animation
*407 Sentakuya Shin-chan
*408 Shabura Rental 
*409 Shiiba-san no Ura no Kao. with Imouto Lip
*410 Shiiku x Kanojo Tenshi no Kousoku-hen
*411 Shikkoku no Shaga The Animation
*412 Shin Hitou Meguri 
*413 Shin Ringetsu
*414 Shin Saishuu Chikan Densha
*415 Shin Sei Yariman Gakuen Enkou Nikki
*416 Shinkyoku no Grimoire The Animation
*417 Shiofuki Mermaid
*418 Shishunki Shoujo 
*419 Shocking Pink
*420 Shoujo Kara Shoujo e...
*421 Shoujo Kyouiku
*422 Shoujo Ramune
*423 Shoujo x Shoujo x Shoujo
*424 Shoujo-tachi no Sadism The Animation
*425 Shoukoujo The Animation
*426 Shoyonoido Mako-chan
*427 Soikano Gyutto Dakishimete The Animation
*428 Sora no Iro, Mizu no Iro
*430 Soredemo Tsuma wo Aishiteru
*431 Soredemo Tsuma o Aishiteru 2
*432 Soukan Yuugi 
*433 Soukou Kijo Iris 
*434 Soushisouai Note The Animation
*435 Spocon! 
*436 Starless
*437 Stretta The Animation
*538 Stringendo Angel-tachi no Private Lesson
*439 Stringendo+Accelerando Ultimatum Sera 
*440 Succuba Mist Story 
*441 Suki de, Suki de, Suki de The Animation
*442 Swamp Stamp Anime Edition
*443 Sweet Home H na Oneesan wa Suki Desu ka
**T* 
444 T.K.G – Takagi 
445 Taimanin Yukikaze
446 Tamashii Insert 
447 Tayu Tayu
448 Teakamamire no Tenshi The Animation
449 Tenioha! 
450 Tennen Koi-iro Alcohol
451 Tensei Kendo no Harem Colosseo
452 Tentacle and Witches
453 The Guts!
454 Tinderbox
455 Tiny Evil
456 Tony’s Heroine Series Kanojo wa Hanayome Kouhosei
457 Toriko Hime Hakudaku Mamire no Reijou
458 Toriko no Chigiri 
459 Toriko no Kusari
460 Toshi Densetsu Series
461 Triangle Blue
462 Tropical Kiss
463 True Blue
464 True Blue Gaiden 
465 TSF Monogatari
466 Tsugou no Yoi Sexfriend
467 Tsuma ga Onsen de Circle Nakama no Nikubenki ni Natta no Desu ga... Anime Edition
468 Tsuma Netori Ryoujoku Rinne
469 Tsuma Shibori 
470 Tsumamigui 
471 Tsumamigui 3 The Animation
472 Tsun M! Gyutto Shibatte Shidoushite The Animation
473 Tsun Tsun Maid wa Ero Ero Desu
474 Tsundere Inran Shoujo Sukumi
475 Tsunpuri
*U* 
*476 Uhou Renka
*477 Unsweet Netorare Ochita Onna-tachi
*478 Ura Jutaijima
**V* 
479 Valkyrie Choukyou Semen Tank no Ikusa Otome 10-nin Shimai
480 Venus Blood BRAVE
481 Victorian Maid Maria no Houshi
*W* 
*482 Wagaya no Liliana-san
*483 Waisetsu Missile The Animation
*484 Wana Hakudaku Mamire no Houkago
*485 Wanna. SpartanSex Spermax!!!
*486 Warau Kangofu
*487 Watashi ga Toriko ni Natte Yaru
*488 Watashi no Shiranai Mesu no Kao
*489 Watashi wa Kairaku Izonshou
*490 Wizard Girl Ambitious
**Y* 
491 Yabai! Fukushuu Yami Site
492 Yakata Kannou Kitan
493 Yareruko! Densha Ecchi
494 Yarimoku Beach ni Shuugakuryokou de!!
495 Yobai Suru Shichinin no Harame
496 Yokorenbo Immoral Mother
497 Yokujou Bazooka the Animation
498 Youkoso! Sukebe Elf no Mori e
499 Yume Kui Tsurumiku Shiki Game Seisaku
*Z* 
*500Zecchou Rocket 
*501 Zettai Junshu Kyousei Kozukuri Kyokashou!!
*502 Zoku Tsuma Netori
*503: Zton Jingai Animation A Beautiful Greed Nulu Nulu
*504: Zutto Suki Datta`)				
break				
				
				

	case 'luffywp':
case 'luffy':
	if (isLimit(sender)) return reply(ind.limitend(pusname))
if (!isRegistered) return reply(ind.noregis())
const bbb =['https://i.ibb.co/LS2wwZ3/2.jpg','https://i.ibb.co/6Y7B8jN/24.jpg','https://i.ibb.co/dkxQ7vW/46.jpg','https://i.ibb.co/0jtS7gk/3.jpg','https://i.ibb.co/RSFXyw3/25.jpg','https://i.ibb.co/ys42dqX/4.jpg','https://i.ibb.co/g7FZdrN/26.jpg','https://i.ibb.co/7b83zQR/5.jpg','https://i.ibb.co/0tSDFjx/6.jpg','https://i.ibb.co/7nmdkkS/38.jpg','https://i.ibb.co/Yt67W1b/17.jpg','https://i.ibb.co/m6DThvb/39.jpg','https://i.ibb.co/f9W2DC2/18.jpg','https://i.ibb.co/7jXnk5F/40.jpg','https://i.ibb.co/gZMZRkD/19.jpg','https://i.ibb.co/jHhPDD7/41.jpg','https://i.ibb.co/D916N61/20.jpg','https://i.ibb.co/r2qksz0/21.jpg','https://i.ibb.co/3pGFN2S/43.jpg','https://i.ibb.co/wzBXy9R/44.jpg','https://i.ibb.co/bFYcBtY/1.jpg','https://i.ibb.co/wBXsS3Q/23.jpg','https://i.ibb.co/0CMp7zd/13.jpg','https://i.ibb.co/B3nZVY5/35.jpg','https://i.ibb.co/ZMbkCqv/14.jpg','https://i.ibb.co/x1hQMGW/36.jpg','https://i.ibb.co/gyS0dDn/15.jpg','https://i.ibb.co/jv9DnJw/16.jpg','https://i.ibb.co/W0BBZxq/28.jpg','https://i.ibb.co/cXMvTqb/7.jpg','https://i.ibb.co/B6qg1hK/29.jpg','https://i.ibb.co/nMmHbK1/30.jpg','https://i.ibb.co/t4n9BYz/10.jpg','https://i.ibb.co/CWD48hF/32.jpg','https://i.ibb.co/8jGH0Z0/11.jpg','https://i.ibb.co/VjbYGT5/33.jpg','https://i.ibb.co/DMntJ4L/12.jpg','https://i.ibb.co/vZJ6JtF/34.jpg','https://i.ibb.co/pywNvF0/37.jpg']
    const xfuus = bbb[Math.floor(Math.random() * bbb.length)]
      ksjsskk = await getBuffer(xfuus)
client.sendMessage(from, ksjsskk, image, {quote: mek})
break

			     	case 'bañar':	
			     		if (isLimit(sender)) return reply(ind.limitend(pusname))		    
					if (!isGroup) return reply(ind.groupo())								
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Etiqueta!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)						
					} else {
						mentions(`${pushname} esta bañando a @${mentioned[0].split('@')[0]}\n\nᕙ( ͡◉ ͜ ʖ ͡◉)ᕗ`, mentioned, true)					
					}
					break
case 'meme':
case 'memes':
	if (isLimit(sender)) return reply(ind.limitend(pusname))
if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const yuuui =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34']
    const xfjjjs = yuuui[Math.floor(Math.random() * yuuui.length)]
uwu = fs.readFileSync(`./meme/${xfjjjs}.jpg`);
client.sendMessage(from, uwu, image, {quote: mek})
break
//////////////////// +18 //////////////////
                

				
				
case 'hacking':
	if (isLimit(sender)) return reply(ind.limitend(pusname))
if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const h =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
const a = h[Math.floor(Math.random() * h.length)]
uwu = fs.readFileSync(`./hack/${a}.pdf`);
client.sendMessage(from, uwu, document, { quoted: mek, mimetype: Mimetype.pdf, filename: `Archivos de hacking` })
break


  case 'randomH':
  case 'randomhentai':
  case 'random':
  case 'hentai':
  	if (isLimit(sender)) return reply(ind.limitend(pusname))
            if (!isRegistered) return reply(ind.noregis())
if (!isNsfw) return reply(ind.nsfwoff())			
			reply(ind.wait())
		        const ja = ['https://i.ibb.co/r7jb9CM/nanastu-no-taizai.jpghttps://i.ibb.co/nQWgzkn/en-la-cama-732x1024.jpghttps://i.ibb.co/7VjT4Vg/nanastu-no-taizai-1.jpg','https://i.ibb.co/tqYQnRf/esperando-ser-cogida-por-el-culo-768x622.jpg','https://i.ibb.co/9nLhWdT/4ffaeb4686ca49880d498b5c3d131219.jpg','https://i.ibb.co/Js5q98Q/desnudandose-para-nosotros-768x838.jpg','https://i.ibb.co/DzgZZ8V/sample-7ce06afc13af9c96798da3a43eb402c1.jpg','https://i.ibb.co/4pFT8Cv/novia-sexy-espera-dejar-de-ser-virgen-768x1008.jpg','https://i.ibb.co/rkwbzWd/nanastu-no-taizai-2-703x1024.jpg','https://i.ibb.co/nwwcVMG/331fb55cde647d39ffb514fd9aa56225.jpg','https://i.ibb.co/6DrqXZV/follando-con-universitaria-nerd-anime-768x576.jpg','https://i.ibb.co/GtmJRJc/847eede2ea951c8c99d8964b16fa35fe.jpg','https://i.ibb.co/k2fJRVP/7a0cc9a7c733ffb26a5968df67afab78.jpg','https://i.ibb.co/NpKbTqg/nanatsu-no-taizai-hentaithe-seven-deadly-sins-8-768x576.jpg','https://i.ibb.co/8c1qwQg/poniendo-a-mamar-a-mi-amiga-768x572.jpg','https://i.ibb.co/1QTjwm7/de8b7e2e8f24c911cf57f89bcbbf0a2f.jpg','https://i.ibb.co/c3s8Nc7/estudiante-espera-en-casa-para-follar-768x542.jpg','https://i.ibb.co/fnMF4sT/sexo-entre-universitarios-virgenes-709x1024.jpg','https://i.ibb.co/PmKBFPC/nanastu-no-taizai-5-768x768.jpg','https://i.ibb.co/sQ9C08t/solfie-de-amiga-caliente-745x1024.jpg','https://i.ibb.co/PN1mvZg/llena-de-semen-683x1024.jpg','https://i.ibb.co/RcpdzYv/sexo-en-la-cocina-con-amiga-768x1173.jpg','https://i.ibb.co/2jg250G/nanastu-no-taizai-4-768x637.jpg','https://i.ibb.co/9gzQQjk/nanatsu-no-taizai-hentaithe-seven-deadly-sins-10-724x1024.jpg','https://i.ibb.co/qmLZFGJ/hentai-nanatsu-no-taizai-10-768x545.jpg','https://i.ibb.co/25V6m5H/cogiendo-el-culo-de-mi-amiga-anime-768x495.jpg','https://i.ibb.co/sq7Qwjm/xxx-virgenes-esperando-desvirgacion-768x576.jpg','https://i.ibb.co/0cCyHLy/sample-63606680dc18d17e7d3dd40fc551b52f.jpg','https://i.ibb.co/wQPFTf8/nanatsu-no-taizai-hentaithe-seven-deadly-sins-6-768x576.jpg','https://i.ibb.co/4MPfQR9/amiga-caliente-768x970.jpg','https://i.ibb.co/QvjBBC7/96e2079f73d1362d594353b8cc9ff010.jpg','https://i.ibb.co/BP4YST6/nanatsu-no-taizai-hentaithe-seven-deadly-sins-2-768x698.jpg','https://i.ibb.co/C9pdvh0/playa-sexy-con-amigas-750x1024.jpg','https://i.ibb.co/NF88DZd/sample-ca1a2b725603c14931192e07b78a5d2e.jpg','https://i.ibb.co/RYwm9Pb/sample-b091aca55c2592c2947c1da11d3b28d1.jpg']
let ui = ja[Math.floor(Math.random() * ja.length)]
                v = await getBuffer(ui)
                client.sendMessage(from, v, image, {quote: mek, caption: `*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*`})
		        await limitAdd(sender)
                break
                
                
case 'bc':
						if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						bc = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, bc, image, {caption: `*🔥🥶𝑾𝑨𝑰𝑭𝑼•𝑩𝑶𝑻🥵🔥*\n\n${body.slice(4)}`})
						}
						reply('Listo')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*🔥🥶𝑾𝑨𝑰𝑭𝑼•𝑩𝑶𝑻🥵🔥*\n\n${body.slice(4)}`)
						}
						reply('Listo')
					}
					break                
                
                
                
        case 'bot1':
        	if (isLimit(sender)) return reply(ind.limitend(pusname))
           if (!isRegistered) return reply(ind.noregis())
	        			reply(ind.wait())     		
               	wyew = fs.readFileSync(`./src/5.jpg`)
                  confuu = `*ᏰᎧ𐐆 ᏋᏁ ᎮᎧᏒ𐐆ᏬᎶᏬᏋᏕ*\n\n┏━⊱ɴᴏᴍʙʀᴇ\n┗⊱ *Brizas*\n\n*ᏨᎾᎷᎯᏁᎠᎾᏕ*\n\n┏━⊱ *pkg install git -y*\n┗⊱ *git clone https://github.com/ianmsfvenom/Brizas-bot*\n┏━⊱ *cd Brizas-bot*\n┗⊱ *pkg install bash*\n┏━⊱ *bash install.sh*\n┗⊱ *sh start.sh*`
                    client.sendMessage(from, wyew, image, { quoted: mek, caption: confuu })                   
	            									break
   
        case 'bot2':
        	if (isLimit(sender)) return reply(ind.limitend(pusname))
          if (!isRegistered) return reply(ind.noregis())
	        			reply(ind.wait())       		
               	wyew = fs.readFileSync(`./src/5.jpg`)	        			  	  
                  confuu = `*ᏰᎧ𐐆 ᏋᏁ ᎮᎧᏒ𐐆ᏬᎶᏬᏋᏕ*\n\n┏━⊱ɴᴏᴍʙʀᴇ\n┗⊱ *Lorde*\n\n*ᏨᎾᎷᎯᏁᎠᎾᏕ*\n\n┏━⊱ *pkg install git -y*\n┗⊱ *git clone https://github.com/lordescreamo/lordescreamo*\n┏━⊱ *cd lordescreamo*\n┗⊱ *pkg install bash*\n┏━⊱ *bash install.sh*\n┗⊱ *npm start*`
                    client.sendMessage(from, wyew, image, { quoted: mek, caption: confuu })                   
	            									break    
	            									
        case 'bot3':
        	if (isLimit(sender)) return reply(ind.limitend(pusname))
       if  (!isRegistered) return reply(ind.noregis())
	        			reply(ind.wait())       		
               	wyew = fs.readFileSync(`./src/5.jpg`)	        			  	  
                  confuu = `*ᏰᎧ𐐆 ᏋᏁ ᎮᎧᏒ𐐆ᏬᎶᏬᏋᏕ*\n\n┏━⊱ɴᴏᴍʙʀᴇ\n┗⊱ *Arya*\n\n*ᏨᎾᎷᎯᏁᎠᎾᏕ*\n\n┏━⊱ *pkg install git -y*\n┗⊱ *git clone https://github.com/Arya274/Arya-Bot*\n┏━⊱ *cd Arya-Bot*\n┗⊱ *npm install*\n┏━⊱ *pkg install nodejs*\n┗⊱ *pkg install ffmpeg*\n┏━⊱ *pkg install imagemagick*\n┗⊱ *pkg install bash*\n┏━⊱ *bash install.sh*\n┗⊱ *npm start*`
                    client.sendMessage(from, wyew, image, { quoted: mek, caption: confuu })                   
	            									break    

	                
                    
           case 'gogo':
           	if (isLimit(sender)) return reply(ind.limitend(pusname))
          if  (!isRegistered) return reply(ind.noregis())
                   if (args.length < 1) return reply(`[❗] Eh??\n*pone asi ${prefix}8bit Papi/confu*`)
                  reply(ind.wait())
                   var F = body.slice(6)
				   var F1 = F.split("/")[0];
				   var F2 = F.split("/")[1]
                   anu = await getBuffer(`https://videfikri.com/api/textmaker/8bit/?text1=${F1}&text2=${F2}`)
                   client.sendMessage(from, anu, image, {caption: `*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*`, quoted: mek}) 
                   break
            										            									           	          								  									           	          														            									           	          														            									           	          									
                     case 'glass':
                   if  (!isRegistered) return reply(ind.noregis()) 
                     	if (isLimit(sender)) return reply(ind.limitend(pusname))
                   if (args.length < 1) return reply(`[❗] Eh??\n*pone asi ${prefix}glass Papi confu*`)
                 reply(ind.wait())
                   F = body.slice(7)				    
                   anu = await getBuffer(`https://videfikri.com/api/textmaker/paperonglass?text=${F}`)
                   client.sendMessage(from, anu, image, {caption: `*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*`, quoted: mek}) 
                   break 
                   case 'romance':
                   if (!isRegistered) return reply(ind.noregis())
                    	if (isLimit(sender)) return reply(ind.limitend(pusname))
                   if (args.length < 1) return reply(`[❗] Eh??\n*${prefix} Papi confu*`)
                   reply(ind.wait())
                   F = body.slice(9)				    
                   anu = await getBuffer(`hthttps://videfikri.com/api/textmaker/romancetext?text=${F}`)
                   client.sendMessage(from, anu, image, {caption: `*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*`, quoted: mek}) 
                   break           										            									           	          														            									           	          														            									           	          														            									           	          									
            										            									           	          														            									           	          														            									           	          														            									           	          														            									           	          									
             				case 'frases':
				client.updatePresence(from, Presence.composing) 
			if (!isRegistered) return reply(ind.noregis())	
			 	if (isLimit(sender)) return reply(ind.limitend(pusname))		
								const fra =['El amor inmaduro dice: "te amo porque te necesito". El amor maduro dice: "te necesito porque te amo" (Erich Fromm)','La vida empieza cada cinco minutos (Andreu Buenafuente)','Donde las palabras fallan la música habla (Hans Christian Andersen)','Un buen viajante no tiene planes (Confucio)','Una vez aceptamos nuestros límites, vamos más allá de ello (Albert Einstein)','Lo que no nos mata nos hace más fuertes (Friedrich Nietzsche)','Si caminas solo, irás más rápido. Si caminas acompañado, llegarás más lejos.','Una vida llena de errores no solo es más honorable, sino que es más sabia que una vida gastada sin hacer nada','Es sencillo hacer que las cosas sean complicadas, pero difícil hacer que sean sencillas. F. Nietzsche','No pierdas nunca el sentido del humor y aprende a reírte de tus propios defectos','La preocupación es como una mecedora, te mantiene ocupado pero no te lleva a ninguna parte',' El hombre que más ha vivido no es aquel que más años ha cumplido, sino aquel que más ha experimentado la vida','Si lo puedes soñar, lo puedes hacer','Lo imposible es el fantasma de los tímidos y el refugio de los cobardes','El camino que nos toca recorrer está lleno de sorpresas. Nunca vas a estar preparado para las que te toquen a ti, sean dichosas o sombrías, pues eso es parte de adquirir experiencia. Y descubrir cuán gratas o desafortunadas son las que te esperan, es algo nunca podrás evadir','La felicidad no es algo que pospones para el futuro, es algo que diseñas para el presente','El amigo ha de ser como el dinero, que antes de necesitarle, se sabe el valor que tiene','Tus acciones serán el reflejo de la manera que tienes de ver la vida y las que te van definir ante los demás. No las malgastes en cosas y actitudes que no valen la pena, solo tú puedes decidir la forma en la que quieres que te recuerden, porque no estarás en este mundo para siempre','El amor es lo que mueve al mundo aunque a veces parezca lo contrario. A las personas no nos haría mal recordar esto de vez en cuando','Nunca terminas de conocer a la gente. Tus amigos, tu familia y hasta tú mismo, pueden ocultar sorpresas que en la vida te podrías haber imaginado, tanto buenas como malas','Todos tenemos el mismo destino, en esencia no hay manera de diferenciarnos si nacemos para llorar y reír. Recuérdalo, todos tenemos los días contados, vive cada uno de tus días como si fueran el regalo más grande, porque nadie puede asegurarte el mañana','Mientras vivas vas a encontrarte con todo tipo de personas, tanto buenas como malas. Es imposible adivinar las intenciones que oculta alguien detrás de su comportamiento, pero descubrirlo es la tarea más interesante y peligrosa con la que te puedes llegar a topar','Los tiempos felices en la humanidad son las páginas vacías de la historia','La decepción después de un amor fallido, puede llegar a oprimir tu corazón hasta el punto de no dejarte respirar. Pero nadie se ha muerto de amor','No llores por la gente que se ha ido, enfócate en quienes se encuentran a tu lado en el presente y quédate con los buenas recuerdos de los que se marcharon','No debes enfocarte en el dolor que puedes sentir si alguien te ha falla. Si no eres capaz de perdonar una equivocación, entiérrala y sigue adelante','Amar es la aventura más grande en la que te puedes embarcar. Porque te puede hacer volar más alto de lo que jamás imaginarte y también ponerte los pies de la tierra']
 					const jys = fra[Math.floor(Math.random() * fra.length)]
					  ses = fs.readFileSync(`./src/5.jpg`)
					client.sendMessage(from, ses, image, { caption: '*ᖴᏒᏗᏕᏋᏕ ૮ᏬᏒᎥᎧᏕᏗᏕ👌*\n\n'+ jys, quoted: mek })
break     					
					
					 case 'lirik': 
					 	if (isLimit(sender)) return reply(ind.limitend(pusname))  
					if  (!isRegistered) return reply(ind.noregis())                          
					teks = body.slice(7)
					anu = await fetchJson(`http://scrap.terhambar.com/lirik?word=${teks}`, {method: 'get'})
					reply('Aqui esta la letra de '+teks+' :v :\n\n'+anu.result.lirik)
					await limitAdd(sender) 
					break 
				


         ////////////// MP4 //////////////
case 'say1':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
uwu = fs.readFileSync('./mp3/say1.mp4');
client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true})
break
case 'say2':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
uwu = fs.readFileSync('./mp3/say2.mp4');
client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true})
break
case 'say3':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
uwu = fs.readFileSync('./mp3/say3.mp4');
client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true})
break
case 'edit':
case 'edits':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
const ed =['1','2','3','4','5','6','8']
const es = ed[Math.floor(Math.random() * ed.length)]
uwu = fs.readFileSync(`./ed/${es}.mp4`);
client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true})
break
		
case 'kannavd':
case 'kanavd':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
const kan =['1','2','3','4','5','6']
const nan = kan[Math.floor(Math.random() * kan.length)]
uwu = fs.readFileSync(`./kannae/${nan}.mp4`);
client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true})
break										
case 'megu':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
uwu = fs.readFileSync('./mp3/99.mp4');
client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true, caption: `💥E͚x͚͚ͨᴘ͚͚ͫʟ͚͚ⷴᴏ͚͚ͫs͚͚ͩɪ͚͚ͦᴏ͚͚ⷭɴ͚͚ͫ!͚!͚!͚!͚!͚!͚ 💥`})
break								




case 'shotovd':
case 'sʜᴏᴛᴏᴠᴅ':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
const yui =['shoto todoroki _ play with fire edit','Todoroki edit - Swerve','ＨＯＷ ＹＯＵ ＬＩＫＥ ＴＨＡＴ ｔｏｄｏｒｏｋｉ ｅｄｉｔ','《Todoroki Edit》_ Get Right Witcha __ Anime Edit __ Zeldits','xd']
    const xs = yui[Math.floor(Math.random() * yui.length)]
uwu = fs.readFileSync(`./mp3/${xs}.mp4`);
	client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true})
	break			
	
	case 'miku':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
const yuai =['1','2','3','4','5']
    const xns = yuai[Math.floor(Math.random() * yuai.length)]
uwu = fs.readFileSync(`./miku/${xns}.mp4`);
	client.sendMessage(from, uwu, video, {quoted: mek, mimetype: 'video/mp4', ptt:true})
	break			
	

case 'brasil':
case 'brasileña':
case 'brasileñas':
 if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
const yauuui =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47']
    const xfkls = yauuui[Math.floor(Math.random() * yauuui.length)]
uwu = fs.readFileSync(`./brasil/${xfkls}.jpg`);
client.sendMessage(from, uwu, image, {quote: mek})
break


case 'muslos':
case 'muslo':
if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
reply(ind.wait())
const uiu =['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']
    const xfjjjjjs = uiu[Math.floor(Math.random() * uiu.length)]
uwu = fs.readFileSync(`./muslos/${xfjjjjjs}.jpg`);
client.sendMessage(from, uwu, image, {quote: mek})
break	


case 'shotowp':
case 'sʜᴏᴛᴏᴡᴘ':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const sho =['https://i.ibb.co/k1Wxrwz/16.jpg','https://i.ibb.co/8NsKsMX/9.jpg','https://i.ibb.co/0cDQDLk/17.jpg','https://i.ibb.co/1nD0C4S/8.jpg','https://i.ibb.co/FkQBCtk/44.jpg','https://i.ibb.co/h7qJvLb/15.jpg','https://i.ibb.co/2cV793H/69.jpg','https://i.ibb.co/rwn9JWf/48.jpg','https://i.ibb.co/XtFKmBV/68.jpg','https://i.ibb.co/bB4Bzh0/47.jpg','https://i.ibb.co/JnPFnx2/70.jpg','https://i.ibb.co/g3fJ69R/7.jpg','https://i.ibb.co/RDwCzQH/49.jpg','https://i.ibb.co/3cfrjpt/72.jpg','https://i.ibb.co/hR4ZdFN/71.jpg','https://i.ibb.co/svGrfqL/28.jpg','https://i.ibb.co/j67Kfjs/30.jpg','https://i.ibb.co/Vx2dNN4/54.jpg','https://i.ibb.co/z4tGCRj/3.jpg','https://i.ibb.co/YQx9BW7/46.jpg','https://i.ibb.co/hMchk3N/45.jpg','https://i.ibb.co/tLyf6wd/14.jpg','https://i.ibb.co/hmGWN3W/5.jpg','https://i.ibb.co/StpLqTQ/31.jpg','https://i.ibb.co/nwm2YSB/38.jpg','https://i.ibb.co/5h4GnKL/42.jpg','https://i.ibb.co/xsdktYP/25.jpg','https://i.ibb.co/3k4zWKM/39.jpg','https://i.ibb.co/h7FF1W6/60.jpg','https://i.ibb.co/yfGx3C5/37.jpg','https://i.ibb.co/1MQVqbL/6.jpg','https://i.ibb.co/sPDwwT9/40.jpg','https://i.ibb.co/tmPc4p2/4.jpg','https://i.ibb.co/wWJtysV/74.jpg','https://i.ibb.co/LJP6TSt/73.jpg','https://i.ibb.co/2sJqmp1/41.jpg','https://i.ibb.co/9NFcMT3/57.jpg']
let to = sho[Math.floor(Math.random() * sho.length)]
shoto = await getBuffer(to)
client.sendMessage(from, shoto, image, {quote: mek})
break
		
case 'saku':
case 'sakur':
case 'sakura':
case 'sak':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const saku =['https://i.ibb.co/tCjfyP1/42.jpg','https://i.ibb.co/QDwhvmd/37.jpg','https://i.ibb.co/XsV6JMF/15.jpg','https://i.ibb.co/51kyLsw/36.jpg','https://i.ibb.co/YRYHKmG/14.jpg','https://i.ibb.co/tm0NYYM/39.jpg','https://i.ibb.co/G5twXCz/17.jpg','https://i.ibb.co/jDQG3KL/16.jpg','https://i.ibb.co/N1MsmBg/38.jpg','https://i.ibb.co/x226p3B/33.jpg','https://i.ibb.co/kJ0kvkK/32.jpg','https://i.ibb.co/KKtQCv5/35.jpg','https://i.ibb.co/6NFfgYD/13.jpg','https://i.ibb.co/FBV26M5/12.jpg','https://i.ibb.co/4V4bNhv/34.jpg','https://i.ibb.co/2ZtKK7Y/3.jpg','https://i.ibb.co/mSsFYpp/19.jpg','https://i.ibb.co/99yhr61/41.jpg','https://i.ibb.co/wM0wpph/18.jpg','https://i.ibb.co/NSdt9M2/40.jpg','https://i.ibb.co/5GsQ0M0/21.jpg','https://i.ibb.co/nD3fXdp/20.jpg','https://i.ibb.co/kKzsVC2/26.jpg','https://i.ibb.co/9TLrHKq/4.jpg','https://i.ibb.co/dLd11N2/25.jpg','https://i.ibb.co/xHcBCF6/1.jpg','https://i.ibb.co/XScSFRt/28.jpg','https://i.ibb.co/6mkfG4k/6.jpg','https://i.ibb.co/f8X0QxH/5.jpg','https://i.ibb.co/xMDxFhW/27.jpg','https://i.ibb.co/BsGDBM9/22.jpg','https://i.ibb.co/zP3yPvQ/44.jpg','https://i.ibb.co/rtsrbLw/43.jpg','https://i.ibb.co/KmwN3jq/2.jpg','https://i.ibb.co/xXGSvLf/46.jpg','https://i.ibb.co/Jr6QGh7/24.jpg','https://i.ibb.co/MfKYGfP/45.jpg','https://i.ibb.co/G0kXbvR/23.jpg','https://i.ibb.co/nRDZpHx/11.jpg','https://i.ibb.co/hBrPSrb/8.jpg','https://i.ibb.co/RCP18Qd/30.jpg','https://i.ibb.co/DD3jjCV/7.jpg','https://i.ibb.co/YD54YbH/29.jpg','https://i.ibb.co/JQ6Q7vS/10.jpg','https://i.ibb.co/B2bDnd4/31.jpg','https://i.ibb.co/HY0mxbt/9.jpg']
let ra = saku[Math.floor(Math.random() * saku.length)]
sakura = await getBuffer(ra)
client.sendMessage(from, sakura, image, {quote: mek})
break

	case 'sasuke':
	case 'sasuk':
	case 'sasu':
	case 'sas':
	case 'sa':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const sasu =['https://i.ibb.co/4Zhb1Tf/27.jpg','https://i.ibb.co/SKF8ns4/5.jpg','https://i.ibb.co/Tg7Z4QR/4.jpg','https://i.ibb.co/2kFP3VQ/26.jpg','https://i.ibb.co/nmQ0b46/29.jpg','https://i.ibb.co/99SdFrN/7.jpg','https://i.ibb.co/9Z8fqC6/6.jpg','https://i.ibb.co/2ZKtkM1/28.jpg','https://i.ibb.co/6rybDYJ/23.jpg','https://i.ibb.co/DwfFdw2/3.jpg','https://i.ibb.co/hy6gCpF/22.jpg','https://i.ibb.co/k8Rj6nf/25.jpg','https://i.ibb.co/PChJBFG/3.jpg','https://i.ibb.co/qWQT9cB/24.jpg','https://i.ibb.co/GJNNGw1/2.jpg','https://i.ibb.co/bQvmWrt/42.jpg','https://i.ibb.co/2s0JMsL/9.jpg','https://i.ibb.co/10KZf8h/30.jpg','https://i.ibb.co/DYq8FjN/41.jpg','https://i.ibb.co/KGvTPLs/8.jpg','https://i.ibb.co/HVvFcNc/10.jpg','https://i.ibb.co/QQwFV9K/39.jpg','https://i.ibb.co/7gHhjq9/38.jpg','https://i.ibb.co/p4C9F82/40.jpg','https://i.ibb.co/jrcm2nD/21.jpg','https://i.ibb.co/jbh0Hvf/16.jpg','https://i.ibb.co/17dRPSF/15.jpg','https://i.ibb.co/TK4SQyn/18.jpg','https://i.ibb.co/WHJS8xm/17.jpg','https://i.ibb.co/ZS7kqLM/12.jpg','https://i.ibb.co/VNbzXzG/11.jpg','https://i.ibb.co/pr3cmhX/14.jpg','https://i.ibb.co/cQQd5ZF/13.jpg','https://i.ibb.co/0f3tDsg/35.jpg','https://i.ibb.co/TLFwCWP/34.jpg','https://i.ibb.co/JQGPj6X/37.jpg','https://i.ibb.co/GTSQBZq/36.jpg','https://i.ibb.co/fHp5qjG/31.jpg','https://i.ibb.co/mDhgkrm/20.jpg','https://i.ibb.co/0yjLHK1/19.jpg','https://i.ibb.co/bb7KpjF/33.jpg','https://i.ibb.co/74xzZ7v/32.jpg']
let ke = sasu[Math.floor(Math.random() * sasu.length)]
      sasuke = await getBuffer(ke)
client.sendMessage(from, sasuke, image, {quote: mek})
break
	
case 'hinata':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const hi =['https://i.ibb.co/9rCvP8r/17.jpg','https://i.ibb.co/fdfHsvC/16.jpg','https://i.ibb.co/yqVzKwz/15.jpg','https://i.ibb.co/nsYzNVY/37.jpg','https://i.ibb.co/1qBSX68/14.jpg','https://i.ibb.co/x23ZS3m/36.jpg','https://i.ibb.co/9YW7H64/38.jpg','https://i.ibb.co/R6X2jFN/2.jpg','https://i.ibb.co/vkXYxQB/24.jpg','https://i.ibb.co/H4Vyy7m/1.jpg','https://i.ibb.co/KWh45C6/23.jpg','https://i.ibb.co/LS3MHDR/22.jpg','https://i.ibb.co/KVVwvkR/21.jpg','https://i.ibb.co/3Bsc4WB/20.jpg','https://i.ibb.co/87T9WSz/19.jpg','https://i.ibb.co/smpVwmM/18.jpg','https://i.ibb.co/s2f15XK/40.jpg','https://i.ibb.co/tBVm0g0/39.jpg','https://i.ibb.co/t8BTdYz/7.jpg','https://i.ibb.co/3RZfKrc/6.jpg','https://i.ibb.co/nR6RgQm/5.jpg','https://i.ibb.co/Tw184KP/27.jpg','https://i.ibb.co/Y04L6YH/4.jpg','https://i.ibb.co/6DjvwQj/26.jpg','https://i.ibb.co/t4jCPqS/3.jpg','https://i.ibb.co/WyD7LrT/25.jpg','https://i.ibb.co/B3S6Vwq/13.jpg','https://i.ibb.co/r0rkhhZ/35.jpg','https://i.ibb.co/bmCkXqm/12.jpg','https://i.ibb.co/ZJjJMPj/34.jpg','https://i.ibb.co/LQG8jrP/11.jpg','https://i.ibb.co/f9yGMFj/33.jpg','https://i.ibb.co/25Mftyb/10.jpg','https://i.ibb.co/C2vG2HJ/32.jpg','https://i.ibb.co/BVRFVwy/9.jpg','https://i.ibb.co/1ZXw3gY/31.jpg','https://i.ibb.co/7S0Tnht/8.jpg','https://i.ibb.co/GC1zzxh/30.jpg','https://i.ibb.co/80JkbbD/29.jpg','https://i.ibb.co/G5qKBmR/28.jpg']
let na = hi[Math.floor(Math.random() * hi.length)]
      ta = await getBuffer(na)
client.sendMessage(from, ta, image, {quote: mek})
break

case 'naruto':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())

const naru =['https://i.ibb.co/cYZvB9F/1.jpg','https://i.ibb.co/KFqs2FS/4.jpg','https://i.ibb.co/gZxR37C/2.jpg','https://i.ibb.co/f4JWgBD/31.jpg','https://i.ibb.co/NKwRWPF/19.jpg','https://i.ibb.co/pKJpdss/30.jpg','https://i.ibb.co/DwVLMCr/33.jpghttps://i.ibb.co/MkNxxg4/32.jpg','https://i.ibb.co/nLdhqvq/16.jpg','https://i.ibb.co/LRH7qdn/15.jpg','https://i.ibb.co/vJ92njj/18.jpg','https://i.ibb.co/nQfn5WX/17.jpg','https://i.ibb.co/3StR0Qv/39.jpg','https://i.ibb.co/jgFk76F/38.jpg','https://i.ibb.co/1rQMPPF/35.jpg','https://i.ibb.co/kM7bk71/34.jpg','https://i.ibb.co/Wz6BCZL/37.jpg','https://i.ibb.co/LJjdtwk/36.jpg','https://i.ibb.co/Kw7LZ0N/12.jpg','https://i.ibb.co/Wp1pkq9/11.jpg','https://i.ibb.co/GnjhHrc/14.jpg','https://i.ibb.co/mhVx1dv/13.jpg','https://i.ibb.co/NFqvGGj/10.jpg','https://i.ibb.co/Np2zf1b/42.jpg','https://i.ibb.co/vX5gCGx/20.jpg','https://i.ibb.co/NC2qH6Q/9.jpg','https://i.ibb.co/zZcTDTY/41.jpg','https://i.ibb.co/G7Gk3Kr/8.jpg','https://i.ibb.co/DYj1cNL/22.jpg','https://i.ibb.co/pxwd85B/43.jpg','https://i.ibb.co/dMCNCWF/21.jpg','https://i.ibb.co/Wsb6670/5.jpg','https://i.ibb.co/DwfFdw2/3.jpg','https://i.ibb.co/hFrHyDj/40.jpg','https://i.ibb.co/nfCKxS5/7.jpg','https://i.ibb.co/BPgrzgx/6.jpg','https://i.ibb.co/z2TcZ5y/28.jpg','https://i.ibb.co/LtbXzn6/27.jpg','https://i.ibb.co/C5RCwD9/29.jpg','https://i.ibb.co/z8MH4Z3/24.jpg','https://i.ibb.co/Zmzjxrd/23.jpg','https://i.ibb.co/gFh7DZj/26.jpg','https://i.ibb.co/CQVyYv0/25.jpg']
let ruto = naru[Math.floor(Math.random() * naru.length)]
      naruto = await getBuffer(ruto)
client.sendMessage(from, naruto, image, {quote: mek})
break

case 'kanna':
case 'kana':
case 'kann':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const kann =['https://i.ibb.co/RB2jSkr/63.jpg','https://i.ibb.co/CQSRKYc/31.jpg','https://i.ibb.co/X3sB7qK/27.jpg','https://i.ibb.co/LvdXMxH/26.jpg','https://i.ibb.co/6skvJyS/29.jpg','https://i.ibb.co/CB9RY7B/28.jpg','https://i.ibb.co/VLC0PbX/23.jpg','https://i.ibb.co/HCfjWRq/22.jpg','https://i.ibb.co/mBJN78j/25.jpg','https://i.ibb.co/6PrFv4v/24.jpg','https://i.ibb.co/bs6R87r/30.jpg','https://i.ibb.co/XLkvDdh/64.jpg','https://i.ibb.co/HqwS259/42.jpg','https://i.ibb.co/XyWDLfJ/41.jpg','https://i.ibb.co/4WyX9wn/37.jpg','https://i.ibb.co/6s6r1Yp/67.jpg','https://i.ibb.co/pfBHGZR/36.jpg','https://i.ibb.co/XjcvyBQ/39.jpg','https://i.ibb.co/R2BFDjR/38.jpg','https://i.ibb.co/NVCKyhm/33.jpg','https://i.ibb.co/23Vn5Vz/62.jpg','https://i.ibb.co/CvW0Nv9/32.jpg','https://i.ibb.co/PQ21cvK/66.jpg','https://i.ibb.co/nfDLmw4/35.jpg','https://i.ibb.co/tQFQgGw/65.jpg','https://i.ibb.co/1Q9mW1N/34.jpg','https://i.ibb.co/FhgGV0c/1.jpg','https://i.ibb.co/VY22fZ8/40.jpg','https://i.ibb.co/0VnmKb6/51.jpg','https://i.ibb.co/L80NCmb/53.jpg','https://i.ibb.co/6NDxzg4/52.jpg','https://i.ibb.co/bg8gmjL/5.jpg','https://i.ibb.co/QrzTQnW/48.jpg','https://i.ibb.co/RPmtr7L/4.jpg','https://i.ibb.co/sQRbbk3/47.jpg','https://i.ibb.co/tqx3nDT/50.jpg','https://i.ibb.co/zfVK5DR/7.jpg','https://i.ibb.co/WWdKJZ9/6.jpg','https://i.ibb.co/vz9sN0k/49.jpg','https://i.ibb.co/y4dPxZ4/44.jpg','https://i.ibb.co/TYDJZZY/43.jpg','https://i.ibb.co/NjZ2MYP/3.jpg','https://i.ibb.co/SJ8wbjX/46.jpg','https://i.ibb.co/cymzyW7/2.jpg','https://i.ibb.co/gRqvK4g/45.jpg','https://i.ibb.co/163wWVZ/9.jpg','https://i.ibb.co/n6p2r0M/8.jpg','https://i.ibb.co/ZxkFydr/11.jpg','https://i.ibb.co/B6wFjYs/10.jpg','https://i.ibb.co/GxBK9MN/61.jpg','https://i.ibb.co/RTRJ4T4/16.jpg','https://i.ibb.co/Qj9NWyC/59.jpg','https://i.ibb.co/KWf968b/58.jpg','https://i.ibb.co/s2ScnfN/15.jpg','https://i.ibb.co/b68MsLz/18.jpg','https://i.ibb.co/kH89t5b/17.jpg','https://i.ibb.co/3syNdWb/60.jpg','https://i.ibb.co/gRDWxnZ/55.jpg','https://i.ibb.co/BtNSZ21/12.jpg','https://i.ibb.co/dQgzSMs/54.jpg','https://i.ibb.co/Twxf36Q/14.jpg','https://i.ibb.co/gjNqLNV/57.jpg','https://i.ibb.co/fXWqCJw/56.jpg','https://i.ibb.co/2P3YyK7/13.jpg','https://i.ibb.co/jT3vdd6/20.jpg','https://i.ibb.co/c6tt70b/19.jpg','https://i.ibb.co/k5pP9kg/21.jpg']
let nna = kann[Math.floor(Math.random() * kann.length)]
      kana = await getBuffer(nna)
client.sendMessage(from, kana, image, {quote: mek})
break

case 'waifu':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())

const wai =['https://i.ibb.co/7V5Vxs3/29.jpg','https://i.ibb.co/TRdZWMN/28.jpg','https://i.ibb.co/v1R2Bf3/27.jpg','https://i.ibb.co/BTjfFzv/26.jpg','https://i.ibb.co/KhfKkf0/25.jpg','https://i.ibb.co/RPMvd1p/24.jpg','https://i.ibb.co/tCZdnnG/23.jpg','https://i.ibb.co/X5qSqRc/22.jpg','https://i.ibb.co/wMTKc4q/31.jpg','https://i.ibb.co/Dbstb5N/30.jpg','https://i.ibb.co/TqVXWM6/32.jpg','https://i.ibb.co/tb76SDW/40.jpg','https://i.ibb.co/hX8nP8B/39.jpg','https://i.ibb.co/qnFWLrV/38.jpg','https://i.ibb.co/PYhTyZH/37.jpg','https://i.ibb.co/Lh9BLcV/36.jpg','https://i.ibb.co/rfgZNg4/35.jpg','https://i.ibb.co/PT0m3JN/34.jpg','https://i.ibb.co/mhPW0Lx/33.jpg','https://i.ibb.co/cvDSqNz/3.jpg','https://i.ibb.co/jHhDwYN/41.jpg','https://i.ibb.co/f2cy67Y/43.jpg','https://i.ibb.co/R4RPwdL/42.jpg','https://i.ibb.co/N1BsqnV/7.jpg','https://i.ibb.co/NYb19v3/51.jpg','https://i.ibb.co/LYkxMgT/6.jpg','https://i.ibb.co/hWdsCq0/50.jpg','https://i.ibb.co/bBGVMDQ/5.jpg','https://i.ibb.co/64jm4j3/49.jpg','https://i.ibb.co/MGS23Fc/48.jpg','https://i.ibb.co/NZH8mX7/4.jpg','https://i.ibb.co/h1wcZy0/47.jpg','https://i.ibb.co/qNqkZHG/1.jpg','https://i.ibb.co/bmnkJM6/46.jpg','https://i.ibb.co/Pr5rk7Z/2.jpg','https://i.ibb.co/wRFrBgw/45.jpg','https://i.ibb.co/y8NjPK2/44.jpg','https://i.ibb.co/WWHC2S2/11.jpg','https://i.ibb.co/qm0yYS8/10.jpg','https://i.ibb.co/g9xdnq5/9.jpg','https://i.ibb.co/KXcSBNC/8.jpg','https://i.ibb.co/fxYNYWM/54.jpg','https://i.ibb.co/gV5RnvJ/53.jpg','https://i.ibb.co/34CG3Nr/52.jpg','https://i.ibb.co/jh49gSJ/18.jpg','https://i.ibb.co/vcqh8xF/61.jpg','https://i.ibb.co/hD0Gf8k/17.jpg','https://i.ibb.co/QnsPDxH/60.jpg','https://i.ibb.co/SJ82nVR/16.jpg','https://i.ibb.co/9g2tFpc/59.jpg','https://i.ibb.co/BrHSN5C/15.jpg','https://i.ibb.co/p0k7Z0f/58.jpg','https://i.ibb.co/4S6p3XQ/14.jpg','https://i.ibb.co/XYC6071/57.jpg','https://i.ibb.co/M9tGFcB/13.jpg','https://i.ibb.co/y6g3062/56.jpg','https://i.ibb.co/3fR9PZZ/12.jpg','https://i.ibb.co/5WpYLz0/55.jpg','https://i.ibb.co/NWrfVRT/21.jpg','https://i.ibb.co/sPpMBHQ/20.jpg','https://i.ibb.co/R4zTJS9/19.jpg','https://i.ibb.co/NnmPsx4/65.jpg','https://i.ibb.co/Y2KfNr3/64.jpg','https://i.ibb.co/4RXd5wC/63.jpg','https://i.ibb.co/PC18ZyG/62.jpg']
let waif = wai[Math.floor(Math.random() * wai.length)]
      waifu = await getBuffer(waif)
client.sendMessage(from, waifu, image, {quote: mek})
break

case 'loli':
	if (!isRegistered) return reply(ind.noregis())
reply(ind.wait())
const vu =['https://i.ibb.co/8jMFJLS/22.jpg','https://i.ibb.co/pbJknt8/21.jpg','https://i.ibb.co/3frJKPK/20.jpg','https://i.ibb.co/WgkfC3Q/63.jpg','https://i.ibb.co/zF0fqgC/29.jpg','https://i.ibb.co/KXYsk9C/62.jpg','https://i.ibb.co/jfvgcyH/28.jpg','https://i.ibb.co/9wL1fcL/61.jpg','https://i.ibb.co/7yyB3vZ/27.jpg','https://i.ibb.co/XSJTTj5/60.jpg','https://i.ibb.co/Y0zdDjr/26.jpg','https://i.ibb.co/m9RKKr8/25.jpg','https://i.ibb.co/Gnpwyw5/24.jpg','https://i.ibb.co/vJtTs6d/23.jpg','https://i.ibb.co/TKxmb60/9.jpg','https://i.ibb.co/4Y4xVXB/55.jpg','https://i.ibb.co/Y8Z3S4W/11.jpg','https://i.ibb.co/JFkNn6M/54.jpg','https://i.ibb.co/1bxFC4R/10.jpg','https://i.ibb.co/KNWqBFz/53.jpg','https://i.ibb.co/Jpbynx5/52.jpg','https://i.ibb.co/kcWPjhf/51.jpg','https://i.ibb.co/qrVHF8H/50.jpg','https://i.ibb.co/m9ywdqR/19.jpg','https://i.ibb.co/27JC0mY/18.jpg','https://i.ibb.co/9wzz02R/17.jpg','https://i.ibb.co/sj5bDQ9/16.jpg','https://i.ibb.co/4PpYwMp/59.jpg','https://i.ibb.co/yR686k4/15.jpg','https://i.ibb.co/t4HtmB9/58.jpg','https://i.ibb.co/yBCTWg4/14.jpg','https://i.ibb.co/qyD03cF/57.jpg','https://i.ibb.co/NxMy58Z/13.jpg','https://i.ibb.co/QrHwdPZ/56.jpg','https://i.ibb.co/PG8BK52/12.jpg','https://i.ibb.co/BP0tCsG/44.jpg','https://i.ibb.co/2vsGNB5/43.jpg','https://i.ibb.co/6wnNL3f/42.jpg','https://i.ibb.co/cQ41fW1/41.jpg','https://i.ibb.co/FHhsw0z/40.jpg','https://i.ibb.co/NrXpDSn/8.jpg','https://i.ibb.co/h9cT0ZJ/7.jpg','https://i.ibb.co/PT56Dqq/6.jpg','https://i.ibb.co/dkW7ZG8/49.jpg','https://i.ibb.co/wMMN45z/5.jpg','https://i.ibb.co/nnyG8zL/48.jpg','https://i.ibb.co/RPmtr7L/4.jpg','https://i.ibb.co/SnPPfXQ/47.jpg','https://i.ibb.co/JyY7rhP/3.jpg','https://i.ibb.co/w769bF3/46.jpg','https://i.ibb.co/FW1r8JJ/2.jpg','https://i.ibb.co/7WChLwT/45.jpg','https://i.ibb.co/fpc7vrg/1.jpg','https://i.ibb.co/JtTCzqt/69.jpg','https://i.ibb.co/FsPkRQy/68.jpg','https://i.ibb.co/N2bhjmN/67.jpg','https://i.ibb.co/ctcknwP/66.jpg','https://i.ibb.co/SBD95bq/65.jpg','https://i.ibb.co/Xtn32N7/64.jpg','https://i.ibb.co/pQ1Twkh/33.jpg','https://i.ibb.co/cYfHjHv/32.jpg','https://i.ibb.co/C2ZCRMv/31.jpg','https://i.ibb.co/sJBKymV/30.jpg','https://i.ibb.co/jL3X3vL/39.jpg','https://i.ibb.co/YjjHfwv/38.jpg','https://i.ibb.co/KsDTpy1/37.jpg','https://i.ibb.co/XDGCWLq/36.jpg','https://i.ibb.co/bs0RdwX/35.jpg','https://i.ibb.co/m5dg5KG/34.jpg']
    let vuvu = vu[Math.floor(Math.random() * vu.length)]
      kkj = await getBuffer(vuvu)
client.sendMessage(from, kkj, image, {quote: mek})
break
		
				

				case 'setprefix':
				case 'setpref':
					if (args.length < 1) return
				if (!isOwner) return reply(ind.ownerb())
					prefix = args[0]
					reply(`El nuevo Prefix es : ${prefix}`)
					break 
				case 'setlimit':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
					limitt = args[0]
					reply(`El nuevo limit es : ${limitt}`)
					break  
				case 'setnamebot':
					if (args.length < 1) return
				if (!isOwner) return reply(ind.ownerb())
					name = body.slice(12)
					reply(`Oki papi ahora mi nombre es uwu : ${name}`)
					break 
   				case 'piropos':
				client.updatePresence(from, Presence.composing) 
			if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
								const mary =['Algunos quieren ser ricos a través del dinero, otros del poder, pero lo que no saben, es que la única riqueza es tu amor verdadero.','Soñando contigo he tenido una revelación, ahora necesito que me hagas un hueco en tu corazón.','Aunque por tu corazón han pasado muchas personas, me gustaría que me hicieses un huequecito eterno, por pequeño que sea, por si pasa algo, para que no me olvides jamás.','Lo que siento por ti es tan inmenso que, para guardarlo, me haría falta otro universo.','me he convertido en un capitán pirata para asaltar tu corazón y robarle el amor.','Me preguntaste por qué te amaba y no pude responderte. Hoy entiendo que el amor verdadero es indescriptible, solo se puede sentir.','Ojalá fuese papel para poder envolverte, bombón.','Ansío besarte, abrazarte y no soltarte','A lo mejor mi hogar no es un palacio, pero me gustaría que tú fueses mi princesa.','Te amo demasiado, lo deseo todo contigo, por eso me vuelvo loc@, cuando tú no estás conmigo.','¿De casualidad tienes un mapa contigo? Porque tengo el interés de navegar por esa linda mirada','Desde que te he visto me he convertido un/a astronauta porque no he bajado de las galaxias','A pesar de que el cielo está lleno de estrellas, tú eres la más importante para mi','Si ser guapo fuera pcado, ya estarías haciendo penitencia','Los que dicen que Disneyland es el lugar más feliz del mundo no han estado junto a ti🥺','Si ser guapo matara, serías la bomba atómica😳','Si fuera gato, pasaría mis nueve vidas contigo','¿Y si nos comemos unos tacos y yo te a-taco a besos?']
					const js = mary[Math.floor(Math.random() * mary.length)]
					  wew = fs.readFileSync(`./src/5.jpg`)
					client.sendMessage(from, wew, image, { caption: '*ᎮᎥᏒᎧᎮᎧᏕ👌*\n\n'+ js, quoted: mek })
break  
		 				case 'setppbot':
		 				if (!isOwner) return reply(ind.ownerb())				
				    client.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Gracias por el perfil papi🙂')
					break

        			case 'reportarnum':
        			if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)		
					client.blockUser (`${body.slice(13)}@c.us`, "add")
					client.sendMessage(from, `El número: ${body.slice(13)}@c.us ah sido reportado 5 veces`, text)
					break
							case 'attp':
if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
				if (args.length < 1) return reply(`*Asi no ctm`)
				attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
				client.sendMessage(from, attp2, sticker, {quoted: mek})
				break
				               case 'neko':
if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
				gatauda = body.slice(4)
			reply(ind.wait())
				anu = await fetchJson(`https://alfians-api.herokuapp.com/api/nekonime`, {method: 'get'})
       if (anu.error) return reply('Este comando funciona con Internet no esta disponible')
								buffer = await getBuffer(anu.result)
				client.sendMessage(from, buffer, image, {quoted: mek})
				await limitAdd(sender)
				break
		case 'aesthetic':
				gatauda = body.slice(9)
if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
 			reply(ind.wait())
				anu = await fetchJson(`https://api.zeks.xyz/api/estetikpic?apikey=apivinz`, {method: 'get'})
				buffer = await getBuffer(anu.result.result)
				client.sendMessage(from, buffer, image, {quoted: mek, caption: '𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕'})
				await limitAdd(sender)
				break		
       case 'nickff': 
                    				if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
					if (!isGroup) return reply(mess.only.group)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.zeks.xyz/api/nickepep?apikey=apivinz`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Nick* : ${i}\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender)
					break           

		
      case 'chicasdark':     
      if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
	  reply(ind.wait())
      const cangti = ['https://i.ibb.co/sj2bPYF/d3d784f3b91e162931ee66ff5dcaad55.jpg','https://i.ibb.co/7vqJY0H/8cb259a728ab7e5715480d79f7788407.jpg','https://i.ibb.co/Vt0LJ6B/6983ec0960ccb23e083d31bce5bf98e1.jpg','https://i.ibb.co/tXXzFLg/9a0f4b592b2aa3dfd529550aeaeef315.jpg','https://i.ibb.co/yRH6LSj/f3c02087dc222ab778a4ebe0954e978c.jpg','https://i.ibb.co/F50JpNF/3c4e7fb4076c29deda1ae43c02bbbaf8.jpg','https://i.ibb.co/vw6rx02/ab647d85d13c3d0b64083ca833ca5592.jpg','https://i.ibb.co/JntPN2J/408802071cca03df4acf1fca7cd20b8a.jpg','https://i.ibb.co/YBx7V71/20ab363a93d4137d571ea62e747675e8.jpg','https://i.ibb.co/BsZ5sdT/e7df654fbdafc7d55cc933d0645c23c1.jpg','https://i.ibb.co/CQ1489z/7174f6dc7f9787eb046fdcffa4cbe46b.jpg','https://i.ibb.co/wg7LRz3/452168af14d11b130b7425751ee5e8f7.jpg','https://i.ibb.co/b5ZD1Gz/5394274e8fce9902cb343ce4ce69cc2f.jpg','https://i.ibb.co/YQhM9sx/088837e391be04f77f803a3f9c049fa4.jpg','https://i.ibb.co/VYqMssF/2385b5a3610210f47449dfdf24ad67e5.jpg','https://i.ibb.co/ZW0PzZ5/62bcf6eec04f9b585611274152a887c1.jpg']
      let cangtip = cangti[Math.floor(Math.random() * cangti.length)]
      k = await getBuffer(cangtip)
      client.sendMessage(from, k, image, {quote: mek})
	  await limitAdd(sender)
      break
      case 'wprandom':
      if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
				reply(ind.wait())
		        const canogti = ['https://i.ibb.co/6JTzpJJ/68.jpg','https://i.ibb.co/S7CXQmD/15.jpg','https://i.ibb.co/yP4fMMS/18.jpg','https://i.ibb.co/zRHq0qK/47.jpg','https://i.ibb.co/vD00z3C/10.jpg','https://i.ibb.co/NjLb90d/54.jpg','https://i.ibb.co/QDRJmYb/73.jpg','https://i.ibb.co/LkDygnF/39.jpg','https://i.ibb.co/jTqjqLq/58.jpg','https://i.ibb.co/2twGcMw/86.jpg','https://i.ibb.co/vwBDKRf/71.jpg','https://i.ibb.co/JCwQfcZ/9.jpg','https://i.ibb.co/Y8sm3k8/64.jpg','https://i.ibb.co/60LsdQq/76.jpg','https://i.ibb.co/mG8xMC9/5.jpg','https://i.ibb.co/8jM2Wnq/62.jpg','https://i.ibb.co/XWd1wyB/23.jpg','https://i.ibb.co/J36Qvy0/63.jpg','https://i.ibb.co/zRFXfXB/75.jpg','https://i.ibb.co/SNkpKBM/43.jpg','https://i.ibb.co/Yc1ntvk/21.jpg','https://i.ibb.co/ZV0KBN8/44.jpg','https://i.ibb.co/ByScQYM/56.jpg','https://i.ibb.co/gvr3grn/100.jpg','https://i.ibb.co/Mp6kM0S/98.jpg','https://i.ibb.co/str6WsD/93.jpg','https://i.ibb.co/xf1tqN8/53.jpg','https://i.ibb.co/BntKBDt/3.jpg','https://i.ibb.co/cQ2QrfN/103.jpg','https://i.ibb.co/kKMYf84/7.jpg','https://i.ibb.co/C2dJXLM/33.jpg','https://i.ibb.co/ykzwZ08/67.jpg','https://i.ibb.co/qM4z8GC/25.jpg','https://i.ibb.co/w0bPg7H/38.jpg','https://i.ibb.co/QmL9QT2/72.jpg','https://i.ibb.co/Qk4qKWh/85.jpg','https://i.ibb.co/QPyjj7M/29.jpg','https://i.ibb.co/pPKRz5x/46.jpg','https://i.ibb.co/52X0QGk/27.jpg','https://i.ibb.co/tK1XmTS/13.jpg','https://i.ibb.co/b5KFHHy/55.jpg','https://i.ibb.co/ZRD9Z7M/51.jpg','https://i.ibb.co/JH8D2Js/87.jpg','https://i.ibb.co/X38B1Ns/81.jpg','https://i.ibb.co/9Ztpn3y/2.jpg','https://i.ibb.co/g7P9NT4/26.jpg','https://i.ibb.co/j5m8sgf/8.jpg','https://i.ibb.co/njnkMWC/32.jpg','https://i.ibb.co/M80BmZZ/16.jpg','https://i.ibb.co/tQqGkCf/77.jpg','https://i.ibb.co/S6Np1Vm/49.jpg','https://i.ibb.co/TbkQk71/90.jpg','https://i.ibb.co/1GVqwsn/50.jpg','https://i.ibb.co/mb0Xr9X/59.jpg','https://i.ibb.co/WnDMywW/4.jpg','https://i.ibb.co/rbBvMX4/84.jpg','https://i.ibb.co/7twNvNX/74.jpg','https://i.ibb.co/jRKDHRz/48.jpg','https://i.ibb.co/KqqYTWk/89.jpg','https://i.ibb.co/qMQNSjG/12.jpg','https://i.ibb.co/FgNw4hb/11.jpg','https://i.ibb.co/9NW9VnZ/17.jpg','https://i.ibb.co/jMc9vdx/95.jpg','https://i.ibb.co/BskF3jg/104.jpg','https://i.ibb.co/yV56m6S/99.jpg','https://i.ibb.co/5GCxFC5/19.jpg','https://i.ibb.co/8mKGXzg/31.jpg','https://i.ibb.co/4VWX6dn/34.jpg','https://i.ibb.co/fq6LjHw/82.jpg','https://i.ibb.co/CbbP0QB/80.jpg','https://i.ibb.co/vPqyBCK/36.jpg','https://i.ibb.co/k5QxxBb/57.jpg','https://i.ibb.co/WymrdBf/102.jpg','https://i.ibb.co/cth1cwb/79.jpg','https://i.ibb.co/dJRTT6f/83.jpg','https://i.ibb.co/55szk9F/91.jpg','https://i.ibb.co/sgTbTLb/65.jpg','https://i.ibb.co/8rLfBDy/24.jpg','https://i.ibb.co/W0zbd1J/66.jpg','https://i.ibb.co/g7523mx/14.jpg','https://i.ibb.co/nB8CzdY/22.jpg','https://i.ibb.co/prbLDzX/101.jpg','https://i.ibb.co/r2sZVDR/37.jpg','https://i.ibb.co/t2pn4dL/94.jpg','https://i.ibb.co/F0CkFPp/35.jpg','https://i.ibb.co/7nwhZ3w/96.jpg','https://i.ibb.co/89r7C2b/20.jpg','https://i.ibb.co/TTYYgP3/69.jpg','https://i.ibb.co/JKp6Hqr/52.jpg','https://i.ibb.co/k8FknTC/41.jpg','https://i.ibb.co/37Nk23b/6.jpg','https://i.ibb.co/zSC3dHS/88.jpg','https://i.ibb.co/dLNthzx/60.jpg','https://i.ibb.co/3RPnFTc/105.jpg','https://i.ibb.co/kHbRF4Z/28.jpg','https://i.ibb.co/XYx1rFS/1.jpg','https://i.ibb.co/pxtTK6j/40.jpg','https://i.ibb.co/tKTjL9s/30.jpg','https://i.ibb.co/FHZt6NH/45.jpg','https://i.ibb.co/3kV41Nj/42.jpg','https://i.ibb.co/WDGcQ4X/78.jpg','https://i.ibb.co/XYh4fqF/70.jpg','https://i.ibb.co/B3rHm58/61.jpg','https://i.ibb.co/Vqxn77Z/97.jpg','https://i.ibb.co/DQ5P1Xq/92.jpg']
		        let canbgtip = canogti[Math.floor(Math.random() * canogti.length)]
                h = await getBuffer(canbgtip)
                client.sendMessage(from, h, image, {quote: mek, caption: `*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*`})
		        await limitAdd(sender)
                break
                                         case 'wpanime':
                                         if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
				
							reply(ind.wait())
					                                const canugti = ['https://i.ibb.co/sF5Fdt1/1d15523b5b93da72799e1c3b92ef5fef.jpg','https://i.ibb.co/17Lbj2j/44764f88fd4c43fb6db7c2d4e226ee9a.jpg','https://i.ibb.co/qBn79dv/041cf4ee7596e251cbe9b8d95ac69ab2.jpg','https://i.ibb.co/4WbBKXY/0580e84577023fcb3d7b65490be66f69.jpg','https://i.ibb.co/Fgxd6tS/cf3ff3a484d851fc077ef5e5c81c9d65.jpg','https://i.ibb.co/ZMBynRh/e7a7ddbeafa8c14e249691a7c3c4c0b2.jpg','https://i.ibb.co/KGL9m5g/dd40d5d0fe5b1df5097ca4400ae2ad16.jpg','https://i.ibb.co/ZMZYmKz/419b0bddd10310b8611653055ec8c7b0.jpg','https://i.ibb.co/jy8sgbh/c401a02422508128821921b31539091e.jpg','https://i.ibb.co/02M4h6S/5b1871bba0fb4b4e01c4356bdd93cd86.jpg','https://i.ibb.co/997FbVT/133053afa7ee650e45f782ce8475aed8.jpg','https://i.ibb.co/xzPvvDv/18cf2c41770f9edbbf31be8bec2fb0b2.jpg','https://i.ibb.co/HYn2B4Q/702c6cf7e374a02d1da0a5f794858a38.jpg','https://i.ibb.co/7nxQBkY/f2bcf894118518cd15fd69b033da78d1.jpg','https://i.ibb.co/yd61B8v/0d12c692d699ae3ff158d54d2fe02971.jpg','https://i.ibb.co/vD8HsGD/8dcea7573f193abf7ea26aefdc8f6949.jpg','https://i.ibb.co/1Z89RJT/ec77640a70d388ab3689b922b488e000.jpg','https://i.ibb.co/98bLyLD/6c54a7a35f7c3a3a974b15b0c9c666fa.jpg','https://i.ibb.co/nsxPVMx/d51a5164ed57c571de2f337823cdfe0d.jpg','https://i.ibb.co/r4QNhf1/e62aadd019b27bcc954f9f463a8a268d.jpg','https://i.ibb.co/Qfp7vS7/4838313f143a833ec931ac026665de39.jpg','https://i.ibb.co/fYqMq9T/a7134ce6fba2dc5efd9faa6fe4213444.jpg','https://i.ibb.co/ZN397Tk/06ebb4fbc32809c99f173b3ac5596c68.jpg','https://i.ibb.co/ZdCV7G8/cca874c663aeb20eed0baa477de679cc.jpg','https://i.ibb.co/s5TJN3L/5db7c137c1f672e15dc98910aef3a77a.jpg','https://i.ibb.co/r3k8sWQ/ca50357dd6a4638dd9199d02ac810828.jpg','https://i.ibb.co/h1tMDLD/e0e5d60bdfb0c93eb723a1d0e15d6756.jpg','https://i.ibb.co/3NXvXwR/d10db58ff9114e1575de143b723ddc9b.jpg','https://i.ibb.co/fMbJ33j/83850d24bd8312104701f3e93bdaa3e0.jpg','https://i.ibb.co/mcrsqsw/d65716315dc8cf5df3e438f6adf95c9e.jpg','https://i.ibb.co/hY3N02B/6bcee3571197465654c97683d0ed0e20.jpg','https://i.ibb.co/Js1sLBh/124d64ed1227aa1487a2c42b24f8837a.jpg','https://i.ibb.co/Kjc5NkN/993ccbdf49d7e1e256274cafc2585eef.jpg','https://i.ibb.co/p0sjxGX/3a741a4634e9445c5f93bf325b75ef2a.jpg','https://i.ibb.co/BqkFmY3/064bab224123321def4b21d224fe8e82.jpg','https://i.ibb.co/rfTwhXz/logo.jpg','https://i.ibb.co/H7C2bJD/7896dbb5d93ce36a81399c9e24e0e9fa.jpg','https://i.ibb.co/rbs9ZG0/506ab25382f022726b879c2fed3179a0.jpg','https://i.ibb.co/gj2JCZm/3d71bc19b7e56e23c94de9a2da33ba3e.jpg','https://i.ibb.co/WKZV6yG/79f8e21c88ca8044a2350024675d34ef.jpg','https://i.ibb.co/427Lj3L/7f6d1e9f9a4d3316c4f6834a2fe7ec32.jpg','https://i.ibb.co/R9SXJS1/7858da10a6d8dc3a7b3d06c437dcf5c7.jpg','https://i.ibb.co/BZwM4xL/32fb465027798249e815b5473ee0d210.jpg','https://i.ibb.co/7WX24j5/b91c79ea703cd93de96656ab60cdd789.jpg','https://i.ibb.co/K5bjZY2/bb6bbe2a3295c8539970c2111f239b4b.jpg','https://i.ibb.co/SVc69Dk/54b136d4d9a52df59901fc6c675cd960.jpg','https://i.ibb.co/Wxrmn1Z/0e6c1b49b5629101da59f06db122ad19.jpg','https://i.ibb.co/zFf5KFZ/6ed2bedc080a9e8c3b267d927433e7bf.jpg','https://i.ibb.co/6Zpkx7M/075d4b0ea4e6a5bac6085bbe9157ba37.jpg','https://i.ibb.co/Tq6YJyS/c0ebcbd97922d1271629ab87469dc0c7.jpg','https://i.ibb.co/RgVcvh8/be54e24e4a7276b1d3cc830a03fd4676.jpg','https://i.ibb.co/61G5nQb/6f8c4afef5b7ddf538447dc218ca0ef8.jpg','https://i.ibb.co/QdkJ0Y8/da76b20813815efd1dbf84116501b25a.jpg','https://i.ibb.co/S3pKHft/1ec2838d5cd0cd53eaface83a1bfa921.jpg','https://i.ibb.co/9GW77Vn/5983cbabf5827793558ee7fddbaf173f.jpg','https://i.ibb.co/WpbQWqH/74ba70dce0b89460129a05ed13380aa0.jpg','https://i.ibb.co/Bwh0MS4/8ea55d8ccaa10c5b3ff540e0e08f802e.jpg','https://i.ibb.co/2c1cymy/56142f816478a819ce32453a2f917af5.jpg','https://i.ibb.co/BGfjR8M/923f89fd65d33f823028ce2944a8fb77.jpg','https://i.ibb.co/TRMb2r3/9bef9de9f522d30de4ed4c07abd2de92.jpg']
                                        let canigtip = canugti[Math.floor(Math.random() * canugti.length)]
                                        	l = await getBuffer(canigtip)
                                        client.sendMessage(from, l, image, {quote: mek, caption: `*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*`})
					await limitAdd(sender)
                                        break
    case 'lesbi':
	if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
    const cu =['Eres 0% Lesbi' , 'Eres 1% Lesbi' , 'Eres 2% Lesbi' , 'Eres 3% Lesbi' , 'Eres 4% Lesbi' , 'Eres 5% Lesbi' , 'Eres 6% Lesbi' , 'Eres 7% Lesbi' , 'Eres 8% Lesbi' , 'Eres 9% Lesbi' , 'Eres 10% Lesbi' , 'Eres 11% Lesbi' , 'Eres 12% Lesbi' , 'Eres 13% Lesbi' , 'Eres 14% Lesbi' , 'Eres 15% Lesbi' , 'Eres 16% Lesbi' , 'Eres 17% Lesbi' , 'Eres 18% Lesbi' , 'Eres 19% Lesbi' , 'Eres 20% Lesbi' , 'Eres 21% Lesbi' , 'Eres 22% Lesbi' , 'Eres 23% Lesbi' , 'Eres 24% Lesbi' , 'Eres 25% Lesbi' , 'Eres 26% Lesbi' , 'Eres 27% Lesbi' , 'Eres 28% Lesbi' , 'Eres 29% Lesbi' , 'Eres 30% Lesbi' , 'Eres 31% Lesbi' , 'Eres 32% Lesbi' , 'Eres 33% Lesbi' , 'Eres 34% Lesbi' , 'Eres 35% Lesbi' , 'Eres 36% Lesbi' , 'Eres 37% Lesbi' , 'Eres 38% Lesbi' , 'Eres 39% Lesbi' , 'Eres 40% Lesbi' , 'Eres 41% Lesbi' , 'Eres 42% Lesbi' , 'Eres 43% Lesbi' , 'Eres 44% Lesbi' , 'Eres 45% Lesbi' , 'Eres 46% Lesbi' , 'Eres 47% Lesbi' , 'Eres 48% Lesbi' , 'Eres 49% Lesbi' , 'Eres 50% Lesbi' , 'Eres 51% Lesbi' , 'Eres 52% Lesbi' , 'Eres 53% Lesbi' , 'Eres 54% Lesbi' , 'Eres 55% Lesbi' , 'Eres 56% Lesbi' , 'Eres 57% Lesbi' , 'Eres 58% Lesbi' , 'Eres 59% Lesbi' , 'Eres 60% Lesbi' , 'Eres 61% Lesbi' , 'Eres 62% Lesbi' , 'Eres 63% Lesbi' , 'Eres 64% Lesbi' , 'Eres 65% Lesbi' , 'Eres 66% Lesbi' , 'Eres 67% Lesbi' , 'Eres 68% Lesbi' , 'Eres 69% Lesbi' , 'Eres 70% Lesbi' , 'Eres 71% Lesbi' , 'Eres 72% Lesbi' , 'Eres 73% Lesbi' , 'Eres 74% Lesbi' , 'Eres 75% Lesbi' , 'Eres 76% Lesbi' , 'Eres 77% Lesbi' , 'Eres 78% Lesbi' , 'Eres 79% Lesbi' , 'Eres 80% Lesbi' , 'Eres 81% Lesbi' , 'Eres 82% Lesbi' , 'Eres 83% Lesbi' , 'Eres 84% Lesbi' , 'Eres 85% Lesbi' , 'Eres 86% Lesbi' , 'Eres 87% Lesbi' , 'Eres 88% Lesbi' , 'Eres 89% Lesbi' , 'Eres 90% Lesbi' , 'Eres 91% Lesbi' , 'Eres 92% Lesbi' , 'Eres 93% Lesbi' , 'Eres 94% Lesbi' , 'Eres 95% Lesbi' , 'Eres 96% Lesbi' , 'Eres 97% Lesbi' , 'Eres 98% Lesbi' , 'Eres 99% Lesbi' , 'Eres 100% Lesbi']														
  	const ri = cu[Math.floor(Math.random() * cu.length)]
					wnw = fs.readFileSync(`./src/5.jpg`)						
						client.sendMessage(from, wnw, image, { caption: '*Que tan lesbi eres*\n\n'+ ri, quoted: mek })
					break                                      

							case 'reto':
							if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
					const dare =['Te reto a poner en tu info de Whatsapp que te gusta Anuel por 24 horas','Te reto a decirle a tu crush que la amas y pasar cap en el grupo','Te reto a poner en tu estado que buscas pareja','Te reto a poner en tu perfil la foto de tu crush','Te reto a decirle a alguien que te gusta...','Te reto a mandar un audio cantando','Te reto mandar audio hablando con vos de niña de 5 años','Te reto a poner en tu info que te gusta tu vecin@','Te reto mandar una foto tuya sin taparte la cara','Te reto a decir que apodo tenias cuando eras un/a niñ@ aun','Te reto a enviar un vídeo bailando','Te reto a enviar el último meme que allas visto','Te reto a enviar tu canción favorita']
					const der = dare[Math.floor(Math.random() * dare.length)]
				wbw = fs.readFileSync(`./src/4.jpg`)
							
						client.sendMessage(from, wbw, image, { quoted: mek, caption: '*Reto 😈*\n\n'+ der })
					break	
					case 'gay':
				if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
					const gay =['Eres 0% gay' , 'Eres 1% gay' , 'Eres 2% gay' , 'Eres 3% gay' , 'Eres 4% gay' , 'Eres 5% gay' , 'Eres 6% gay' , 'Eres 7% gay' , 'Eres 8% gay' , 'Eres 9% gay' , 'Eres 10% gay' , 'Eres 11% gay' , 'Eres 12% gay' , 'Eres 13% gay' , 'Eres 14% gay' , 'Eres 15% gay' , 'Eres 16% gay' , 'Eres 17% gay' , 'Eres 18% gay' , 'Eres 19% gay' , 'Eres 20% gay' , 'Eres 21% gay' , 'Eres 22% gay' , 'Eres 23% gay' , 'Eres 24% gay' , 'Eres 25% gay' , 'Eres 26% gay' , 'Eres 27% gay' , 'Eres 28% gay' , 'Eres 29% gay' , 'Eres 30% gay' , 'Eres 31% gay' , 'Eres 32% gay' , 'Eres 33% gay' , 'Eres 34% gay' , 'Eres 35% gay' , 'Eres 36% gay' , 'Eres 37% gay' , 'Eres 38% gay' , 'Eres 39% gay' , 'Eres 40% gay' , 'Eres 41% gay' , 'Eres 42% gay' , 'Eres 43% gay' , 'Eres 44% gay' , 'Eres 45% gay' , 'Eres 46% gay' , 'Eres 47% gay' , 'Eres 48% gay' , 'Eres 49% gay' , 'Eres 50% gay' , 'Eres 51% gay' , 'Eres 52% gay' , 'Eres 53% gay' , 'Eres 54% gay' , 'Eres 55% gay' , 'Eres 56% gay' , 'Eres 57% gay' , 'Eres 58% gay' , 'Eres 59% gay' , 'Eres 60% gay' , 'Eres 61% gay' , 'Eres 62% gay' , 'Eres 63% gay' , 'Eres 64% gay' , 'Eres 65% gay' , 'Eres 66% gay' , 'Eres 67% gay' , 'Eres 68% gay' , 'Eres 69% gay' , 'Eres 70% gay' , 'Eres 71% gay' , 'Eres 72% gay' , 'Eres 73% gay' , 'Eres 74% gay' , 'Eres 75% gay' , 'Eres 76% gay' , 'Eres 77% gay' , 'Eres 78% gay' , 'Eres 79% gay' , 'Eres 80% gay' , 'Eres 81% gay' , 'Eres 82% gay' , 'Eres 83% gay' , 'Eres 84% gay' , 'Eres 85% gay' , 'Eres 86% gay' , 'Eres 87% gay' , 'Eres 88% gay' , 'Eres 89% gay' , 'Eres 90% gay' , 'Eres 91% gay' , 'Eres 92% gay' , 'Eres 93% gay' , 'Eres 94% gay' , 'Eres 95% gay' , 'Eres 96% gay' , 'Eres 97% gay' , 'Eres 98% gay' , 'Eres 99% gay' , 'Eres 100% gay']									
					const gai = gay[Math.floor(Math.random() * gay.length)]
								wiw = fs.readFileSync(`./src/5.jpg`)
										client.sendMessage(from, wiw, image, { quoted: mek, caption: '*Que tan gay eres*\n\n'+ gai })
									break
									
									case 'verdad':
									if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
					const trut =['Con quien de los que están aqui en el grupo te besarías? (etiqueta)','¿Alguna vez te ha gustado alguien? ¿Cuanto tiempo?','Alunga vez te llegó a gustar el/la herman@ de tu mejor amig@?','Cuantos años tienes?','Cuanto tiempo ah pasado desde que diste tu último beso?','Te gustan los chicos o las chicas o ambos?','Que opinas sobre BTS','Que opinas sobre l@s administradores','Tienes novi@?','Cuantas veces te as sentido ignorad@ por tu pareja o insuficiente para el/ella?','Que opinas de la nueva política de Whatsapp?','Que opinas sobre Telegram?','Tienes canal de Youtube?','Que opinas sobre Este bot?','Que opinas sobre el grupo?','Que tal te parece esta función de verdad o reto?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					wuw = fs.readFileSync(`./src/6.jpg`)						
						client.sendMessage(from, wuw, image, { caption: '*Verdad😇*\n\n'+ ttrth, quoted: mek })
					break
				case 'menherachan':
				if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=menhera-chan`, {method: 'get'})
					reply(ind.wait())
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					await limitAdd(sender)
					break				

				case 'toimg':
				case 'toimig':
				case 'img':
					if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
					if (!isQuotedSticker) return reply(' etiqueta un sticker')
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran= getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(' Fallo ')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>.<'})
						fs.unlinkSync(ran)
					})
					await limitAdd(sender) 
					break				
				
			
									 case 'ccgenerator': 
	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
                   reply(`_[❕] Cargando_`)
				   anu = await fetchJson(`https://videfikri.com/api/ccgenerator/`, {method:'get'})
				   teks = `*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*\n\n*ᎶᏋᏁᏋᏒᏗᎴᎧᏒ ᎴᏋ ૮૮*\n*┏━⊱ɴᴜᴍᴇʀᴏ*\n*┗⊱${anu.result.card.number}*\n*┏━⊱ᴛɪᴘᴏ*\n*┗⊱${anu.result.card.network}*\n*┏━⊱ᴄᴠᴠ*\n*┗⊱️${anu.result.card.cvv}*\n*┏━⊱ᴘɪɴ*\n*┗⊱️️${anu.result.card.pin}*\n*┏━⊱ᴅɪɴᴇʀᴏ*\n*┗⊱${anu.result.card.balance}*\n*┏━⊱ᴇxᴘɪʀᴀ ᴇɴ ᴇʟ*\n*┗⊱${anu.result.card.expiration_month}/${anu.result.card.expiration_year}*\n*┏━⊱ᴘᴀɪs*\n*┗⊱️${anu.result.customer.country}*\n*♻️ɴᴏᴍʙʀᴇ*: *${anu.result.customer.name}*\n*┏━⊱ᴅɪʀᴇᴄᴄɪóɴ*\n*┗⊱${anu.result.customer.address}*`
				   client.sendMessage(from, teks, text, {quoted: mek})
				   await limitAdd(sender)
				   break	
			    	case 'help': 
		            case 'menu':
		            case 'menú':
		            case 'meni':
		            case 'mení':
		            case 'hel':
	            	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
 const reqXp  = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
				    const uangku = checkATMuser(sender)
					const pepolu = JSON.parse(fs.readFileSync('./database/bot/totalcmd.json'))[0].totalcmd
                    const u = ['5','4','7']						
			    	const y = u[Math.floor(Math.random() * u.length)]
                    wew = fs.readFileSync(`./src/${y}.jpg`)                    
                    confu = `*╭═┅┅ৡৢ͜͡✦═╡꧁𝑾𝒂𝒊𝒇𝒖꧂╞═┅┅ৡৢ͜͡✦═╮*
*║┊: * ⃟ ⃟  ━ೋ๑—————๑ೋ━* ⃟ ⃟ *      
*║┊:◄🔥┢┅ீ͜ৡৢ͜͡✦━━◇━━ீ͜ৡৢ͜͡✦┅┧🔥►*
*║┊:*      ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈  
*║┊:𝑪𝒓𝒆𝒂𝒅𝒐𝒓 : 𝑪𝒐𝒏𝒇𝒖*
*║┊:𝑵𝒖𝒎𝒆𝒓𝒐 : wa.me/51923568749*
*║┊:YT : Confu_Mods*
*║┊:*      ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ 
*║┊:◄🔥┢┅ீ͜ৡৢ͜͡✦━━◇━━ீ͜ৡৢ͜͡✦┅┧🔥►*
*║┊:  * ⃟ ⃟  ━ೋ๑—————๑ೋ━* ⃟ ⃟ *   
*╰═┅┅ৡৢ͜͡✦═╡꧁𝑾𝒂𝒊𝒇𝒖꧂╞═┅┅ৡৢ͜͡✦═╯*

╭▬▬▬▬▬▬▬▬ *˚✯ཻ⸙۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪۪ࣤ ̥•┉┉•
⊱✦•*𝑻𝑼 𝑰𝑵𝑭𝑶𝑹𝑴𝑨𝑪𝑰𝑶𝑵*
▋╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅   
▋┋ *Tu Dinero: Rp${uangku}*
▋┋ *XP: ${getLevelingXp(sender)}*
▋┋ *Level: ${getLevelingLevel(sender)}*
▋┋ *Rol :${role}*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑰𝑵𝑭𝑶 𝑫𝑬 𝑬𝑳 𝑩𝑶𝑻*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}info_*
▋┋ *_${prefix}infogc_*
▋┋ *_${prefix}speed_*
▋┋ *_${prefix}creador_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺 𝑵𝑼𝑬𝑽𝑶𝑺*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}sad texto_*
▋┋ *_${prefix}break texto_*
▋┋ *_${prefix}avg texto/texto_*
▋┋ *_${prefix}marvel texto/texto_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑴𝑬𝑫𝑰𝑨*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}edits_*
▋┋ *_${prefix}say1_*
▋┋ *_${prefix}say2_*
▋┋ *_${prefix}say3_*
▋┋ *_${prefix}miku_*
▋┋ *_${prefix}shotovd_*
▋┋ *_${prefix}kannavd_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑪𝑹𝑬𝑨𝑫𝑶𝑹*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}sad texto_*
▋┋ *_${prefix}attp texto_*
▋┋ *_${prefix}glow texto_*
▋┋ *_${prefix}tlight texto_*
▋┋ *_${prefix}bpink texto_*
▋┋ *_${prefix}glass texto_*
▋┋ *_${prefix}break texto_*
▋┋ *_${prefix}tts es texto_*
▋┋ *_${prefix}matrix texto_*
▋┋ *_${prefix}leavest texto_*
▋┋ *_${prefix}crismes texto_*
▋┋ *_${prefix}lighttext texto_*
▋┋ *_${prefix}avg texto/texto_*
▋┋ *_${prefix}goldbutton text_*
▋┋ *_${prefix}silverbutton text_*
▋┋ *_${prefix}wlogo texto/texto_*
▋┋ *_${prefix}marvel texto/texto_*
▋┋ *_${prefix}phlogo texto/texto_*
▋┋ *_${prefix}quotemaker txt/txt/random_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑳𝑰𝑴𝑰𝑻 𝒀 𝑫𝑰𝑵𝑬𝑹𝑶*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}lb_*
▋┋ *_${prefix}limit_*
▋┋ *_${prefix}level_*
▋┋ *_${prefix}minar_*
▋┋ *_${prefix}cartera_*
▋┋ *_${prefix}giftlimit_*
▋┋ *_${prefix}event [1/0]_*
▋┋ *_${prefix}buylimit [monto]_*
▋┋ *_${prefix}transferir [@ | monto]_*
▋┋ *_${prefix}leveling [activar/activar]_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑨𝑵𝑰𝑴𝑬*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}loli_*
▋┋ *_${prefix}neko_*
▋┋ *_${prefix}waifu_*
▋┋ *_${prefix}kanna_*
▋┋ *_${prefix}hinata_*
▋┋ *_${prefix}naruto_*
▋┋ *_${prefix}sakura_*
▋┋ *_${prefix}sasuke_*
▋┋ *_${prefix}luffywp_*
▋┋ *_${prefix}shotowp_*
▋┋ *_${prefix}wpanime_*
▋┋ *_${prefix}menherachan_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑨𝑫𝑴𝑰𝑵*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}eliminar @_*
▋┋ *_${prefix}dar @_*
▋┋ *_${prefix}quitar @_*
▋┋ *_${prefix}setname_*
▋┋ *_${prefix}setdesc_*
▋┋ *_${prefix}welcome_*
▋┋ *_${prefix}nsfw_*
▋┋ *_${prefix}grupo_*
▋┋ *_${prefix}tagme_*
▋┋ *_${prefix}tagall_*
▋┋ *_${prefix}infogc_*
▋┋ *_${prefix}linkgroup_*
▋┋ *_${prefix}listadmins_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑵𝑺𝑭𝑾/𝑯𝑬𝑵𝑻𝑨𝑰*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}random_*
▋┋ *_${prefix}recomienda_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑶𝑻𝑹𝑶𝑺*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}lirik_*
▋┋ *_${prefix}lirik_*
▋┋ *_${prefix}reto_*
▋┋ *_${prefix}bot1_*
▋┋ *_${prefix}bot2_*
▋┋ *_${prefix}bot3_*
▋┋ *_${prefix}perfil_*
▋┋ *_${prefix}toimg_*
▋┋ *_${prefix}nickff_*
▋┋ *_${prefix}delete_*
▋┋ *_${prefix}frases_*
▋┋ *_${prefix}sticker_*
▋┋ *_${prefix}memes_*
▋┋ *_${prefix}piropos_*
▋┋ *_${prefix}listonline*
▋┋ *_${prefix}totaluser_*
▋┋ *_${prefix}pinterest_*
▋┋ *_${prefix}attp texto_*
▋┋ *_${prefix}reportnum_*
▋┋ *_${prefix}wprandom_*
▋┋ *_${prefix}chicasdark_*
▋┋ *_${prefix}ccgenerator_*
▋┋ *_${prefix}tts es texto_*
▋┋ *_${prefix}pinterest nombre_*
▋┋ *_${prefix}recomienda.anime_*
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
╭────────────────────╮
*➼✰︙𝑴𝑬𝑵𝑼 𝑫𝑬 𝑪𝑶𝑵𝑭𝑼*
╰────────────────────╯
■█🔥█🔥█■▰▱▰▱▰▱■█🔥█🔥█■
▋┋ *_${prefix}ban_*
▋┋ *_${prefix}block_*
▋┋ *_${prefix}unblok_*
▋┋ *_${prefix}clearall_*
▋┋ *_${prefix}salir_*
═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡═️ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ۣٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜۜ͜͡♕͜͡
*(•♛•)─•••──ೇุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุุ──────﹒ׂׂૢ་༘࿐ೢִֶָ──╮*
*▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄*        
    *┏ೋ┉━┉ೋ✧ೋ┉━┉ೋ┓*
             *🔥𝑪𝑶𝑵𝑭𝑼_𝑴𝑶𝑫𝑺🔥*
    *┗ೋ┉━┉ೋ✧ೋ┉━┉ೋ┛*
*▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀*       
   ۝ٜٜٜٜٜٜٜ҈⸙ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ٜٜٜٜ✞ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ͜҈͡۝ٜٜٜٜٜٜٜ҈⸙ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ٜٜٜٜ✞ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ͜҈͡۝ٜٜٜٜٜٜٜ҈⸙ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ٜٜٜٜ✞ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ͜҈͡۝ٜٜٜٜٜٜٜ҈⸙ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ٜٜٜٜ✞ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ͜҈͡۝ٜٜٜٜٜٜٜ҈⸙ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ٜٜٜٜ✞ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ͜҈͡۝ٜٜٜٜٜٜٜ҈ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ͜҈ٜٜٜٜٜٜٜ͡҈⸙ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ҈ٜٜٜٜ✞ٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜٜ©`
                    client.sendMessage(from, wew, image, { quoted: mek, caption: confu })
                    break
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
    			case 'perfil':
    				client.updatePresence(from, Presence.composing)
				if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
    				try {
					profil = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
					profil = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
					   const uaangku = checkATMuser(sender)
					profile = `╭─「 *PERFIL* 」
│• *Nombre:* ${pushname}
│• *Rol :${role}*
│• *Usuario registrado:* ✅
│• *Tu Dinero: Rp${uaangku}*
│• *XP: ${getLevelingXp(sender)}*
│• *Level: ${getLevelingLevel(sender)}*				
│• *Link:* wa.me/${sender.split("@")[0]}
╰─────────────────────`
	 				buff = await getBuffer(profil)
					client.sendMessage(from, buff, image, {quoted: mek, caption: profile})
					break
										
																	 
                case 'break':
             	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
                bbs = `${body.slice(7)}`
                     if (args.length < 1) return reply('Donde esta el texto??')
                     buff = await getBuffer(`https://api.zeks.xyz/api/breakwall?apikey=apivinz&text=${bbs}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  					
case 'sad':
             	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
                sad = `${body.slice(5)}`
                     if (args.length < 1) return reply('Donde esta el texto??')
                     buff = await getBuffer(`https://api.zeks.xyz/api/dropwater?apikey=apivinz&text=${sad}`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
        						
case 'avg':
		if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					gh = `${body.slice(5)}`
					FFF1 = gh.split("/")[0];
					FFF2 = gh.split("/")[1];				
					if (args.length < 1) return reply('Donde esta el texto?')	
					reply(ind.wait())					
		    buffer = await getBuffer(`https://api.zeks.xyz/api/logoaveng?text1=${FFF1}&text2=${FFF2}&apikey=apivinz`, {method: 'get'})
		        client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break													

case 'marvel':
		if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					gh = `${body.slice(8)}`
					mrv = gh.split("/")[0];
					mrvl = gh.split("/")[1];				
					if (args.length < 1) return reply('Donde esta el texto?')	
					reply(ind.wait())					
		    buffer = await getBuffer(`https://api.zeks.xyz/api/marvellogo?text1=${mrv}&text2=${mrvl}&apikey=apivinz`, {method: 'get'})
		        client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break													
																	
																				
																																		
							case 'info':
					me = client.user
					user.push(sender)
					uptime = process.uptime()
					teks = `╔═╦═══• •✠•❀•✠ • •════╗
║✧ུ║          「 𝑰𝑵𝑭𝑶 」                     
║✧ུ║ུNombre : *𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*
║✧ུ║ུCreador : *Confu*             
║✧ུ║Sociaུ : *Toru*             
║✧ུ║ུEstado : *ACTIVO*                          
║✧ུ║ུPrefix : *❪${prefix}❫*                
║✧ུ║ུTotal Block : *${blocked.length}*
║✧ུ║ུTotal Usuarios : *${user.length}*
╚═╩═══• •✠•❀•✠ • •════╝

*❰⚠❱_Nota: Para agregar el bot a tu grupo por un mes debes pagar con grupo Antiguo, número o zing_❰⚠❱*`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break 
					case 'join':
					reply(`*❰⚠❱_Para agregar el bot a tu grupo por un mes debes pagar con grupo Antiguo, número o zing_❰⚠❱*`)
				break
				case 'totaluser':
					client.updatePresence(from, Presence.composing) 
						if (!isOwner) return reply(ind.ownerb())
					if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					teks = `╭────「 *TOTAL USUARIOS ${name}* 」\n`
					no = 0
					for (let hehehe of user) {
						no += 1
						teks += `[${no.toString()}] @${hehehe.split('@')[0]}\n`
					}
					teks += `\n╰──────⎿ *BOT* ⏋────`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": user}})
					break				    
				    
				    
    
    
           								case 'readmore':
					if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
					if (args.length < 1) return reply('Donde esta el texto?')
					var kls = body.slice(9)
					var has = kls.split("/")[0];
					var kas = kls.split("/")[1];
					if (args.length < 1) return reply(mess.blank)
					client.sendMessage(from, `${has}‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎${kas}` , text, { quoted: mek })
					break
									case 'creador':
									case 'creator':
								case 'confu':
									 
           reply(`╭────「 *𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕* 」────
─
│x *Nombre: Rafael*
│x *Pais de origen: Venezuela*
│x *Nick: Confu*
│x *wa.me/51923568749*
│x *https://t.me/Papi_confu_bb*
─ 
╰────「 *𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕* 」────`) 
                       client.sendMessage(from, {displayname: "Confu", vcard: vcard}, MessageType.contact, { quoted: mek})
                                               break
				case 'infogc':
				case 'groupinfo':
				case 'infogrup':
				case 'grupinfo':
			if (isLimit(sender)) return reply(ind.limitend(pusname))  
 if	(!isRegistered) return reply(ind.noregis())				
                client.updatePresence(from, Presence.composing)
                try {
					ppUrl = await client.getProfilePicture(from)
					} catch {
					ppUrl = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
                reply(ind.wait()) // leave empty to get your own
			    buffer = await getBuffer(ppUrl)
		        client.sendMessage(from, buffer, image, {quoted: mek, caption: `*Nombre* : ${groupName}\n*Miembros* : ${groupMembers.length}\n*Admins* : ${groupAdmins.length}\n*Descripcion* : ${groupDesc}`})
                break 
						case 'linkgroup':
				case 'linkgrup':
				case 'linkgc':
				case 'gruplink':
				case 'grouplink':
					if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				

		if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())			   
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\Este es el link de el grupo : *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        break
				case 'salir': 
						if (!isOwner) return reply(ind.ownerb())
			    	anu = await client.groupLeave(from, `Bye A todos *${groupMetadata.subject}*`, groupId)
	                break
 			case 'setname':
				if (isLimit(sender)) return reply(ind.limitend(pusname))  
				  if	(!isRegistered) return reply(ind.noregis())				
   	if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, `\`\`\`✓Listo Cambie el nombre ahora es \`\`\` *${body.slice(9)}*`, text, {quoted: mek})
                break
                case 'setdesc':
              	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				

             	if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, `\`\`\`✓Ya cambie la descripcion del grupo\`\`\` *${groupMetadata.subject}* Ahora es: *${body.slice(9)}*`, text, {quoted: mek})
                break
					            case 'setpp':
	        	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				

					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
                    media = await client.downloadAndSaveMediaMessage(mek)
                    await client.updateProfilePicture (from, media)
                    reply(ind.wait())
                    reply(`\`\`\`✓Listo cambie el icono de el grupo:\`\`\` *${groupMetadata.subject}*`)
                    break 
   
                case 'tagme':
               	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())		
	   	if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())		
					var noom = mek.participant
					const tag = {
					text: `@${noom.split("@s.whatsapp.net")[0]} tag!`,
					contextInfo: { mentionedJid: [noom] }
					}
					client.sendMessage(from, tag, text, {quoted: mek})
					break
					
				case 'lighttext':
				if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
				reply(ind.wait())
				liig = `${body.slice(11)}`
					liig2 = await fetchJson(`https://api.zeks.xyz/api/lithgtext?text=${liig}&apikey=apivinz`)
					buffer = await getBuffer(liig2.result)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					await limitAdd(sender)
					break 
				case 'crismes':
	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
				reply(ind.wait())
				liigq = `${body.slice(9)}`
					liig2q = await fetchJson(`https://api.zeks.xyz/api/crismes?text=${liigq}&apikey=apivinz`)
					buffer = await getBuffer(liig2q.result)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					await limitAdd(sender)
					break 
						case 'tlight':
						if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					glass = `${body.slice(8)}`
					reply(ind.wait())
					buffer = await getBuffer(`https://api.zeks.xyz/api/tlight?text=${glass}&apikey=apivinz`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption: '>.<', quoted: mek})
					await limitAdd(sender) 
					break 
					case 'leavest':
						if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					glasq = `${body.slice(9)}`
					reply(ind.wait())
					buffer = await getBuffer(`https://api.zeks.xyz/api/leavest?text=${glasq}&apikey=apivinz`, {method: 'get'})
					client.sendMessage(from, buffer, image, {caption: '>.<', quoted: mek})
					await limitAdd(sender) 
					break 
					 case 'recomienda.anime':
						if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					reply(`*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎

*Acción*

1. Oɴᴇ Pɪᴇᴄᴇ
2. Nᴀʀᴜᴛᴏ
3. Dʀᴀɢᴏɴ Bᴀʟʟ
4. Sʜɪɴɢᴇᴋɪ ɴᴏ Kʏᴏᴊɪɴ
5. Oɴᴇ Pᴜɴᴄʜ Mᴀɴ
6. Hᴜɴᴛᴇʀ x Hᴜɴᴛᴇʀ
7. Bʟᴇᴀᴄʜ
8. Cᴏᴅᴇ: Bʀᴇᴀᴋᴇʀ
9. Fᴜʟʟᴍᴇᴛᴀʟ Aʟᴄʜᴇᴍɪsᴛ : Bʀᴏᴛʜᴇʀʜᴏᴏᴅ
10. Fᴀɪʀʏ Tᴀɪʟ
11. Gɪɴᴛᴀᴍᴀ
12. Sᴡᴏʀᴅ Aʀᴛ Oɴʟɪɴᴇ
13. 91 Dᴀʏs
14. Aᴄᴄᴇʟ Wᴏʀʟᴅ
15. Aɪʀ Gᴇᴀʀ
16. Aᴋᴀᴍᴇ ɢᴀ Kɪʟʟ!
17. Aʟᴅɴᴏᴀʜ.Zᴇʀᴏ
18. Aɴsᴀᴛsᴜ Kʏᴏᴜsʜɪᴛsᴜ
19. Aᴏ ɴᴏ Exᴏʀᴄɪsᴛ
20. Aʀsʟᴀɴ Sᴇɴᴋɪ
21. Bᴀᴄᴄᴀɴᴏ!
22. Bᴇᴇʟᴢᴇʙᴜʙ
23. Bᴇʀsᴇʀᴋ
24. Bʟᴀᴄᴋ Bᴜʟʟᴇᴛ
25. Bʟᴏᴏᴅ Lᴀᴅ
26. Bʟᴏᴏᴅ+
27. Bᴏᴋᴜ ɴᴏ Hᴇʀᴏ Aᴄᴀᴅᴇᴍɪᴀ
28. Bᴏʀᴜᴛᴏ
29. Bᴛᴏᴏᴏᴍ!
30. Cʟᴀʏᴍᴏʀᴇ
31. Cᴏᴅᴇ Gᴇᴀss
32. Cᴏᴡʙᴏʏ Bᴇʙᴏᴘ
33. D.Gʀᴀʏ-ᴍᴀɴ
34. Dᴀɴɢᴀɴʀᴏɴᴘᴀ Sᴇʀɪᴇs
35. Dᴀʀᴋᴇʀ ᴛʜᴀɴ Bʟᴀᴄᴋ Sᴇʀɪᴇs
36. Dᴇᴀᴅᴍᴀɴ Wᴏɴᴅᴇʀʟᴀɴᴅ
37. Fᴀᴛᴇ Sᴇʀɪᴇs
38. Fʟᴀᴍᴇ ᴏғ Rᴇᴄᴄᴀ
39. Fᴜʟʟ Mᴇᴛᴀʟ Pᴀɴɪᴄ!
40. Gᴀɴɢsᴛᴀ
41. Gᴀɴᴛᴢ
42. Gᴀ-Rᴇɪ: Zᴇʀᴏ
43. Gᴏᴅ Eᴀᴛᴇʀ
44. Gᴜɪʟᴛʏ Cʀᴏᴡɴ
45. Hᴇʟʟsɪɴɢ
46. Hɪɢᴀsʜɪ ɴᴏ Eᴅᴇɴ
47. Hɪɢʜsᴄʜᴏᴏʟ ᴏғ ᴛʜᴇ Dᴇᴀᴅ
48. IɴᴜYᴀsʜᴀ
49. K (Pʀᴏᴊᴇᴄᴛ K)
50. Kᴀᴛᴀɴᴀɢᴀᴛᴀʀɪ
51. Kᴀᴛᴇᴋʏᴏ Hɪᴛᴍᴀɴ Rᴇʙᴏʀɴ!
52. Kɪʟʟ ʟᴀ Kɪʟʟ
53. Kɪsᴇɪᴊᴜᴜ: Sᴇɪ ɴᴏ Kᴀᴋᴜʀɪᴛsᴜ
54. Kᴏᴜᴛᴇᴛsᴜᴊᴏᴜ ɴᴏ Kᴀʙᴀɴᴇʀɪ
55. Kᴜʀᴏsʜɪᴛsᴜᴊɪ (Bʟᴀᴄᴋ Bᴜᴛʟᴇʀ)
56. Mᴀɢɪ Sᴇʀɪᴇs
57. Mɪʀᴀɪ Nɪᴋᴋɪ
58. Mᴏʙ Psʏᴄʜᴏ 100
59. Nᴀɴᴀᴛsᴜ ɴᴏ Tᴀɪᴢᴀɪ
60. Nᴇᴏɴ Gᴇɴᴇsɪs Eᴠᴀɴɢᴇʟɪᴏɴ
61. Nᴏʀᴀɢᴀᴍɪ
62. Nᴜʀᴀʀɪʜʏᴏɴ ɴᴏ Mᴀɢᴏ
63. Oᴠᴇʀʟᴏʀᴅ
64. Oᴡᴀʀɪ ɴᴏ Sᴇʀᴀᴘʜ
65. Psʏᴄʜᴏ-Pᴀss
66. Rᴜʀᴏᴜɴɪ Kᴇɴsʜɪɴ
67. Sᴀᴍᴜʀᴀɪ Cʜᴀᴍᴘʟᴏᴏ
68. Sʜᴀᴋᴜɢᴀɴ ɴᴏ Sʜᴀɴᴀ
69. Sʜɪᴊᴏᴜ Sᴀɪᴋʏᴏᴜ ɴᴏ Dᴇsʜɪ Kᴇɴɪᴄʜɪ
70. Sʜɪɴɢᴇᴋɪ ɴᴏ Bᴀʜᴀᴍᴜᴛ Sᴇʀɪᴇs
71. Sᴏᴜʟ Eᴀᴛᴇʀ
72. Sᴛʀɪᴋᴇ ᴛʜᴇ Bʟᴏᴏᴅ
73. Tᴀʟᴇs ᴏғ Zᴇsᴛɪʀɪᴀ ᴛʜᴇ X
74. Tᴏᴀʀᴜ Sᴇʀɪᴇs
75. Tᴏᴋʏᴏ Gʜᴏᴜʟ
76. Usʜɪᴏ ᴛᴏ Tᴏʀᴀ
77. Zᴇᴛsᴜᴇɴ ɴᴏ Tᴇᴍᴘᴇsᴛ

*Aventura*

1. Oɴᴇ Pɪᴇᴄᴇ
2. Mᴜsʜɪsʜɪ
3. Zᴇʀᴏ ɴᴏ Tsᴜᴋᴀɪᴍᴀ
4. Mᴀᴅᴇ Iɴ Aʙʏss
5. Cʟᴀʏᴍᴏʀᴇ
6. BTOOOM
7. Sʜɪɴɢᴇᴋɪ ɴᴏ Bᴀʜᴀᴍᴜᴛ Sᴇʀɪᴇs
8. Rᴏᴋᴋᴀ Nᴏ Yᴜᴜsʜᴀ
9. Fᴜʟʟᴍᴇᴛᴀʟ Aʟᴄʜᴇᴍɪsᴛ: Bʀᴏᴛʜᴇʀʜᴏᴏᴅ
10. Mᴀɢɪ Sᴇʀɪᴇs
11. Hᴜɴᴛᴇʀ x Hᴜɴᴛᴇʀ 
12. Aᴋᴀᴛsᴜᴋɪ ɴᴏ Yᴏɴᴀ 
13. Nᴀʀᴜᴛᴏ Sᴇʀɪᴇs
14. Oᴏᴋᴀᴍɪ ᴛᴏ Kᴏᴜsʜɪɴʀʏᴏᴜ 
15. Fᴀɪʀʏ Tᴀɪʟ
16. Hᴏᴡʟ ɴᴏ Uɢᴏᴋᴜ Sʜɪʀᴏ
17. Kᴀᴛᴀɴᴀɢᴀᴛᴀʀɪ 
18. Cᴏᴅᴇ Gᴇᴀss
19. Kɪɴᴏ ɴᴏ Tᴀʙɪ: Tʜᴇ Bᴇᴀᴜᴛɪғᴜʟ Wᴏʀʟᴅ
20. Sᴏᴜʟ Eᴀᴛᴇʀ
21. Tᴇɴɢᴇɴ Tᴏᴘᴘᴀ Gᴜʀʀᴇɴ Lᴀɢᴀɴɴ
22. Aᴋᴀᴍᴇ ɢᴀ Kɪʟʟ!
23. Sᴡᴏʀᴅ Aʀᴛ Oɴʟɪɴᴇ
24. Dʀᴀɢᴏɴ Bᴀʟʟ
25. Nᴀɴᴀᴛsᴜ ɴᴏ Tᴀɪᴢᴀɪ 
26. Lɪᴛᴛʟᴇ Wɪᴛᴄʜ Aᴄᴀᴅᴇᴍɪᴀ
27. Rᴏᴍᴇᴏ ɴᴏ Aᴏɪ Sᴏʀᴀ
28. Sᴏʀᴀ ʏᴏʀɪ ᴍᴏ Tᴏᴏɪ Bᴀsʜᴏ
29. Cᴏᴡʙᴏʏ Bᴇʙᴏᴘ
30. Sᴇɴ ᴛᴏ Cʜɪʜɪʀᴏ ɴᴏ Kᴀᴍɪᴋᴀᴋᴜsʜɪ
31. Nᴜʀᴀʀɪʜʏᴏɴ Nᴏ Mᴀɢᴏ
32. Lᴏɢ Hᴏʀɪᴢᴏɴ
33. Tᴏʀɪᴋᴏ
34. Gᴀʀɢᴀɴᴛɪᴀ ᴏɴ ᴛʜᴇ Vᴇʀᴅᴜʀᴏᴜs Pʟᴀɴᴇᴛ
35. Jᴏᴊᴏ’s Bɪᴢᴀʀʀᴇ Aᴅᴠᴇɴᴛᴜʀᴇ
36. Eᴜʀᴇᴋᴀ Sᴇᴠᴇɴ
37. Bʟᴀᴄᴋ Lᴀɢᴏᴏɴ
38. D.Gʀᴀʏ-ᴍᴀɴ
39. Aᴛᴛᴀᴄᴋ ᴏɴ Tɪᴛᴀɴ
40. IɴᴜYᴀsʜᴀ
41. Sᴀᴍᴜʀᴀɪ Cʜᴀᴍᴘʟᴏᴏ
42. Nᴏʀᴀɢᴀᴍɪ
43. Nᴏ Gᴀᴍᴇ Nᴏ Lɪғᴇ
44. Rᴀᴅɪᴀɴᴛ

*Mᴇᴄʜᴀ*

1. Tᴇɴɢᴇɴ Tᴏᴘᴘᴀ Gᴜʀʀᴇɴ Lᴀɢᴀɴɴ
2. Fᴜʟʟ Mᴇᴛᴀʟ Pᴀɴɪᴄ!
3. Cʀᴏss Aɴɢᴇ: Tᴇɴsʜɪ ᴛᴏ Rʏᴜᴜ ɴᴏ Rᴏɴᴅᴏ
4. Nᴇᴏɴ Gᴇɴᴇsɪs Eᴠᴀɴɢᴇʟɪᴏɴ
5. Eᴜʀᴇᴋᴀ Sᴇᴠᴇɴ
6. Kᴀᴋᴜᴍᴇɪᴋɪ Vᴀʟᴠʀᴀᴠᴇ (Vᴀʟᴠʀᴀᴠᴇ ᴛʜᴇ Lɪʙᴇʀᴀᴛᴏʀ)
7. Mᴏʙɪʟᴇ Sᴜɪᴛ Gᴜɴᴅᴀᴍ 00
8. Bᴜᴅᴅʏ Cᴏᴍᴘʟᴇx
9. Aʟᴅɴᴏᴀʜ.Zᴇʀᴏ
10. Cᴏᴅᴇ Gᴇᴀss
11. Dᴀᴛᴇ A Lɪᴠᴇ
12. Gᴇɴᴇsɪs ᴏғ Aϙᴜᴀʀɪᴏɴ (Sᴏᴜsᴇɪ ɴᴏ Aϙᴜᴀʀɪᴏɴ)
13. Vɪsɪᴏɴ ᴏғ Esᴄᴀғʟᴏᴡɴᴇ 
14. Mᴀᴄʀᴏss Sᴇʀɪᴇs
15. Gʜᴏsᴛ ɪɴ ᴛʜᴇ Sʜᴇʟʟ: Sᴛᴀɴᴅ Aʟᴏɴᴇ Cᴏᴍᴘʟᴇx
16. RᴀʜXᴇᴘʜᴏɴ
17. Yᴜᴜsʜᴀ-Oᴜ GᴀᴏGᴀɪGᴀʀ
18. FLCL
19. IS: Iɴғɪɴɪᴛᴇ Sᴛʀᴀᴛᴏs
20. Dᴀʀʟɪɴɢ ɪɴ ᴛʜᴇ FʀᴀɴXX
21. Sᴜɪsᴇɪ ɴᴏ Gᴀʀɢᴀɴᴛɪᴀ
22. Uɴᴅᴇғᴇᴀᴛᴇᴅ Bᴀʜᴀᴍᴜᴛ Cʜʀᴏɴɪᴄʟᴇ
23. Hᴜɴᴅʀᴇᴅ
24. Sɪᴅᴏɴɪᴀ ɴᴏ Kɪsʜɪ
25. Rᴏʙᴏᴛɪᴄs;Nᴏᴛᴇs
26. Hᴏsʜɪ ɴᴏ Kᴏᴇ
27. Gᴜɴᴅᴀᴍ Wɪɴɢ
28. Bᴏᴋᴜʀᴀɴᴏ
29. MᴏʙɪʟᴇSᴜɪᴛGᴜɴᴅᴀᴍ:Iʀᴏɴ-Bʟᴏᴏᴅᴇᴅ Oʀᴘʜᴀɴs
30. Kɴɪɢʜᴛ’s & Mᴀɢɪᴄ
31. Hᴇᴀᴠʏ Oʙᴊᴇᴄᴛ
32. Sᴀᴍᴜʀᴀɪ Sᴇᴠᴇɴ
33. Cᴏᴍᴇᴛ Lᴜᴄɪғᴇʀ
34. Sᴛᴀʀ Dʀɪᴠᴇʀ: Kᴀɢᴀʏᴀᴋɪ ɴᴏ Tᴀᴋᴜᴛᴏ
35. Asᴜʀᴀ Cʀʏɪɴ'
36. Hᴇʀᴏɪᴄ Aɢᴇ
37. Aϙᴜᴀʀɪᴏɴ Eᴠᴏʟ
38. Kᴜʀᴏᴍᴜᴋᴜʀᴏ
39. Nᴏʙᴜɴᴀɢᴀ ᴛʜᴇ Fᴏᴏʟ
40. Sᴄʜᴡᴀʀᴢᴇsᴍᴀʀᴋᴇɴ
41. Tᴏᴘ ᴡᴏ Nᴇʀᴀᴇ! Gᴜɴʙᴜsᴛᴇʀ
42. Sᴄʀᴀᴘᴘᴇᴅ Pʀɪɴᴄᴇss
43. Bʀᴇᴀᴋ Bʟᴀᴅᴇ
44. Mᴜᴠ-Lᴜᴠ Aʟᴛᴇʀɴᴀᴛɪᴠᴇ: Tᴏᴛᴀʟ Eᴄʟɪᴘsᴇ
45. Rᴀᴋᴜᴇɴ Tsᴜɪʜᴏᴜ 
46. Vᴀɴᴅʀᴇᴀᴅ
47. Bᴜʙᴜᴋɪ Bᴜʀᴀɴᴋɪ
48. Aᴘᴘʟᴇsᴇᴇᴅ (2004)
49. Dʀᴀɢᴏɴᴀᴜᴛ: Tʜᴇ Rᴇsᴏɴᴀɴᴄᴇ
50. Gᴜɴ X Sᴡᴏʀᴅ

*Carros*

1. Tᴀᴋᴜᴍɪ's AE86 / Iɴɪᴛɪᴀʟ D
2. Aᴋɪᴏ's Fᴀɪʀ Lᴀᴅʏ Z / Wᴀɴɢᴀɴ Mɪᴅɴɪɢʜᴛ
3. JP's Tʀᴀɴsᴀᴍ / Rᴇᴅʟɪɴᴇ
4. Nɪᴄᴏ's Mᴇʀᴄᴇᴅᴇs A-ᴄʟᴀss / Nᴇxᴛ A-ᴄʟᴀss
5. Kᴀᴋᴇʀᴜ's Rᴀɪʟʙɪʀᴅ / Cʜᴏᴜsᴏᴋᴜ Hᴇɴᴋᴇɪ Gʏʀᴏᴢᴇᴛᴛᴇʀ
6. Sᴏɪᴄʜɪ's Lᴏᴛᴜs Sᴜᴘᴇʀ 7 / ᴇX-Dʀɪᴠᴇʀ: Tʜᴇ ᴍᴏᴠɪᴇ
7. Sʜɪʀᴏ's ᴍᴏᴅɪғɪᴇᴅ F-1 / Tᴀɪʟᴇɴᴅᴇʀs
8. Vɪᴄᴇ Pʀɪɴᴄɪᴘᴀʟ Uᴄʜɪʏᴀᴍᴀᴅᴀ's Tᴏʏᴏᴛᴀ Cʀᴇsᴛᴀ / GTO
9. Cᴀᴘᴇᴛᴀ's Fᴏʀᴍᴜʟᴀ Oɴᴇ / Cᴀᴘᴇᴛᴀ
10. Rᴏᴍᴀɴ ᴀɴᴅ Oᴛᴛᴏ's sʜᴀʀᴋ ᴄᴀʀ / Cᴏᴍᴇᴛ Lᴜᴄɪғᴇʀ

*Dʀᴀᴍᴀ*

1. RᴇLIFE
2. Tsᴜᴋɪ ɢᴀ Kɪʀᴇɪ
3. AɴᴏHᴀɴᴀ
4. Sʜɪɢᴀᴛsᴜ ᴡᴀ Kɪᴍɪ ɴᴏ Usᴏ
5. Mᴀᴅᴇ Iɴ Aʙʏss
6. Kɪᴍɪ ɴᴏ Nᴀᴡᴀ
7. Rᴇ: Zᴇʀᴏ ᴋᴀʀᴀ Hᴀᴊɪᴍᴇʀᴜ Isᴇᴋᴀɪ Sᴇɪᴋᴀᴛsᴜ
8. Fᴜʟʟᴍᴇᴛᴀʟ Aʟᴄʜᴇᴍɪsᴛ: Bʀᴏᴛʜᴇʀʜᴏᴏᴅ
9. Aɴɢᴇʟ Bᴇᴀᴛs
10. Cʜᴜᴜɴɪʙʏᴏᴜ ᴅᴇᴍᴏ Kᴏɪ ɢᴀ Sʜɪᴛᴀɪ!
11. Cʜᴀʀʟᴏᴛᴛᴇ
12. Sᴀᴋᴜʀᴀsᴏᴜ ɴᴏ Pᴇᴛ ɴᴀ Kᴀɴᴏᴊᴏ
13. Kᴜᴢᴜ ɴᴏ Hᴏɴᴋᴀɪ
14. Eʀᴏᴍᴀɴɢᴀ-sᴇɴsᴇɪ
15. Aᴏ Hᴀʀᴜ Rɪᴅᴇ
16. Kᴏᴇ ɴᴏ Kᴀᴛᴀᴄʜɪ
17. Sʜɪɴɢᴇᴋɪ ɴᴏ Kʏᴏᴜᴊɪɴ
18. Cʟᴀɴɴᴀᴅ
19. Wʜɪᴛᴇ Aʟʙᴜᴍ

*Fᴀɴᴛᴀsia*

1. Oɴᴇ Pɪᴇᴄᴇ
2. Mᴀᴅᴇ ɪɴ Aʙʏss
3. Rᴇ:Zᴇʀᴏ ᴋᴀʀᴀ Hᴀᴊɪᴍᴇʀᴜ Isᴇᴋᴀɪ Sᴇɪᴋᴀᴛsᴜ
4. DᴀɴMᴀᴄʜɪ
5. OᴠᴇʀLᴏʀᴅ
6. Sᴀʏᴏɴᴀʀᴀ ɴᴏ Asᴀ ɴɪ Yᴀᴋᴜsᴏᴋᴜhɴᴏ Hᴀɴᴀ ᴡᴏ 
7. Tᴀʟᴇs ᴏғ Zᴇsᴛɪʀɪᴀ ᴛʜᴇ X
8. Oᴏᴋᴀᴍɪ ᴛᴏ Kᴏᴜsʜɪɴʀʏᴏᴜ
9. Aᴋᴀᴛsᴜᴋɪ ɴᴏ Yᴏɴᴀ
10. Fᴜʟʟᴍᴇᴛᴀʟ Aʟᴄʜᴇᴍɪsᴛ: Bʀᴏᴛʜᴇʀʜᴏᴏᴅ
11. Lᴏɢ Hᴏʀɪᴢᴏɴ
12. Bᴇʀsᴇʀᴋ
13. Nᴏ Gᴀᴍᴇ Nᴏ Lɪғᴇ
14. Nᴀɴᴀᴛsᴜ ɴᴏ Tᴀɪᴢᴀɪ
15. Mᴀɢɪ Sᴇʀɪᴇs
16. Fᴀɪʀʏ Tᴀɪʟ
17. Hᴜɴᴛᴇʀ x Hᴜɴᴛᴇʀ
18. Nᴀᴛsᴜᴍᴇ Yᴜᴜᴊɪɴᴄʜᴏᴜ
19. Sᴏᴜʟ Eᴀᴛᴇʀ
20. Fᴀᴛᴇ/sᴛᴀʏ ɴɪɢʜᴛ: Uɴʟɪᴍɪᴛᴇᴅ Bʟᴀᴅᴇ Wᴏʀᴋs
21. Zᴇᴛsᴜᴇɴ ɴᴏ Tᴇᴍᴘᴇsᴛ
22. Kᴇᴋᴋᴀɪ Sᴇɴsᴇɴ
23. Kᴏʙᴀᴛᴏ.
24. Dʀɪғᴛᴇʀs
25. Hᴀɪʙᴀɴᴇ Rᴇɴᴍᴇɪ
26. Mᴀʜᴏᴜᴊɪɴ Gᴜʀᴜɢᴜʀᴜ
27. Gᴀᴛᴇ: Jɪᴇɪᴛᴀɪ Kᴀɴᴏᴄʜɪ Nɪᴛᴇ, Kᴀᴋᴜ Tᴀᴛᴀᴋᴀᴇʀɪ
28. Sʜɪɴɢᴇᴋɪ ɴᴏ Bᴀʜᴀᴍᴜᴛ Sᴇʀɪᴇs
29. Kᴏɴᴏsᴜʙᴀ
30. Sᴡᴏʀᴅ Aʀᴛ Oɴʟɪɴᴇ
31. Vɪᴏʟᴇᴛ Eᴠᴇʀɢᴀʀᴅᴇɴ
32. Mᴜsʜɪsʜɪ
33. Hᴏᴡʟ ɴᴏ Uɢᴏᴋᴜ Sʜɪʀᴏ
34. Aʀɪᴀ Tʜᴇ Oʀɪɢɪɴᴀᴛɪᴏɴ
35. Kᴀᴍɪsᴀᴍᴀ Hᴀᴊɪᴍᴇᴍᴀsʜɪᴛᴀ
36. Hᴏᴜsᴇᴋɪ ɴᴏ Kᴜɴɪ
37. Pʀɪɴᴄᴇss Mᴏɴᴏɴᴏᴋᴇ
38. Kᴇᴍᴏɴᴏ ɴᴏ Sᴏᴜᴊᴀ Eʀɪɴ
39. Yᴀᴏɢᴜᴀɪ Mɪɴɢᴅᴀɴ
40. Jᴜᴜɴɪ Kᴏᴋᴜᴋɪ
41. Cᴀʀᴅᴄᴀᴘᴛᴏʀ Sᴀᴋᴜʀᴀ: Cʟᴇᴀʀ Cᴀʀᴅ-ʜᴇɴ
42. Kᴏʙᴀʏᴀsʜɪ-sᴀɴ Cʜɪ ɴᴏ Mᴀɪᴅ Dʀᴀɢᴏɴ
43. Uᴄʜᴏᴜᴛᴇɴ Kᴀᴢᴏᴋᴜ
44. Nᴀɢɪ ɴᴏ Asᴜᴋᴀʀᴀ
45. Mᴀʜᴏᴜᴛsᴜᴋᴀɪ ɴᴏ Yᴏᴍᴇ
46. Lɪᴛᴛʟᴇ Wɪᴛᴄʜ Aᴄᴀᴅᴇᴍɪᴀ

*Sᴄʜᴏᴏʟ Lɪғᴇ*

1. Aᴏ Hᴀʀᴜ Rɪᴅᴇ
2. Hʏᴏᴜᴋᴀ
3. Cʜᴀʀʟᴏᴛᴛᴇ
4. Kᴏᴋᴏʀᴏ Cᴏɴɴᴇᴄᴛ
5. Kᴀʀᴀᴋᴀɪ Jᴏᴜᴢᴜ ɴᴏ Tᴀᴋᴀɢɪ-sᴀɴ
6. Bᴏᴋᴜ Dᴀᴋᴇ ɢᴀ Iɴᴀɪ Mᴀᴄʜɪ
7. Tᴏʀᴀᴅᴏʀᴀ!
8. Tsᴜᴋɪ ɢᴀ Kɪʀᴇɪ
9. Kʏᴏᴜᴋᴀɪ ɴᴏ Kᴀɴᴀᴛᴀ
10. RᴇLIFE
11. Sᴡᴏʀᴅ Aʀᴛ Oɴʟɪɴᴇ
12. AɴᴏHᴀɴᴀ
13. Issʜᴜᴋᴀɴ Fʀɪᴇɴᴅs
14. Sʜɪɢᴀᴛsᴜ ᴡᴀ Kɪᴍɪ ɴᴏ Usᴏ
15. Kᴜᴢᴜ ɴᴏ Hᴏɴᴋᴀɪ
16. Kɪᴍɪ ɴᴏ Nᴀᴡᴀ
17. Sᴜᴋɪᴛᴛᴇ Iɪ ɴᴀ ʏᴏ
18. Sᴀᴋᴜʀᴀsᴏᴜ ɴᴏ Pᴇᴛ ɴᴀ Kᴀɴᴏᴊᴏ
19. Tᴏᴋʏᴏ Rᴀᴠᴇɴs
20. Hɪᴍᴏᴜᴛᴏ Uᴍᴀʀᴜ-ᴄʜᴀɴ
21. Mᴀsᴀᴍᴜɴᴇ-ᴋᴜɴ ɴᴏ Rᴇᴠᴇɴɢᴇ
22. Tʀɪɴɪᴛʏ Sᴇᴠᴇɴ
23. Aɴɢᴇʟ Bᴇᴀᴛs
24. Bʟᴇᴀᴄʜ
25. Bʟᴏᴏᴅ-C
26. Hɪɢʜ Sᴄʜᴏᴏʟ DxD
27. Bᴏᴋᴜ ɴᴏ Hᴇʀᴏ Aᴄᴀᴅᴇᴍɪᴀ
28. Sʜᴏᴋᴜɢᴇᴋɪ ɴᴏ Sᴏᴜᴍᴀ
29. Aɴsᴀᴛsᴜ Kʏᴏᴜsʜɪᴛsᴜ
30. Tᴏɴᴀʀɪ ɴᴏ Kᴀɪʙᴜᴛsᴜ-ᴋᴜɴ
31. Oʀᴀɴɢᴇ
32. Kɪᴍɪ ɴɪ Tᴏᴅᴏᴋᴇ
33. Sᴀᴋᴀᴍᴏᴛᴏ ᴅᴇsᴜ ɢᴀ?
34. Cʜᴜᴜɴɪʙʏᴏᴜ ᴅᴇᴍᴏ Kᴏɪ ɢᴀ Sʜɪᴛᴀɪ!
35. Kᴜʀᴏᴋᴏ ɴᴏ Bᴀsᴜᴋᴇ
36. Nɪsᴇᴋᴏɪ
37. Sᴀᴇɴᴀɪ Hᴇʀᴏɪɴᴇ ɴᴏ Sᴏᴅᴀᴛᴇᴋᴀᴛᴀ
38. Hɪʙɪᴋᴇ! Eᴜᴘʜᴏɴɪᴜᴍ
39. Nᴏɴ Nᴏɴ Bɪʏᴏʀɪ
40. Gᴀʙʀɪᴇʟ DʀᴏᴘOᴜᴛ
41. Aʜᴏ Gɪʀʟ
42. Iᴛsᴜᴅᴀᴛᴛᴇ Bᴏᴋᴜʀᴀ ɴᴏ Kᴏɪ ᴡᴀ 10-Cᴇɴᴛɪᴍᴇᴛᴇʀs Dᴀᴛᴛᴀ
43. Jᴜsᴛ Bᴇᴄᴀᴜsᴇ!
44. Kᴏᴇ ɴᴏ Kᴀᴛᴀᴄʜɪ
45. Kᴏᴋᴏʀᴏ ɢᴀ Sᴀᴋᴇʙɪᴛᴀɢᴀᴛᴛᴇʀᴜɴᴅᴀ

*Sʟɪᴄᴇ ᴏғ Lɪғᴇ*

1. Gᴇɴsʜɪᴋᴇɴ
2. Sʜɪɴʀʏᴀᴋᴜ! Iᴋᴀ Mᴜsᴜᴍᴇ
3. Uᴄʜᴏᴜᴛᴇɴ Kᴀᴢᴏᴋᴜ
4. Kᴏᴛᴏɴᴏʜᴀ ɴᴏ Nɪᴡᴀ
5. Mᴜsʜɪsʜɪ
6. Pᴀᴘᴀ ɴᴏ Iᴜᴋᴏᴛᴏ ᴡᴏ Kɪᴋɪɴᴀsᴀɪ!
7. Aɪʀ
8. Aɴᴏ Hɪ Mɪᴛᴀ Hᴀɴᴀ ɴᴏ Nᴀᴍᴀᴇ ᴡᴏ Bᴏᴋᴜᴛᴀᴄʜɪ ᴡᴀ Mᴀᴅᴀ Sʜɪʀᴀɴᴀɪ.
9. Nᴀᴛsᴜᴍᴇ Yᴜᴜᴊɪɴᴄʜᴏᴜ
10. Bᴀʀᴀᴋᴀᴍᴏɴ ᴅᴀɴ Hᴀɴᴅᴀ-ᴋᴜɴ
11. Dᴀɢᴀsʜɪ Kᴀsʜɪ
12. Aᴍᴀᴀᴍᴀ ᴛᴏ Iɴᴀᴢᴜᴍᴀ
13. Cʟᴀɴɴᴀᴅ
14. Kᴏʙᴀʏᴀsʜɪ-sᴀɴ Cʜɪ ɴᴏ Mᴀɪᴅ Dʀᴀɢᴏɴ
15. Hɪᴍᴏᴜᴛᴏ! Uᴍᴀʀᴜ-ᴄʜᴀɴ
16. Sᴀᴋᴜʀᴀ Qᴜᴇsᴛ
17. Mᴀʜᴏᴜᴛsᴜᴋᴀɪ ɴᴏ Yᴏᴍᴇ
18. Kᴀʀᴀᴋᴀɪ Jᴏᴜᴢᴜ ɴᴏ Tᴀᴋᴀɢɪ-sᴀɴ
19. Sᴏʀᴀ ʏᴏʀɪ ᴍᴏ Tᴏᴏɪ Bᴀsʜᴏ
20. Sᴇʀᴠᴀɴᴛ x Sᴇʀᴠɪᴄᴇ
21. Tᴀᴍᴀᴋᴏ Lᴏᴠᴇ Sᴛᴏʀʏ
22. Nᴏɴ Nᴏɴ Bɪʏᴏʀɪ
23. Usᴀɢɪ Dʀᴏᴘ
24. Nᴇᴡ Gᴀᴍᴇ!
25. Wᴏʀᴋɪɴɢ!! (Wᴀɢɴᴀʀɪᴀ!!) Sᴇʀɪᴇs
26. Gᴏᴄʜᴜᴜᴍᴏɴ ᴡᴀ Usᴀɢɪ ᴅᴇsᴜ ᴋᴀ??
27. Aʀɪᴀ Tʜᴇ Oʀɪɢɪɴᴀᴛɪᴏɴ
28. Uᴄʜᴜᴜ Kʏᴏᴜᴅᴀɪ
28. Nɪᴄʜɪᴊᴏᴜ
30. Nᴀɴᴀ
31. Kᴇᴍᴏɴᴏ ɴᴏ Sᴏᴜᴊᴀ Eʀɪɴ
32. Nᴏᴅᴀᴍᴇ Cᴀɴᴛᴀʙɪʟᴇ
33. Dᴀɴsʜɪ Kᴏᴜᴋᴏᴜsᴇɪ ɴᴏ Nɪᴄʜɪᴊᴏᴜ
34. K-Oɴ!
35. Yᴜʀᴜ Cᴀᴍᴘ
36. Gɪɴ ɴᴏ Sᴀᴊɪ
37. Hᴀᴄʜɪᴍɪᴛsᴜ ᴛᴏ Cʟᴏᴠᴇʀ
38. Sᴀᴋᴜʀᴀsᴏᴜ ɴᴏ Pᴇᴛ ɴᴀ Kᴀɴᴏᴊᴏ
39. RᴇLIFE
40. Kᴜʀᴀɢᴇʜɪᴍᴇ
41. Sʜᴏᴜᴊᴏ Sʜᴜᴜᴍᴀᴛsᴜ Rʏᴏᴋᴏᴜ
42. Eᴠᴇ ɴᴏ Jɪᴋᴀɴ
43. Hʏᴏᴜᴋᴀ
44. Iᴇ Nᴀᴋɪ Kᴏ Rᴇᴍʏ
45. Tᴀɴᴀᴋᴀ-ᴋᴜɴ ᴡᴀ Iᴛsᴜᴍᴏ Kᴇᴅᴀʀᴜɢᴇ
46. Sʜɪʀᴏʙᴀᴋᴏ
47. Gʀᴇᴀᴛ Tᴇᴀᴄʜᴇʀ Oɴɪᴢᴜᴋᴀ
48. Sᴀɪᴋɪ Kᴜsᴜᴏ ɴᴏ Ψ Nᴀɴ
49. Vɪᴏʟᴇᴛ Eᴠᴇʀɢᴀʀᴅᴇɴ
50. 3-ɢᴀᴛsᴜ ɴᴏ Lɪᴏɴ
51. Gᴀᴋᴜᴇɴ Bᴀʙʏsɪᴛᴛᴇʀs
52. Mɪᴛsᴜʙᴏsʜɪ Cᴏʟᴏʀs
53. Hɪɴᴀᴍᴀᴛsᴜʀɪ
54. Tᴀᴅᴀ-ᴋᴜɴ ᴡᴀ Kᴏɪ ᴡᴏ Sʜɪɴᴀɪ
55. Cᴏᴍɪᴄ Gɪʀʟs
56. Bʏᴏᴜsᴏᴋᴜ 5 Cᴇɴᴛɪᴍᴇᴛᴇʀ
57. Hᴀɴᴀsᴀᴋᴜ Iʀᴏʜᴀ
58. Dᴇɴᴘᴀ Oɴɴᴀ ᴛᴏ Sᴇɪsʜᴜɴ Oᴛᴏᴋᴏ

*Sᴀᴍᴜʀᴀɪ*

1. Sᴀᴍᴜʀᴀɪ 7
2. Rᴜʀᴏᴜɴɪ Kᴇɴsʜɪɴ
3. Sᴀᴍᴜʀᴀɪ Cʜᴀᴍᴘʟᴏᴏ
4. Aғʀᴏ Sᴀᴍᴜʀᴀɪ
5. Sᴇɴɢᴏᴋᴜ Bᴀsᴀʀᴀ: Sᴀᴍᴜʀᴀɪ Kɪɴɢs
6. Gɪɴᴛᴀᴍᴀ
7. Hᴀᴋᴜᴏᴜᴋɪ
8. Sᴡᴏʀᴅ ᴏғ ᴛʜᴇ Sᴛʀᴀɴɢᴇʀ
9. Bʟᴀᴅᴇ ᴏғ ᴛʜᴇ Iᴍᴍᴏʀᴛᴀʟ
10. Rᴏɴɪɴ Wᴀʀʀɪᴏʀs
11.Sᴀᴍᴜʀᴀɪ X

*Mɪʟɪᴛᴀʀ*

1. Fᴜʟʟᴍᴇᴛᴀʟ Aʟᴄʜᴇᴍɪsᴛ: Bʀᴏᴛʜᴇʀʜᴏᴏᴅ
2. Sʜɪɴɢᴇᴋɪ ɴᴏ Kʏᴏᴊɪɴ
3. Cᴏᴅᴇ Gᴇᴀss: Hᴀɴɢʏᴀᴋᴜ ɴᴏ Lᴇʟᴏᴜᴄʜ
4. Oᴡᴀʀɪ ɴᴏ Sᴇʀᴀᴘʜ
5. Gᴀᴛᴇ: Jɪᴇɪᴛᴀɪ Kᴀɴᴏᴄʜɪ ɴɪᴛᴇ, Kᴀᴋᴜ Tᴀᴛᴀᴋᴀᴇʀɪ
6. Aʟᴅɴᴏᴀʜ .Zᴇʀᴏ
7. Gᴏᴅ Eᴀᴛᴇʀ
8. Yᴏᴜᴊᴏ Sᴇɴᴋɪ 
9. SAO Aʟᴛᴇʀɴᴀᴛɪᴠᴇ: Gᴜɴ Gᴀʟᴇ Oɴʟɪɴᴇ
10. Nᴇᴊɪᴍᴀᴋɪ Sᴇɪʀᴇɪ Sᴇɴᴋɪ: Tᴇɴᴋʏᴏᴜ ɴᴏ Aʟᴅᴇʀᴀᴍɪɴ
11. Gɪʀʟs ᴜɴᴅ Pᴀɴᴢᴇʀ
12. Kᴀɴᴛᴀɪ Cᴏʟʟᴇᴄᴛɪᴏɴ
13. Mᴜᴠ-Lᴜᴠ Aʟᴛᴇʀɴᴀᴛɪᴠᴇ: Tᴏᴛᴀʟ Eᴄʟɪᴘsᴇ
14. 07-Gʜᴏsᴛ
15. Mᴏʙɪʟᴇ Sᴜɪᴛ Gᴜɴᴅᴀᴍ 00
16. Kɪɴɢᴅᴏᴍ
17. Kᴀᴋᴜᴍᴇɪᴋɪ Vᴀʟᴠʀᴀᴠᴇ
18. Sᴛʀɪᴋᴇ Wɪᴛᴄʜᴇs
19. Mᴀᴄʀᴏss Fʀᴏɴᴛɪᴇʀ
20. Sᴏ Rᴀ Nᴏ Wᴏ Tᴏ
21. Hᴇᴀᴠʏ Oʙᴊᴇᴄᴛ
22. Sᴇɴᴊᴏᴜ ɴᴏ Vᴀʟᴋʏʀɪᴀ
23. Oᴛᴏᴍᴇ Yᴏᴜᴋᴀɪ Zᴀᴋᴜʀᴏ
24. Aɴɢᴏʟᴍᴏɪs: Gᴇɴᴋᴏᴜ Kᴀssᴇɴᴋɪ
25. Bʀᴇᴀᴋ Bʟᴀᴅᴇ
26. Hɪɢʜ Sᴄʜᴏᴏʟ Fʟᴇᴇᴛ
27. Tᴏsʜᴏᴋᴀɴ Sᴇɴsᴏᴜ
28. Sᴀʙᴀɢᴇʙᴜ!
29. Tᴀɪᴍᴀᴅᴏᴜ Gᴀᴋᴜᴇɴ 35 Sʜɪᴋᴇɴ Sʜᴏᴜᴛᴀɪ
30. Jᴏᴋᴇʀ Gᴀᴍᴇ

*Hɪsᴛᴏʀɪᴄo*

1. Gɪɴᴛᴀᴍᴀ
2. Mᴜsʜɪsʜɪ
3. Dᴏʀᴏʀᴏ
4. Sᴀᴍᴜʀᴀɪ Cʜᴀᴍᴘʟᴏᴏ
5. Bᴀᴄᴄᴀɴᴏ!
6. Kᴀᴛᴀɴᴀɢᴀᴛᴀʀɪ
7. Rᴜʀᴏᴜɴɪ Kᴇɴsʜɪɴ: Mᴇɪᴊɪ Kᴇɴᴋᴀᴋᴜ Rᴏᴍᴀɴᴛᴀɴ
8. Gᴏsɪᴄᴋ
9. Kɪɴɢᴅᴏᴍ
10. Kᴜʀᴏsʜɪᴛsᴜᴊɪ
11. Aᴏɪ Bᴜɴɢᴀᴋᴜ Sᴇʀɪᴇs
12. Hᴇᴛᴀʟɪᴀ Axɪs Pᴏᴡᴇʀs
13. Hᴀᴋᴜᴏᴜᴋɪ
14. Sᴇɴɢᴏᴋᴜ Bᴀsᴀʀᴀ
15. Jᴏᴋᴇʀ Gᴀᴍᴇ
16. Kᴀɢᴜʏᴀ Hɪᴍᴇ ɴᴏ Mᴏɴᴏɢᴀᴛᴀʀɪ
17. Eɪᴋᴏᴋᴜ Kᴏɪ Mᴏɴᴏɢᴀᴛᴀʀɪ 

*Pᴏʟɪᴄia*

1. Tᴀɪʜᴏ Sʜɪᴄʜᴀᴜ ᴢᴏ
2. Gʜᴏsᴛ ɪɴ ᴛʜᴇ Sʜᴇʟʟ
3. Kᴏᴄʜɪʀᴀ Kᴀᴛsᴜsʜɪᴋᴀᴋᴜ Kᴀᴍᴇᴀʀɪ Kᴏᴜᴇɴᴍᴀᴇ 
4. Hᴀsʜᴜᴛsᴜᴊᴏ
5. Psʏᴄʜᴏ-Pᴀss
6. Mᴏʙɪʟᴇ Pᴏʟɪᴄᴇ Pᴀᴛʟᴀʙᴏʀ
7. Mɪʀᴀɪ Kᴇɪsᴀᴛsᴜ Uʀᴀsʜɪᴍᴀɴ
8. Wɪʟᴅ 7
9. Yᴜᴜsʜᴀ Kᴇɪsᴀᴛsᴜ J-Dᴇᴄᴋᴇʀ
10. Hɪᴍɪᴛsᴜ: Tʜᴇ Rᴇᴠᴇʟᴀᴛɪᴏɴ
11. Sᴀᴍᴜʀᴀɪ Fʟᴀᴍᴇɴᴄᴏ
12. B: Tʜᴇ Bᴇɢɪɴɴɪɴɢ
13. Jɪɴ-Rᴏʜ: Tʜᴇ Wᴏʟғ Bʀɪɢᴀᴅᴇ
14. Oɴɪʜᴇɪ
15. Kɪᴅᴏᴜ Kᴇɪsᴀᴛsᴜ Pᴀᴛʟᴀʙᴏʀ: Oɴ ᴛᴇʟᴇᴠɪsɪᴏɴ
16. Mᴏᴜsᴏᴜ Dᴀɪʀɪɴɪɴ
17. Pᴇᴀᴄᴇ Mᴀᴋᴇʀ Kᴜʀᴏɢᴀɴᴇ
18. Hʏᴘᴇʀ Pᴏʟɪᴄᴇ

*Sᴄɪ-ғɪ*

1. Sᴛᴇɪɴs;Gᴀᴛᴇ
2. Iɴᴜʏᴀsʜɪᴋɪ
3. Mᴀᴅᴇ ɪɴ Aʙʏss
4. Cᴏᴡʙᴏʏ Bᴇʙᴏᴘ
5. Pʟᴀsᴛɪᴄ Mᴇᴍᴏʀɪᴇs
6. Eᴜʀᴇᴋᴀ Sᴇᴠᴇɴ
7. Mᴀʜᴏᴜᴋᴀ Kᴏᴜᴋᴏᴜ ɴᴏ Rᴇᴛᴛᴏᴜsᴇɪ
8. Dɪᴍᴇɴsɪᴏɴ W
9. Dᴀʀʟɪɴɢ ɪɴ ᴛʜᴇ FʀᴀɴXX
10. Dᴇɴɴᴏᴜ Cᴏɪʟ
11. Sᴘᴀᴄᴇ☆Dᴀɴᴅʏ
12. Kɪᴢɴᴀɪᴠᴇʀ
13. Nᴇᴏɴ Gᴇɴᴇsɪs Eᴠᴀɴɢᴇʟɪᴏɴ
14. Rᴏʙᴏᴛɪᴄs;Nᴏᴛᴇs
15. Pᴀᴘʀɪᴋᴀ
16. Mᴇɢᴀʟᴏ Bᴏx
17. Gʜᴏsᴛ ɪɴ ᴛʜᴇ Sʜᴇʟʟ
18. Gᴀᴛᴄʜᴀᴍᴀɴ Cʀᴏᴡᴅs
19. Gᴀᴋᴜsᴇɴ Tᴏsʜɪ Asᴛᴇʀɪsᴋ
20. Gɪɴᴛᴀᴍᴀ
21. Sᴀᴋᴀsᴀᴍᴀ ɴᴏ Pᴀᴛᴇᴍᴀ
22. Eᴠᴇ ɴᴏ Jɪᴋᴀɴ
23. Psʏᴄʜᴏ-Pᴀss
24. Dᴇɴᴘᴀ Oɴɴᴀ ᴛᴏ Sᴇɪsʜᴜɴ Oᴛᴏᴋᴏ
25. Mᴇᴋᴀᴋᴜᴄɪᴛʏ Aᴄᴛᴏʀs
26. Pʟᴀɴᴇᴛᴇs
27. Bᴜᴅᴅʏ Cᴏᴍᴘʟᴇx
28. Pᴇʀsᴏɴᴀ Sᴇʀɪᴇs
29. Sᴏʀᴀ ɴᴏ Oᴛᴏsʜɪᴍᴏɴᴏ

*Deportivo*

1. Cᴀᴘᴛᴀɪɴ Tsᴜʙᴀsᴀ
2. Gɪᴀɴᴛ Kɪʟʟɪɴɢ
3. Tʜᴇ Kɴɪɢʜᴛ ɪɴ Tʜᴇ Aʀᴇᴀ (Aʀᴇᴀ ɴᴏ Kɪsʜɪ )
4. Aᴏᴋɪ Dᴇɴsᴇᴛsᴜ Sʜᴏᴏᴛ! (Bʟᴜᴇ Lᴇɢᴇɴᴅ Sʜᴏᴏᴛ!)
5. Dᴀʏs
6. Wʜɪsᴛʟᴇ!
7. Oғғsɪᴅᴇ
8. Dʀᴀɢᴏɴ Lᴇᴀɢᴜᴇ
9. Fᴀɴᴛᴀsɪsᴛᴀ Sᴛᴇʟʟᴀ
10. Iɴᴀᴢᴜᴍᴀ Eʟᴇᴠᴇɴ
11. Gɪɴɢᴀ ᴇ Kɪᴄᴋᴏғғ!!
12. Hᴜɴɢʀʏ Hᴇᴀʀᴛ Wɪʟᴅ Sᴛʀɪᴋᴇʀ
13. Gᴀɴʙᴀʀᴇ Kɪᴄᴋᴇʀs
14. Kᴜʀᴏᴋᴏ Nᴏ Bᴀsᴋᴇᴛ
15. Sʟᴀᴍ Dᴜɴᴋ
16. Dᴇᴀʀ Bᴏʏs
17. I’ʟʟ/CKBC
18. Bᴜᴢᴢᴇʀ Bᴇᴀᴛᴇʀ
19. Bᴀsϙᴜᴀsʜ!
20. Rᴏ-Kʏᴜ-Bᴜ!
21. Dᴀsʜ Kᴀᴘᴘᴇɪ
22. Dɪᴀᴍᴏɴᴅ ɴᴏ Aᴄᴇ (Aᴄᴇ ᴏғ Dɪᴀᴍᴏɴᴅ)
23. Pʀɪɴᴄᴇss Nɪɴᴇ: Kɪsᴀʀᴀɢɪ Jᴏsʜɪᴋᴏᴜ Yᴀᴋʏᴜᴜʙᴜ
24. Mᴀᴊᴏʀ
25. Tᴏᴜᴄʜ
26. H2
27. Cʀᴏss Gᴀᴍᴇ
28. Tᴀɪsʜᴏᴜ Yᴀᴋʏᴜᴜ Mᴜsᴜᴍᴇ
29. Mᴏsʜɪᴅᴏʀᴀ (Wʜᴀᴛ Iғ ᴀ Fᴇᴍᴀʟᴇ Mᴀɴᴀɢᴇʀ ᴏғ ᴀ Hɪɢʜ Sᴄʜᴏᴏʟ Bᴀsᴇʙᴀʟʟ Tᴇᴀᴍ Rᴇᴀᴅ Dʀᴜᴄᴋᴇʀ’s)
30. Oɴᴇ Oᴜᴛs
31. Oᴏᴋɪᴋᴜ Fᴜʀɪᴋᴀʙᴜᴛᴛᴇ (Bɪɢ Wɪɴᴅᴜᴘ!)
32. Hᴀɪᴋʏᴜᴜ
33. Aᴛᴛᴀᴄᴋ ᴏɴ Tᴏᴍᴏʀʀᴏᴡ
34. Aᴛᴛᴀᴄᴋ Nᴏ.1
35. Aᴛᴛᴀᴄᴋᴇʀ Yᴏᴜ
36. Yᴏᴡᴀᴍᴜsʜɪ Pᴇᴅᴀʟ
37. Iᴅᴀᴛᴇɴ Jᴜᴍᴘ
38. Oᴠᴇʀ Dʀɪᴠᴇ
39. Nᴀsᴜ: Sᴜᴍᴍᴇʀ ɪɴ Aɴᴅᴀʟᴜsɪᴀ
40. Nᴀsᴜ : A Mɪɢʀᴀᴛᴏʀʏ Bɪʀᴅ ᴡɪᴛʜ Sᴜɪᴛᴄᴀsᴇ
41. Hᴀᴊɪᴍᴇ ɴᴏ Iᴘᴘᴏ
42. Asʜɪᴛᴀ ɴᴏ Jᴏᴇ
43. Gᴀɴʙᴀʀᴇ Gᴇɴᴋɪ
44. Nᴏᴢᴏᴍɪ Wɪᴛᴄʜᴇs
45. Oɴᴇ Pᴏᴜɴᴅ Gᴏsᴘᴇʟ
46. Aɪᴍ ғᴏʀ ᴛʜᴇ Aᴄᴇ!
47. Tʜᴇ Pʀɪɴᴄᴇ ᴏғ Tᴇɴɴɪs
48. Bᴀʙʏ Sᴛᴇᴘs
49. Eʏᴇsʜɪᴇʟᴅ 21
50. Sᴍᴀsʜ
51. Sʜᴀᴋᴜɴᴇᴛsᴜ ɴᴏ ᴛᴀᴋᴋʏᴜᴜ ᴍᴜsᴜᴍᴇ
52. Aɪʀ ɢᴇᴀʀ
53. Pʀɪɴᴄᴇ Oғ Sᴛʀɪᴅᴇ Aʟᴛᴇʀɴᴀᴛɪᴠᴇ
54. Fʀᴇᴇ!
55. Kᴇɴᴋᴏᴜ Zᴇɴʀᴀᴋᴇɪ Sᴜɪᴇɪʙᴜ Uᴍɪsʜᴏᴜ

*Mᴀʀcɪᴀʟ Aʀᴛe*

1. Bᴏʀᴜᴛᴏ: Nᴀʀᴜᴛᴏ Nᴇxᴛ Gᴇɴᴇʀᴀᴛɪᴏɴs
2. Sʜɪᴋᴀʙᴀɴᴇ Hɪᴍᴇ: Aᴋᴀ
3. Kᴀᴛᴀɴᴀɢᴀᴛᴀʀɪ
4. Sʜɪᴊᴏᴜ Sᴀɪᴋʏᴏᴜ ɴᴏ Dᴇsʜɪ Kᴇɴɪᴄʜɪ (KᴇɴIᴄʜɪ: Tʜᴇ Mɪɢʜᴛɪᴇsᴛ Dɪsᴄɪᴘʟᴇ)
5. Mᴀᴊɪ ᴅᴇ Wᴀᴛᴀsʜɪ ɴɪ Kᴏɪ Sʜɪɴᴀsᴀɪ!
6. Tᴀʙᴏᴏ Tᴀᴛᴛᴏᴏ
7. Sᴇɴɢᴏᴋᴜ Bᴀsᴀʀᴀ
8. Bᴇɴ-ᴛᴏ
9. Mᴇᴅᴀᴋᴀ Bᴏx
10. Mᴜsʜɪʙᴜɢʏᴏᴜ
11. Mᴀᴋᴇɴ-ᴋɪ!
12. Bʟᴀᴅᴇ & Sᴏᴜʟ
13. Fʀᴇᴇᴢɪɴɢ
14. Iᴋᴋɪᴛᴏᴜsᴇɴ (Iᴋᴋɪ Tᴏᴜsᴇɴ)
15. Asᴜ ɴᴏ Yᴏɪᴄʜɪ!
16. Kᴜʀᴏᴋᴀᴍɪ Tʜᴇ Aɴɪᴍᴀᴛɪᴏɴ
17. Tᴏᴋʏᴏ Mᴀᴊɪɴ Gᴀᴋᴜᴇɴ Kᴇɴᴘᴜᴄʜᴏ: Tᴏᴜ
18. Tᴇɴᴊᴏᴜ Tᴇɴɢᴇ
19. Bᴀᴋɪ (2018)
20. Kᴏɪʜɪᴍᴇ †Mᴜsᴏᴜ
21. Dʀᴀɢᴏɴ Bᴀʟʟ

*Mᴜsɪcal*

1. Sʜɪɢᴀᴛsᴜ ᴡᴀ Kɪᴍɪ ɴᴏ Usᴏ
2. Hɪʙɪᴋᴇ! Eᴜᴘʜᴏɴɪᴜᴍ
3. Zᴏᴍʙɪᴇʟᴀɴᴅ Sᴀɢᴀ
4. K-Oɴ!
5. Nᴏᴅᴀᴍᴇ Cᴀɴᴛᴀʙɪʟᴇ
6. Sᴏ Rᴀ Nᴏ Wᴏ Tᴏ
7. Bᴇᴄᴋ
8. BᴀɴG Dʀᴇᴀᴍ!
9. Tʜᴇ ɪDOLM@STER
10. Lᴏᴠᴇ Lɪᴠᴇ! Sᴄʜᴏᴏʟ Iᴅᴏʟ Pʀᴏᴊᴇᴄᴛ
11. Dᴇᴛʀᴏɪᴛ Mᴇᴛᴀʟ Cɪᴛʏ
12. Nᴀɴᴀ
13. IDOLɪSH7
14. Sᴀᴋᴀᴍɪᴄʜɪ ɴᴏ Aᴘᴏʟʟᴏɴ
15. Kɪɴɪʀᴏ ɴᴏ Cᴏʀᴅᴀ
16. Mᴀɢɪᴄ-Kʏᴜɴ! Rᴇɴᴀɪssᴀɴᴄᴇ
17. Pɪᴀɴᴏ ɴᴏ Mᴏʀɪ
18. Fᴜʟʟ Mᴏᴏɴ ᴡᴏ Sᴀɢᴀsʜɪᴛᴇ
19. Wʜɪᴛᴇ Aʟʙᴜᴍ
20. Wᴀᴋᴇ Uᴘ, Gɪʀʟs!
21. Tᴀʀɪ Tᴀʀɪ
22. Gʀᴀᴠɪᴛᴀᴛɪᴏɴ
23. Mᴀᴄʀᴏss Sᴇʀɪᴇs
24. ᴇғ: A Tᴀʟᴇ ᴏғ Mᴇᴍᴏʀɪᴇs.
25. Kᴀᴄʜᴏᴜ Oᴜᴊɪ
26. Lɪᴢ ᴛᴏ Aᴏɪ Tᴏʀɪ
27. Yᴏᴀᴋᴇ Tsᴜɢᴇʀᴜ Lᴜ ɴᴏ Uᴛᴀ
28. Aɪᴋᴀᴛsᴜ!
29. Sᴛᴀʀᴍʏᴜ
30. Fᴜᴜᴋᴀ
31. Sʜᴇʟᴛᴇʀ
32. AKB0048
33. Sʜᴏᴡ Bʏ Rᴏᴄᴋ!!
34. Sʏᴍᴘʜᴏɢᴇᴀʀ 

*Hᴀʀᴇᴍ*

1. Dᴀᴛᴇ ᴀ Lɪᴠᴇ
2.Mᴀʏᴏ Cʜɪᴋɪ!
3. Mᴏɴsᴛᴇʀ Mᴜsᴜᴍᴇ Nᴏ Iʀᴜ Nɪᴄʜɪᴊᴏᴜ
4. Tᴀɪᴍᴀᴅᴏᴜ Gᴀᴋᴜᴇɴ 35 Sʜᴏᴜᴛᴀɪ
5. Tʜᴇ Wᴏʀʟᴅ Gᴏᴅ Oɴʟʏ Kɴᴏᴡs
6. Dᴇɴᴘᴀ Kʏᴏᴜsʜɪ
7. Kᴏʀᴇ Wᴀ Zᴏᴍʙɪᴇ Dᴇsᴜᴋᴀ
8. Mᴏɴᴏɢᴀᴛᴀʀɪ Sᴇʀɪᴇs
9. OʀᴇIᴍᴏ
10. Zᴇʀᴏ ɴᴏ Tsᴜᴋᴀɪᴍᴀ
11. Mᴀʜᴏᴜ Sᴇɴsᴇɪ Nᴇɢɪᴍᴀ!
12. Isᴇᴋᴀɪ ɴᴏ Sᴇɪᴋɪsʜɪ Mᴏɴᴏɢᴀᴛᴀʀɪ
13. Mᴀɴɢᴀᴋᴀ-sᴀɴ ᴛᴏ Assɪsᴛᴀɴᴛ-sᴀɴ ᴛᴏ Tʜᴇ Aɴɪᴍᴀᴛɪᴏɴ
14. Iᴄʜɪɢᴏ 100%
15. Hᴀɪʏᴏʀᴇ! Nʏᴀʀᴜᴋᴏ-sᴀɴ
16. Sᴡᴏʀᴅ Aʀᴛ Oɴʟɪɴᴇ
17. Cᴀᴍᴘɪᴏɴᴇ!
18. Gʀɪsᴀɪᴀ Sᴇʀɪᴇs
19. Fʀᴇᴇᴢɪɴɢ
20. MM!
21. NᴏᴜCᴏᴍᴇ
22. Aʜ, Mʏ Gᴏᴅᴅᴇss
23. Lᴏᴠᴇ Hɪɴᴀ
24. Hɪɢʜ Sᴄʜᴏᴏʟ ᴏғ ᴛʜᴇ Dᴇᴀᴅ
25. Kɪss x sɪs
26. Hᴇɴᴛᴀɪ Oᴜᴊɪ ᴛᴏ Wᴀʀᴀᴡᴀɴᴀɪ Nᴇᴋᴏ.
27. Sʜɪɴᴍᴀɪ Mᴀᴏᴜ ɴᴏ Tᴇsᴛᴀᴍᴇɴᴛ
28. Sᴇᴋɪʀᴇɪ
29. Gᴀᴋᴜsᴇɴ Tᴏsʜɪ Asᴛᴇʀɪsᴋ
30. Sᴀᴇɴᴀɪ Hᴇʀᴏɪɴᴇ ɴᴏ Sᴏᴅᴀᴛᴇᴋᴀᴛᴀ
31. Mᴀsᴀᴍᴜɴᴇ-ᴋᴜɴ ɴᴏ Rᴇᴠᴇɴɢᴇ
32. Oʀᴇ ɴᴏ Kᴀɴᴏᴊᴏ ᴛᴏ Osᴀɴᴀɴᴀᴊɪᴍɪ ɢᴀ Sʜᴜʀᴀʙᴀ Sᴜɢɪʀᴜ
33. Sʜᴜғғʟᴇ!
34. Nʏᴀɴ Kᴏɪ!
35. Oᴜᴛʙʀᴇᴀᴋ Cᴏᴍᴘᴀɴʏ
36. Mᴀᴅᴀɴ ɴᴏ Oᴜ ᴛᴏ Vᴀɴᴀᴅɪs
37. Mᴀᴊɪ ᴅᴇ Wᴀᴛᴀsʜɪ ɴɪ Kᴏɪ Sʜɪɴᴀsᴀɪ!
38. Pʀɪɴᴄᴇss Lᴏᴠᴇʀ!
29. Sᴇɪᴋᴇɴ Tsᴜᴋᴀɪ ɴᴏ Wᴏʀʟᴅ Bʀᴇᴀᴋ
40. Rᴏᴋᴜᴊᴏᴜᴍᴀ ɴᴏ Sʜɪɴʀʏᴀᴋᴜsʜᴀ!?
41. Hɪɢʜ Sᴄʜᴏᴏʟ DxD
42. Nɪsᴇᴋᴏɪ
43. Bᴏᴋᴜ ᴡᴀ Tᴏᴍᴏᴅᴀᴄʜɪ ɢᴀ Sᴜᴋᴜɴᴀɪ
44. Rᴏsᴀʀɪᴏ ᴛᴏ Vᴀᴍᴘɪʀᴇ
45. IS: Iɴғɪɴɪᴛᴇ Sᴛʀᴀᴛᴏs
46. Tᴏ LOVE-Rᴜ Sᴇʀɪᴇs
47. Sᴏʀᴀ ɴᴏ Oᴛᴏsʜɪᴍᴏɴᴏ
48. Tʀɪɴɪᴛʏ Sᴇᴠᴇɴ
49. Yᴀᴍᴀᴅᴀ-ᴋᴜɴ ᴛᴏ 7-ɴɪɴ ɴᴏ Mᴀᴊᴏ
50. Iᴄʜɪʙᴀɴ Usʜɪʀᴏ ɴᴏ Dᴀɪᴍᴀᴏᴜ

*Rᴇᴠᴇʀsᴇ Hᴀʀᴇᴍ*

1. Hᴀɴᴀsᴀᴋᴇʀᴜ Sᴇɪsʜᴏᴜɴᴇɴ
2. Uᴛᴀ ɴᴏ☆Pʀɪɴᴄᴇ-sᴀᴍᴀ♪
3. Hᴀᴋᴜᴏᴜᴋɪ
4. Yᴀᴍᴀᴛᴏ Nᴀᴅᴇsʜɪᴋᴏ Sʜɪᴄʜɪ Hᴇɴɢᴇ
5. Aᴋᴀᴛsᴜᴋɪ ɴᴏ Yᴏɴᴀ
6. Fᴜsʜɪɢɪ Yᴜᴜɢɪ (Mʏsᴛᴇʀɪᴏᴜs Pʟᴀʏ)
7. Dɪᴀʙᴏʟɪᴋ Lᴏᴠᴇʀs
8. Aʀᴄᴀɴᴀ Fᴀᴍɪɢʟɪᴀ
9. Bʀᴏᴛʜᴇʀs Cᴏɴғʟɪᴄᴛ
10. Dᴀɴᴄᴇ ᴡɪᴛʜ Dᴇᴠɪʟs
11. Oᴜʀᴀɴ Hɪɢʜ Sᴄʜᴏᴏʟ Hᴏsᴛ Cʟᴜʙ
12. Kᴀᴍɪsᴀᴍᴀ Hᴀᴊɪᴍᴇᴍᴀsʜɪᴛᴀ
13. Aᴍɴᴇsɪᴀ
14. Bᴏɴᴊᴏᴜʀ Sᴡᴇᴇᴛ Lᴏᴠᴇ Pᴀᴛɪssᴇʀɪᴇ
15. Kᴀᴍɪɢᴀᴍɪ ɴᴏ Asᴏʙɪ
16. Hɪɪʀᴏ ɴᴏ Kᴀᴋᴇʀᴀ

*Rᴏᴍᴀɴᴄᴇ*

1 Cʟᴀʏ & Mᴀʀɪᴀ
2. Wʜɪᴛᴇ Aʟʙᴜᴍ 
3. Cʟᴀɴɴᴀᴅ Aғᴛᴇʀ Sᴛᴏʀʏ
4. Aɴɢᴇʟ Bᴇᴀᴛs
5. Isʜᴜᴜᴋᴀɴ Fʀɪᴇɴᴅs.
6. Sʜɪɢᴀᴛsᴜ ᴡᴀ Kɪᴍɪ ɴᴏ Usᴏ
7. Nɪsᴇᴋᴏɪ
8. Gᴏʟᴅᴇɴ Tɪᴍᴇ
9. Nᴀɢɪ ɴᴏ Asᴜᴋᴀʀᴀ
10. Aᴏ Hᴀʀᴜ Rɪᴅᴇ
11. Oʀᴇ Mᴏɴᴏɢᴀᴛᴀʀɪ
12. Sᴀᴇɴᴀɪ Hᴇʀᴏɪɴᴇ Nᴏ Sᴏᴅᴀᴛᴇᴋᴀ
13. Gᴇᴋᴋᴀɴ Sʜᴏᴊᴏᴜ Nᴏᴢᴀᴋɪ-Kᴜɴ
14. Sᴀɴᴋᴀʀᴇᴀ
15. Kᴏᴋᴏʀᴏ Cᴏɴɴᴇᴄᴛ
16. Aᴍᴀɢᴀᴍɪ SS
17. Kᴏᴛᴏᴜʀᴀ-sᴀɴ (Mᴀsᴜᴋɪɴ Dᴀғᴛᴀʀ Cᴀᴅᴀɴɢᴀɴ Aᴊᴀʜ)
18. Hᴇɴᴛᴀɪ Oᴜᴊɪ ᴛᴏ Wᴀʀᴀᴡᴀɴᴀɪ Nᴇᴋᴏ
19. Tᴏɴᴀʀɪ ɴᴏ Kᴀɪʙᴜᴛsᴜ-ᴋᴜɴ
20. Kᴀɪᴄʜᴏᴜ ᴡᴀ Mᴀɪᴅ-sᴀᴍᴀ!
21. Pʟᴀsᴛɪᴄ Mᴇᴍᴏʀɪᴇs
22. Tᴏʀᴀᴅᴏʀᴀ!
23. Aɴᴏ Hɪ Mɪᴛᴀ Hᴀɴᴀ
24. Zᴇʀᴏ ɴᴏ Tsᴜᴋᴀɪᴍᴀ
25. Bᴏᴋᴜʀᴀ ᴡᴀ Mɪɴɴᴀ Kᴀᴡᴀɪsᴏᴜ
26. Iᴛᴀᴢᴜʀᴀ ɴᴀ Kɪss
27. Yᴀᴍᴀᴅᴀ-ᴋᴜɴ ᴛᴏ 7 ɴɪɴ ɴᴏ Mᴀᴊᴏ
28. Aᴋᴀᴛsᴜᴋɪ Nᴏ Yᴏɴᴀ
29. Oʀᴇ ɴᴏ Kᴀɴᴏᴊᴏ ᴛᴏ Osᴀɴᴀɴᴀᴊɪᴍɪ ɢᴀ Sʜᴜʀᴀʙᴀ Sᴜɢɪʀᴜ
30. Yᴏsᴜɢᴀ ɴᴏ Sᴏʀᴀ
31. Sᴡᴏʀᴅ Aʀᴛ Oɴʟɪɴᴇ
32. Aɴᴏ Nᴀᴛsᴜ ᴅᴇ Mᴀᴛᴛᴇʀᴜ
33. Nᴀʀᴜᴛᴏ Sʜɪᴘᴘᴜᴅᴇɴ : Tʜᴇ Lᴀsᴛ
34. Kɪᴍɪ ɴɪ Tᴏᴅᴏᴋᴇ
35. Gᴏsɪᴄᴋ
36. Nᴀɢᴀᴛᴏ Yᴜᴋɪ-Cʜᴀɴ ɴᴏ Sᴏᴜsʜɪᴛsᴜ (Gᴀᴍʙᴀʀ ᴅᴀʀɪ Sᴢᴜᴍɪʏᴀ Hᴀʀᴜʜɪ ɴᴏ Sᴏᴜsʜɪᴛsᴜ)
37. Kᴀᴍɪsᴀᴍᴀ Hᴀᴊɪᴍᴇᴍᴀsʜɪᴛᴀ
38. Oʀᴇɢᴀɪʀᴜ
39. Sᴏʀᴇᴅᴇᴍᴏ Sᴇᴋᴀɪ ᴡᴀ Uᴛsᴜᴋᴜsʜɪɪ
42. Sᴇʀᴠᴀɴᴛ x Sᴇʀᴠɪᴄᴇ
43. Wᴏʀᴋɪɴɢ
44. Aᴋᴀɢᴀᴍɪ ɴᴏ Sʜɪʀᴀʏᴜᴋɪ Hɪᴍᴇ
45. Dᴇɴᴘᴀ Oɴɴᴀ ᴛᴏ Sᴇɪsʜᴜɴ Oᴛᴏᴋᴏ
46. Tᴀsᴏɢᴀʀᴇ Oᴛᴏᴍᴇ x Aᴍɴᴇsɪᴀ
47. NHK Nɪ Yᴏᴜᴋᴏsᴏ
48. Bᴏᴋᴜ Dᴀᴋᴇ ɢᴀ Iɴᴀɪ Mᴀᴄʜɪ
49. Iɴᴜ x Bᴏᴋᴜ Sᴇᴄʀᴇᴛ Sᴇʀᴠɪᴄᴇ
50. Nᴀᴢᴏ ɴᴏ Kᴀɴᴏᴊᴏ X
51. Sᴘᴇᴄɪᴀʟ A
52. Lᴏᴠᴇʟʏ Cᴏᴍᴘʟᴇx
53. Sᴜᴋɪᴛᴛᴇ Iɪ ɴᴀ ʏᴏ
54. Eɪᴋᴏᴋᴜ Kᴏɪ Mᴏɴᴏɢᴀᴛᴀʀɪ Eᴍᴍᴀ
55. Nᴀɴᴀ
56. Rᴏᴍᴇᴏ x Jᴜʟɪᴇᴛ
57. Hᴀᴄʜɪᴍɪᴛsᴜ ᴛᴏ Cʟᴏᴠᴇʀ
58. Bʏᴏᴜsᴏᴋᴜ 5 Cᴇɴᴛɪᴍᴇᴛᴇʀ
59. Bᴏᴋᴜʀᴀ ɢᴀ Iᴛᴀ
60. Kᴏɪ Kᴀᴢᴇ
61. Oᴏᴋᴀᴍɪ ᴛᴏ Kᴏᴜsʜɪɴʀʏᴏᴜ
62. Nᴏᴅᴀᴍᴇ Cᴀɴᴛᴀʙɪʟᴇ 
63. Hᴏᴛᴀʀᴜʙɪ ɴᴏ Mᴏʀɪ ᴇ
64. Kɪᴍɪ ɴᴏ Nᴀ Wᴀ?
65. Hᴏʀɪ-sᴀɴ ᴛᴏ Mɪʏᴀᴍᴜʀᴀ-ᴋᴜɴ
66. Rᴇᴄ
67. Cʜɪʜᴀʏᴀғᴜʀᴜ
68. Mᴀsʜɪʀᴏ-ɪʀᴏ Sʏᴍᴘʜᴏɴʏ
70. Cʀᴏss Gᴀᴍᴇ
71. Tʀᴜᴇ Tᴇᴀʀs
72. Mᴀsᴀᴍᴜɴᴇ-ᴋᴜɴ ɴᴏ Rᴇᴠᴇɴɢᴇ 
73. Sᴇɪʀᴇɴ 
74. RᴇLIFE
75. Hᴏsʜɪᴢᴏʀᴀ ᴇ Kᴀᴋᴀʀᴜ Hᴀsʜɪ
76. Eʀᴏᴍᴀɴɢᴀ-Sᴇɴsᴇɪ
77. Kᴏᴇ ɴᴏ Kᴀᴛᴀᴄʜɪ
78. Nᴏɢɪᴢᴀᴋᴀ Hᴀʀᴜᴋᴀ ɴᴏ Hɪᴍɪᴛsᴜ
79. Kɪᴢɴᴀɪᴠᴇʀ
80. Gᴜɪʟᴛʏ Cʀᴏᴡɴ
81. Oʀᴀɴɢᴇ
82. Tsᴜᴋɪ ɢᴀ Kɪʀᴇɪ
83. Gᴀᴍᴇʀs
84. Sᴀᴋᴜʀᴀsᴏᴜ ɴᴏ ᴘᴇᴛ ɴᴀ ᴋᴀɴᴏᴊᴏᴜ
85. Oʀᴇ ɴᴏ Iᴍᴏᴜᴛᴏ ɢᴀ Kᴏɴɴᴀɴɪ Kᴀᴡᴀɪɪ Wᴀᴋᴇ ɢᴀ Nᴀɪ

*GAME + ISEKAI*

1. Mᴏɴᴅᴀɪᴊɪ - ᴛᴀᴄʜɪ ɢᴀ Isᴇᴋᴀɪ Kᴀʀᴀ Kᴜʀᴜ Sᴏ Dᴇsᴜ Yᴏ?
2. Nᴏ Gᴀᴍᴇ Nᴏ Lɪғᴇ
3. Aᴄᴄᴇʟ Wᴏʀʟᴅ
4. Kᴏɴᴏ Sᴜʙᴀʀᴀsʜɪ Isᴇᴋᴀɪ Sᴏɴᴏ Sʜᴜᴋᴜғᴜᴋᴜ ᴡo
5. 3 Gᴀᴛsᴜ ɴᴏ Lɪᴏɴ
6. Sᴡᴏʀᴅ Aʀᴛ Oɴʟɪɴᴇ
7. Mᴀᴅᴀɴ Oᴜ Vᴀɴᴀᴅɪs

*𝑾𝒂𝒊𝒇𝒖-𝑩𝒐𝒕*`)
					break
				
				case 'goldbutton':
						if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					  if (args.length < 1) return reply('Donde esta el texto??')
                     if (args.length > 10) return reply('Maximo 10 letras')
					 gbu = `${body.slice(12)}`
					 buff = await getBuffer(`https://api.zeks.xyz/api/gplaybutton?text=${gbu}&apikey=apivinz`, {method: 'get'})
					 client.sendMessage(from, buff, image, {quoted: mek})
					 await limitAdd(sender)
					 break 
				case 'silverbutton':
						if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					  if (args.length < 1) return reply('Donde esta el texto??')
                     if (args.length > 10) return reply('Maximo 10 letras')
					 tsil = `${body.slice(14)}`
					 buff = await getBuffer(`https://api.zeks.xyz/api/splaybutton?text=${tsil}&apikey=apivinz`, {method: 'get'})
					 client.sendMessage(from, buff, image, {quoted: mek})
					 await limitAdd(sender)
					 break 
                 
                
        
        
                case 'bpink':
             	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
                bpp = `${body.slice(7)}`
                     if (args.length < 1) return reply('Donde esta el texto??')
                     if (args.length > 10) return reply('Maximo 10 letras')
                     buff = await getBuffer(`https://api.zeks.xyz/api/logobp?text=${bpp}&apikey=apivinz`, {method: 'get'})
                     client.sendMessage(from, buff, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
			    case 'quotemaker':
			if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				

					gh = `${body.slice(12)}`
					quote = gh.split("/")[0];
					wm = gh.split("/")[1];
					bg = gh.split("/")[2];
					const pref = `Use: \n${prefix}quotemaker texto/texto/theme\n\nEx :\n${prefix}quotemaker confu/hermoso/random`
					if (args.length < 1) return reply(pref)
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=${bg}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break 
                case 'phlogo':
           	if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					gh = `${body.slice(8)}`
					gbl1 = gh.split("/")[0];
					gbl2 = gh.split("/")[1];
					if (args.length < 1) return reply('Donde esta el texto?')
					buffer = await getBuffer(`https://api.zeks.xyz/api/phlogo?text1=${gbl1}&text2=${gbl2}&apikey=apivinz`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break
					case 'sebusca':  
			if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					gh = `${body.slice(8)}`
					name = gh.split("/")[0];
					costo = gh.split("/")[1];
					if (args.length < 1) return reply('Donde esta el texto?')	
					reply(ind.wait())							
						try {
					perfil = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
					perfil = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
					}
						buffer = await getBuffer(`https://videfikri.com/api/textmaker/wanted/?urlgbr=${perfil}&text1=${name}&text2=${costo}`)
		  client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break
					case 'matrix':
		if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					gh = `${body.slice(8)}`
					confus = gh.split("/")[0];				
					if (args.length < 1) return reply('Donde esta el texto?')	
					reply(ind.wait())					
		    buffer = await getBuffer(`https://api.zeks.xyz/api/matrix?apikey=apivinz&text=${confus}`)
		        client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break
					
					
			       
					
					
					
				case 'thunder':
		if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					gh = `${body.slice(9)}`
					vv = gh.split("/")[0];				
					if (args.length < 1) return reply('Donde esta el texto?')	
					reply(ind.wait())					
		    buffer = await getBuffer(`https://api.zeks.xyz/api/thundertext?text=${vv}&apikey=apivinz`)
		        client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break
						
					case 'wlogo':
		if (isLimit(sender)) return reply(ind.limitend(pusname)) 
	   if	(!isRegistered) return reply(ind.noregis())				
					gh = `${body.slice(7)}`
					U = gh.split("/")[0];
					W = gh.split("/")[1];				
					if (args.length < 1) return reply('Donde esta el texto?')	
					reply(ind.wait())					
		    buffer = await getBuffer(`https://api.zeks.xyz/api/wolflogo?apikey=apivinz&text1=${U}&text2=${W}`)
		        client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break
				
				
				
			case 'juego':
			reply(`𝑷𝑰𝑬𝑫𝑹𝑨 𝑷𝑨𝑷𝑬𝑳 𝑶 𝑻𝑰𝑱𝑬𝑹𝑨 :
			
		    𝑷𝑨𝑹𝑨 𝑱𝑼𝑮𝑨𝑹 𝑼𝑻𝑰𝑳𝑰𝒁𝑨 𝑼𝑵𝑶 𝑫𝑬 𝑬𝑺𝑻𝑶𝑺 𝑬𝑴𝑶𝑱𝑰𝑺
		    
		   𝑷𝑰𝑬𝑫𝑹𝑨 : /✊
		   
		   𝑷𝑨𝑷𝑬𝑳 : /✋
		   
		   𝑻𝑰𝑱𝑬𝑹𝑨 : /✌️`)
		   break
		  
		   case '✊':
const piedra =[`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✋\n\n :) 𝑮𝒂𝒏𝒆 𝒉𝒖𝒎𝒂𝒏𝒐 𝒆𝒔𝒕𝒖𝒑𝒊𝒅𝒐`,`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✊\n\n :0 𝑬𝒎𝒑𝒂𝒕𝒆`,`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✌️\n\n :( 𝑮𝒂𝒏𝒂𝒔 𝒕𝒖`]
    const jg = piedra[Math.floor(Math.random() * piedra.length)]
    client.sendMessage(from, `𝑷𝑰𝑬𝑫𝑹𝑨 𝑷𝑨𝑷𝑬𝑳 𝑶 𝑻𝑰𝑱𝑬𝑹𝑨\n\n` + jg, text)
    break
    
    case '✋':
const papel =[`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✋\n\n  :0 𝑬𝒎𝒑𝒂𝒕𝒆`,`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✊\n\n :( 𝑮𝒂𝒏𝒂𝒔 𝒕𝒖`,`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✌️\n\n :) 𝑮𝒂𝒏𝒆 𝒉𝒖𝒎𝒂𝒏𝒐 𝒆𝒔𝒕𝒖𝒑𝒊𝒅𝒐`]
    const jggg = papel[Math.floor(Math.random() * papel.length)]
    client.sendMessage(from, `𝑷𝑰𝑬𝑫𝑹𝑨 𝑷𝑨𝑷𝑬𝑳 𝑶 𝑻𝑰𝑱𝑬𝑹𝑨\n\n` + jggg, text)
    break
    
    case '✌️':
const tijera =[`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✋\n\n:( 𝑮𝒂𝒏𝒂𝒔 𝒕𝒖`,`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✊\n\n :) 𝑮𝒂𝒏𝒆 𝒉𝒖𝒎𝒂𝒏𝒐 𝒆𝒔𝒕𝒖𝒑𝒊𝒅𝒐`,`𝒀𝒐 𝒆𝒍𝒊𝒋𝒐 : ✌️\n\n:0 𝑬𝒎𝒑𝒂𝒕𝒆 `]
    const jgg = tijera[Math.floor(Math.random() * tijera.length)]
    client.sendMessage(from, `𝑷𝑰𝑬𝑫𝑹𝑨 𝑷𝑨𝑷𝑬𝑳 𝑶 𝑻𝑰𝑱𝑬𝑹𝑨\n\n` + jgg, text)
    break
    
    
     
     
								default:
			if (body.startsWith(`${prefix}${command}`)) {
                  reply(`Lo siento *${pushname}*, Comando *${prefix}${command}* No esta registrado en mi base de datos escribe *${prefix}menu*!`)
                  }
            if (/^>/.test(pes)) {
            	if (!isOwner) return
	            let txt = pes.replace(/^>/, '')
	            let type = Function
	            if (/await/.test(pes)) type = (async () => {}).constructor
	            let func = new type('print', 'client', 'MessageType', 'mek', 'text', 'from', 'image', 'os', 'fetch', txt)
	            console.log('[EvalF]', func.toString())
	            let output
	            try {
	                output = await func((...args) => {
	                    console.log('[EvalP]', ...args)
	                    client.sendMessage(from, util.format(...args), MessageType.extendedText, {
	                        quoted: mek
	                    })
	                }, client, MessageType, mek, text, from, await image, os, fetch)
	                console.log('[EvalO]', output)
	                client.sendMessage(from, util.format(output), MessageType.extendedText, {
	                    quoted: mek
	                })
	            } catch (e) {
	                console.error('[EvalE]', e)
	                client.sendMessage(from, util.format(e), MessageType.extendedText, {
	                    quoted: mek
	                })
	            }
            }
			if (isGroup && !isCmd && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}




