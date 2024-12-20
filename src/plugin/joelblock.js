/*
░█ 
░░░░░██╗░█████╗░███████╗██╗░░░░░
░░░░░██║██╔══██╗██╔════╝██║░░░░░
░░░░░██║██║░░██║█████╗░░██║░░░░░
██╗░░██║██║░░██║██╔══╝░░██║░░░░░
╚█████╔╝╚█████╔╝███████╗███████╗
░╚════╝░░╚════╝░╚══════╝╚══════╝

WHATSAPP BOT BY @joel james tech
Helpers - @joel james
        - @joel it
WHATSAPP - 255714595078
SUPPORT GROUP - https://wa.me/255714595078
Don't change this info else bot won't work by joeljames tech

*/










import config from '../../config.cjs';

const block = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['block'];

    if (!validCommands.includes(cmd)) return;
    
    if (!isCreator) return m.reply("*you are not my owner idiot*");

    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    
    await gss.updateBlockStatus(users, 'block')
      .then((res) => m.reply(`Blocked ${users.split('@')[0]} successfully.`))
      .catch((err) => m.reply(`Failed to block user: ${err}`));
  } catch (error) {
    console.error('Error:', error);
    m.reply('didnt block this person sounds you like him/her.');
  }
};

export default block;
