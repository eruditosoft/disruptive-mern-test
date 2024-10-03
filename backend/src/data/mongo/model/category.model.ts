import {CATEGORIES} from '@shared/enum/categories';
import mongoose, {Schema} from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
    },
    type: {
        type: String,
        required: [true, "Category type is required"],
        enum: CATEGORIES,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});
export const CategoryModel = mongoose.model("Category", categorySchema);
