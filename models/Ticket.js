const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  issue: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
  updatedAt: Date,
  closedAt: Date, 
});

module.exports = mongoose.model('Ticket', ticketSchema);