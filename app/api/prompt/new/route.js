import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  if (userId === undefined || userId === null) {
    return new Response("User not found", { status: 400 });
  }
  console.log(prompt);
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new Prompt [SERVER ERROR!]", {
      status: 500,
    });
  }
};
