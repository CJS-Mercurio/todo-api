const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
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
