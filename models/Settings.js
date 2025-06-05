import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  autoRoleId: { type: String, default: null },

});

export default mongoose.model('Settings', settingsSchema);
