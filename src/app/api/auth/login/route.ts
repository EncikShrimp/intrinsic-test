import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongo/connect"; // Replace with your connection logic
import User from "@/lib/mongo/model/user.model";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { serialize } from "../register/route";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    const { email, password } = (await new Response(
      req.body
    ).json()) as LoginBody;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare password hashes (using bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Login successful (replace with session management or token generation)
    return NextResponse.json({ data: serialize(user) }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occured. Please try again later." },
      { status: 500 }
    );
  }
}
