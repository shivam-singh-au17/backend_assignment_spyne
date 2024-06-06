const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    userId: { type: String, required: true, index: true },
    text: { type: String, required: true },
    image: { type: String },
    hashtags: [{ type: String }],
    viewCount: { type: Number, default: 0 },
    likes: [{ type: String }],
    createdOn: { type: Date, default: Date.now },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('discussion', DiscussionSchema);
