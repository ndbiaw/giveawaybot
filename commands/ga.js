let Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'ga',
    description: "Tạo một giveaway.",
    execute(client, message){
        if (!message.guild) return;
        async function giveaway() {
            var time = '';
            var time2 = '';
            var time3 = '';
            if (message.content === `${prefix}ga`) return message.channel.send(`Bạn chưa đặt thời hạn hoặc giải thưởng. Ví dụ: **h!ga 1d 1₫** sẽ tạo Giveaway trong thời gian 1 ngày với giải thưởng 1₫`)
            if (message.content !== `${prefix}ga`) {
                const stated_duration_hours = message.content.split(' ')[1];
                const stated_duration_hours2 = stated_duration_hours.toLowerCase();
                if (stated_duration_hours2.includes('s')) {
                    var time = 's';
                }
                if (stated_duration_hours2.includes('m')) {
                    var time = 'm';
                }
                if (stated_duration_hours2.includes('h')) {
                    var time = 'h';
                }
                if (stated_duration_hours2.includes('d')) {
                    var time = 'd';
                }
                const stated_duration_hours3 = stated_duration_hours2.replace(time, '');
                if (stated_duration_hours3 === '0') {
                    message.channel.send('Thời gian giveaway nhỏ nhất là 1.');
                }
                if (isNaN(stated_duration_hours3)) {
                    message.channel.send('Biến thời gian không hợp lệ, phải là s (giây), m (phút), h (giờ), d (ngày).');
                }
                if (stated_duration_hours3 > 1) {
                    var time3 = '';
                }
                if (time === 's') {
                    var actual_duration_hours = stated_duration_hours3 * 1000;
                    var time2 = 'giây';
                }
                if (time === 'm') {
                    var actual_duration_hours = stated_duration_hours3 * 60000;
                    var time2 = 'phút';
                }
                if (time === 'h') {
                    var actual_duration_hours = stated_duration_hours3 * 3600000;
                    var time2 = 'giờ';
                }
                if (time === 'd') {
                    var actual_duration_hours = stated_duration_hours3 * 86400000;
                    var time2 = 'ngày';
                }
                message.delete({ timeout: 1 });
                if (!isNaN(stated_duration_hours3)) {
                    const prize = message.content.split(' ').slice(2).join(' ');
                    if (prize === '') return message.channel.send('Bạn phải nhập một giải thưởng.');
                    if (stated_duration_hours3 !== '0') {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor('FF0000')
                        .setDescription(`Ấn vào 🎉 để tham gia!\nThời gian: **${stated_duration_hours3}** ${time2}${time3}\nTổ chức bởi: ${message.author}`)
                        .setTimestamp(Date.now() + (actual_duration_hours))
                        .setFooter('Kết thúc lúc:')
                        let msg = await message.channel.send(':tada: **GIVEAWAY** :tada:', embed)
                        await msg.react('🎉')
                        setTimeout(() => {
                            msg.reactions.cache.get('🎉').users.remove(client.user.id)
                            setTimeout(() => {
                                let winner = msg.reactions.cache.get('🎉').users.cache.random();
                                if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                                    const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor('B9BBBE')
                                    .setDescription(`Người chiến thắng:\nKhông ai tham gia giveaway.\nTổ chức bởi: ${message.author}`)
                                    .setTimestamp()
                                    .setFooter('Kết thúc lúc')
                                    msg.edit(':tada: **GIVEAWAY KẾT THÚC** :tada:', winner_embed);
                                }
                                if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                                    const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor('B9BBBE')
                                    .setDescription(`Người chiến thắng:\n${winner}\nTổ chức bởi: ${message.author}`)
                                    .setTimestamp()
                                    .setFooter('Kết thúc lúc')
                                    msg.edit(':tada: **GIVEAWAY KẾT THÚC** :tada:', winner_embed);
                                }
                            }, 1000);
                        }, actual_duration_hours);
                    }
                }
            }
        }
        giveaway();
    }
}
