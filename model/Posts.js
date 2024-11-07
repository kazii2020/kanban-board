const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  clientName: { type: String, required: true },
  clientAvatar: { type: String, default: '' },
  taskName: { type: String, required: true },
  taskDesc: { type: String, default: '' },
  createdAt: { type: Date }
});

const postsSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  totalAttachments:[],
  desc: { type: String, default: '' },
  tasks: [taskSchema],
  registeredDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true }
}, {
    timestamps: true,
});

const Customer = mongoose.model('Customer', postsSchema);

module.exports = Customer;


const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;
