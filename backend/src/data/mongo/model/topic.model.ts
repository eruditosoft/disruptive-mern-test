import {CATEGORIES} from '@shared/enum/categories';
import mongoose, {Schema} from "mongoose";


const topicSchema = new Schema({
    name: {
        type: String,
        required: [true, "resource name is required"],
        unique: true,
    },
    categories: {
        type: [String],
        required: [true, "category type is required"],
        enum: CATEGORIES,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
    },


});

export const TopicModel = mongoose.model("Topic", topicSchema);
