
import { compare, hash } from "bcrypt";
import { Model, model, ObjectId, Schema } from "mongoose";

// interface (typescript)
interface TokenDocument {
  owner: ObjectId
  token:string
  createdAt:Date
}

interface Methods{
  compareToken(token:string):Promise<boolean>
}

const tokenSchema = new Schema<TokenDocument,{},Methods>(
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

tokenSchema.pre('save',async function(next){
  if(this.isModified('token')){

  }
  this.token =await hash(this.token,10)
  next()
})

tokenSchema.methods.compareToken = async function(token) {
  const result = await compare(token,this.token)
  return result
}

export default model("Token", tokenSchema) as Model<TokenDocument,{},Methods>;
