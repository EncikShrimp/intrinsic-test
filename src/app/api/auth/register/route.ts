import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongo/connect"; // Replace with your connection logic
import User, { TUser } from "@/lib/mongo/model/user.model";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export const serialize = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    // Validate request body

    const { name, email, password } = (await new Response(
      req.body
    ).json()) as RegisterBody;

    // Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { data: serialize(existingUser) },
        { status: 400 }
      );
    }

    // Hash password before saving (using bcrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ data: serialize(newUser) }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occured. Please try again later." },
      { status: 500 }
    );
  }
}
