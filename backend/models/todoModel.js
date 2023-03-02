const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    // user associated with todo
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, "Please add a name of todo"],
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
