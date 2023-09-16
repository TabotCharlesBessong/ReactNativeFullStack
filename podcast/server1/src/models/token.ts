
import { Model, model, ObjectId, Schema } from "mongoose";

// interface (typescript)
interface TokenDocument {
  owner: ObjectId
  token:string
  createdAt:Date
}

const tokenSchema = new Schema<TokenDocument>(
  {
    owner:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
    token:{
      type:String,
      required:true
    },
    createdAt:{
      type:Date,
      expires:3600,
      default:Date.now()
    }
  }
);

export default model("Token", tokenSchema) as Model<TokenDocument>;
