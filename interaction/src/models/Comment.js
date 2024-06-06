const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    discussionId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    text: { type: String, required: true },
    likes: [{ type: String }],
    replies: [{
        userId: { type: String, required: true, index: true },
        text: { type: String },
        likes: [{ type: String }],
        createdAt: { type: Date, default: Date.now }
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('comment', CommentSchema);
