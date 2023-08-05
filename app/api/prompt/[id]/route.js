import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


//GET /read
export const GET = async (req, {params}) =>{
     console.log("from backEnd",params.id)
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt){
            return new Response("Prompt not found", {status: 404})
        }
        // console.log(JSON.stringify(prompt))
        return new Response(JSON.stringify(prompt),{ status: 200})
    }catch(err){
        return new Response("failed to Fetch all the data", {status: 400})
    }
}

//patch request
export const PUT = async (req, {params}) => {
    console.log("patch request");
    const {prompt, tag} = await req.json();
    // console.log(params.id)

    try{
        await connectToDB();
        const updatedPrompt = await Prompt.findById(params.id)
        console.log(updatedPrompt)
        if (!updatedPrompt){
            return new Response("Prompt not found", {status: 404})
        }
        updatedPrompt.prompt = prompt;
        updatedPrompt.tag = tag;
        await updatedPrompt.save();
        return new Response(JSON.stringify(updatedPrompt),{
            status: 200
        })
    }catch(err){
        return new Response("failed to Update the data ", {status: 500})
    }
}

//put request

export const DELETE = async (req, {params}) =>{
    try{
        await connectToDB();
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id)
        if (!deletedPrompt){
            return new Response("Prompt not found", {status: 404})
        }
        return new Response(JSON.stringify(deletedPrompt),{
            status: 200
        })
    }catch(err){
        return new Response("failed to Delete the data ", {status: 500})
    }
}