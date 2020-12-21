const discord = require("discord.js");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync(".config.json"));
let cli = new discord.Client();

//on message event
cli.on('message', (msg)=>{
    //if not bot
    if(!msg.author.bot){
        //cuting message content into parts for better computer comprehention
        let content = msg.content.split(' ');
        //if prefix is used
        if(content[0] === config.prefix){
            // get member and role before starting procedure
            const member = msg.guild.members.cache.get(msg.author.id);
            const role = msg.guild.roles.cache.get(config.role);
            //if role is already assigned
            if(!member.roles.cache.get(config.role)){
                //add role
                member.roles.add(role);
            } else {
                //remove role
                member.roles.remove(role);
            }
            msg.delete();
        }
    }
});

//login with bot credentials
cli.login(config.discordToken);