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

const ownerContact = async (m, gss) => {
    const ownernumber = config.OWNER_NUMBER;
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === 'owner') {
        try {
            await gss.sendContact(m.from, [ownernumber], m);
            await m.React("✅");
        } catch (error) {
            console.error('Error sending owner contact:', error);
            m.reply('Error sending owner contact.');
            await m.React("❌");
        }
    }
};

export default ownerContact;