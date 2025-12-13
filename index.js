// Importar módulos necesarios
const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ActivityType } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');
require('dotenv').config();

// Cargar configuración desde config.yml o variables de entorno
let config;
try {
  // Intentar cargar desde el archivo YAML primero
  config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
  
  // Si estamos en producción (Railway), priorizar variables de entorno
  if (process.env.NODE_ENV === 'production') {
    config.bot.token = process.env.DISCORD_TOKEN || config.bot.token;
    config.branding.color = process.env.BRANDING_COLOR || config.branding.color;
    config.branding.logo = process.env.BRANDING_LOGO || config.branding.logo;
    config.channels.welcome = process.env.WELCOME_CHANNEL_ID || config.channels.welcome;
    config.channels.goodbye = process.env.GOODBYE_CHANNEL_ID || config.channels.goodbye;
    config.channels.logs = process.env.LOGS_CHANNEL_ID || config.channels.logs;
    config.roles.autorole = process.env.AUTOROLE_ID || config.roles.autorole;
  }
} catch (error) {
  console.error('Error al cargar configuración:', error);
  process.exit(1);
}

// Verificar que el token esté configurado
if (!config.bot.token || config.bot.token === "PON_AQUI_EL_TOKEN") {
  console.error('❌ ERROR: Token de Discord no configurado. Por favor, configura la variable DISCORD_TOKEN en Railway o edita config.yml');
  process.exit(1);
}

// Crear instancia del cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

// Evento cuando el bot está listo
client.once('ready', async () => {
  console.log('✔ Bot encendido');
  console.log(`✔ Nombre del bot: ${client.user.tag}`);
  console.log(`✔ Número de servidores: ${client.guilds.cache.size}`);
  
  // Establecer estado del bot
  client.user.setActivity({
    name: config.bot.status,
    type: ActivityType.Watching
  });
  
  // Registrar comandos slash
  await registerSlashCommands();
});

// Función para registrar comandos slash
async function registerSlashCommands() {
  const commands = [
    // Comando de ping
    new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Muestra la latencia del bot'),
    
    // Comando de panel
    new SlashCommandBuilder()
      .setName('panel')
      .setDescription('Obtén un enlace al panel de NeonCore'),
    
    // Comando de planes
    new SlashCommandBuilder()
      .setName('planes')
      .setDescription('Muestra los planes de hosting disponibles'),
    
    // Comando de ban
    new SlashCommandBuilder()
      .setName('ban')
      .setDescription('Banea a un usuario del servidor')
      .addUserOption(option => 
        option.setName('usuario')
          .setDescription('Usuario a banear')
          .setRequired(true))
      .addStringOption(option => 
        option.setName('motivo')
          .setDescription('Motivo del baneo')
          .setRequired(false))
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    
    // Comando de kick
    new SlashCommandBuilder()
      .setName('kick')
      .setDescription('Expulsa a un usuario del servidor')
      .addUserOption(option => 
        option.setName('usuario')
          .setDescription('Usuario a expulsar')
          .setRequired(true))
      .addStringOption(option => 
        option.setName('motivo')
          .setDescription('Motivo de la expulsión')
          .setRequired(false))
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    
    // Comando de timeout
    new SlashCommandBuilder()
      .setName('timeout')
      .setDescription('Aísla a un usuario temporalmente')
      .addUserOption(option => 
        option.setName('usuario')
          .setDescription('Usuario a aislar')
          .setRequired(true))
      .addIntegerOption(option => 
        option.setName('minutos')
          .setDescription('Duración del aislamiento en minutos')
          .setRequired(true))
      .addStringOption(option => 
        option.setName('motivo')
          .setDescription('Motivo del aislamiento')
          .setRequired(false))
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  ];
  
  try {
    console.log('🔄 Registrando comandos slash...');
    await client.application.commands.set(commands);
    console.log('✅ Comandos slash registrados correctamente');
  } catch (error) {
    console.error('❌ Error al registrar comandos:', error);
  }
}

// Evento para interacciones de comandos slash
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  
  const { commandName } = interaction;
  
  // Comando /ping
  if (commandName === 'ping') {
    const embed = new EmbedBuilder()
      .setColor(config.branding.color)
      .setTitle('🏓 Pong!')
      .setDescription(`Latencia: ${client.ws.ping}ms`)
      .setThumbnail(config.branding.logo)
      .setTimestamp()
      .setFooter({ text: config.branding.name });
    
    await interaction.reply({ embeds: [embed] });
  }
  
  // Comando /panel
  if (commandName === 'panel') {
    const embed = new EmbedBuilder()
      .setColor(config.branding.color)
      .setTitle('Panel de NeonCore')
      .setDescription('Accede al panel de control de tus servicios:')
      .addFields(
        { name: '🔗 Enlace al panel', value: 'https://panel.neoncore.host (ficticio)' }
      )
      .setThumbnail(config.branding.logo)
      .setTimestamp()
      .setFooter({ text: config.branding.name });
    
    await interaction.reply({ embeds: [embed] });
  }
  
  // Comando /planes
  if (commandName === 'planes') {
    const embed = new EmbedBuilder()
      .setColor(config.branding.color)
      .setTitle('Planes de Hosting - NeonCore')
      .setDescription('Descubre nuestros planes de hosting:')
      .setThumbnail(config.branding.logo)
      .setTimestamp()
      .setFooter({ text: config.branding.name });
    
    // Añadir cada plan como campo
    config.hosting_plans.forEach(plan => {
      embed.addFields({
        name: `${plan.name} - ${plan.price}`,
        value: `**RAM:** ${plan.ram}\n**CPU:** ${plan.cpu}\n**Almacenamiento:** ${plan.storage}\n**Descripción:** ${plan.description}`
      });
    });
    
    await interaction.reply({ embeds: [embed] });
  }
  
  // Comando /ban
  if (commandName === 'ban') {
    const user = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('motivo') || 'No se especificó motivo';
    
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
    }
    
    try {
      await interaction.guild.members.ban(user, { reason });
      
      // Embed de confirmación
      const embed = new EmbedBuilder()
        .setColor(config.branding.color)
        .setTitle('🔨 Usuario Baneado')
        .setDescription(`Se ha baneado a ${user.tag}`)
        .addFields(
          { name: 'Motivo', value: reason },
          { name: 'Moderador', value: interaction.user.tag }
        )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: config.branding.name });
      
      await interaction.reply({ embeds: [embed] });
      
      // Enviar logs al canal configurado
      sendLogEmbed('Ban', `Se ha baneado a ${user.tag} por: ${reason}`, interaction.user);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Ha ocurrido un error al intentar banear al usuario.', ephemeral: true });
    }
  }
  
  // Comando /kick
  if (commandName === 'kick') {
    const user = interaction.options.getUser('usuario');
    const reason = interaction.options.getString('motivo') || 'No se especificó motivo';
    
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
    }
    
    try {
      const member = await interaction.guild.members.fetch(user.id);
      await member.kick(reason);
      
      // Embed de confirmación
      const embed = new EmbedBuilder()
        .setColor(config.branding.color)
        .setTitle('👢 Usuario Expulsado')
        .setDescription(`Se ha expulsado a ${user.tag}`)
        .addFields(
          { name: 'Motivo', value: reason },
          { name: 'Moderador', value: interaction.user.tag }
        )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: config.branding.name });
      
      await interaction.reply({ embeds: [embed] });
      
      // Enviar logs al canal configurado
      sendLogEmbed('Kick', `Se ha expulsado a ${user.tag} por: ${reason}`, interaction.user);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Ha ocurrido un error al intentar expulsar al usuario.', ephemeral: true });
    }
  }
  
  // Comando /timeout
  if (commandName === 'timeout') {
    const user = interaction.options.getUser('usuario');
    const minutes = interaction.options.getInteger('minutos');
    const reason = interaction.options.getString('motivo') || 'No se especificó motivo';
    
    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({ content: 'No tienes permisos para usar este comando.', ephemeral: true });
    }
    
    try {
      const member = await interaction.guild.members.fetch(user.id);
      await member.timeout(minutes * 60 * 1000, reason);
      
      // Embed de confirmación
      const embed = new EmbedBuilder()
        .setColor(config.branding.color)
        .setTitle('⏱️ Usuario Aislado')
        .setDescription(`Se ha aislado a ${user.tag} por ${minutes} minutos`)
        .addFields(
          { name: 'Motivo', value: reason },
          { name: 'Moderador', value: interaction.user.tag }
        )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp()
        .setFooter({ text: config.branding.name });
      
      await interaction.reply({ embeds: [embed] });
      
      // Enviar logs al canal configurado
      sendLogEmbed('Timeout', `Se ha aislado a ${user.tag} por ${minutes} minutos. Motivo: ${reason}`, interaction.user);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Ha ocurrido un error al intentar aislar al usuario.', ephemeral: true });
    }
  }
});

// Evento cuando un miembro se une al servidor
client.on('guildMemberAdd', async member => {
  // Asignar rol automático si está configurado
  if (config.roles.autorole) {
    try {
      await member.roles.add(config.roles.autorole);
    } catch (error) {
      console.error('Error al asignar rol automático:', error);
    }
  }
  
  // Enviar mensaje de bienvenida si está configurado el canal
  if (config.channels.welcome) {
    try {
      const channel = await client.channels.fetch(config.channels.welcome);
      if (channel) {
        const embed = new EmbedBuilder()
          .setColor(config.branding.color)
          .setTitle(config.messages.welcome_title)
          .setDescription(`${config.messages.welcome_description}\n\n¡Bienvenido/a, ${member.user}!`)
          .addFields(
            { name: '👥 Miembros totales', value: `${member.guild.memberCount}` }
          )
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp()
          .setFooter({ text: config.branding.name });
        
        await channel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error('Error al enviar mensaje de bienvenida:', error);
    }
  }
});

// Evento cuando un miembro abandona el servidor
client.on('guildMemberRemove', async member => {
  // Enviar mensaje de despedida si está configurado el canal
  if (config.channels.goodbye) {
    try {
      const channel = await client.channels.fetch(config.channels.goodbye);
      if (channel) {
        const embed = new EmbedBuilder()
          .setColor(config.branding.color)
          .setTitle(config.messages.goodbye_title)
          .setDescription(`${config.messages.goodbye_description}\n\nAdiós, ${member.user.tag}!`)
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp()
          .setFooter({ text: config.branding.name });
        
        await channel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.error('Error al enviar mensaje de despedida:', error);
    }
  }
});

// Función para enviar logs al canal configurado
async function sendLogEmbed(action, description, moderator) {
  if (!config.channels.logs) return;
  
  try {
    const channel = await client.channels.fetch(config.channels.logs);
    if (channel) {
      const embed = new EmbedBuilder()
        .setColor(config.branding.color)
        .setTitle(`🔍 Moderación - ${action}`)
        .setDescription(description)
        .addFields(
          { name: 'Moderador', value: moderator.tag }
        )
        .setTimestamp()
        .setFooter({ text: config.branding.name });
      
      await channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Error al enviar log:', error);
  }
}

// Manejo de errores de conexión
client.on('error', error => {
  console.error('Error en el cliente de Discord:', error);
});

client.on('shardError', error => {
  console.error('Error en el shard:', error);
});

process.on('unhandledRejection', error => {
  console.error('Promesa rechazada no manejada:', error);
});

process.on('uncaughtException', error => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});

// Iniciar el bot con el token de configuración
client.login(config.bot.token).catch(error => {
  console.error('Error al iniciar sesión:', error.message);
  process.exit(1);
});
