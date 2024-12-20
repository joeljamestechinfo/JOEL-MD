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

const demote = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['demote', 'unadmin'];

    if (!validCommands.includes(cmd)) return;


    if (!m.isGroup) return m.reply("*group command comrade*");
    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botNumber = await gss.decodeJid(gss.user.id);
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (!botAdmin) return m.reply("*im not admin in this group idiot*");
    if (!senderAdmin) return m.reply("*admin rule*");

    if (!m.mentionedJid) m.mentionedJid = [];

    if (m.quoted?.participant) m.mentionedJid.push(m.quoted.participant);

    const users = m.mentionedJid.length > 0
      ? m.mentionedJid
      : text.replace(/[^0-9]/g, '').length > 0
      ? [text.replace(/[^0-9]/g, '') + '@s.whatsapp.net']
      : [];

    if (users.length === 0) {
      return m.reply("* PLEASE MENTION OR QUOTE A USER TO DEMOTE*");
    }

    const validUsers = users.filter(Boolean);

    await gss.groupParticipantsUpdate(m.from, validUsers, 'demote')
      .then(() => {
        const demotedNames = validUsers.map(user => `@${user.split("@")[0]}`);
        m.reply(`*USERS ${demotedNames} DEMOTED SUCCESSFULLY IN THE GROUP ${groupMetadata.subject}*`);
      })
      .catch(() => m.reply('Failed to demote user(s) in the group.'));
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default demote;
