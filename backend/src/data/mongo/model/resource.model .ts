import {CATEGORIES} from '@shared/enum/categories';
import mongoose, {Schema} from "mongoose";
import {string} from "zod";
import {Format} from "@config/format";


const resourceSchema = new Schema({
    category: {
        type: String,
        required: [true, "category type is required"],
        enum: CATEGORIES,
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'View'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: [true, "content is required"],
    },
    name: {
        type: String,
        required: [true, "resource name is required"],
        unique: true,
    },
    author: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

export const ResourceModel = mongoose.model("Resource", resourceSchema);
