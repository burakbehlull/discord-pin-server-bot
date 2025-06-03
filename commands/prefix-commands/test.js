
export default {
  name: 'test',
  description: 'Example command, test.',
  async execute(client, message, args) {
    try {
      
	  await message.reply("test")
	 
    } catch (err) {
      console.error('error: ', err);
    }
  },
};
