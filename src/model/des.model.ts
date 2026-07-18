import mongoose ,{ Schema , model} from "mongoose";

interface Description {
    ownerId: string;
    BusinessName: string;
    supportEmail: string;
    knowledgeBase: string;
}



const descriptionSchema = new Schema <Description>({

    ownerId: {type: String, required: true , unique:true},
    BusinessName: {type: String},
    supportEmail: {type: String},
    knowledgeBase: {type: String}


},{timestamps:true})

const Description = mongoose.models.Description || model("Description", descriptionSchema)

export default Description