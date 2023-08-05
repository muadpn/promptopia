import mongoose, {Schema, model, models} from "mongoose";


const PromptSchema = new Schema ({
    creator:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        // required: [true, 'creator is required.'],
    },
    prompt:{
        type:String,
        required: [true, 'prompt is required.'],
    },
    tag:{
        type: String,
        required: [true, 'Tag is Required'],
    }
});
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt


