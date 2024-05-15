import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongo/connect"; // Replace with your connection logic
import { NextResponse } from "next/server";
import Invoice, { TInvoice } from "@/lib/mongo/model/invoice.model";
import { serialize } from "../../auth/register/route";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    // Validate request body

    const invoice = await Invoice.findOne({ _id: params.id });

    return NextResponse.json({ data: serialize(invoice) }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occured. Please try again later." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { paymentStatus } = await new Response(req.body).json();

    const invoice = await Invoice.findOneAndUpdate(
      { _id: params.id },
      { paymentStatus }
    );

    return NextResponse.json({ data: serialize(invoice) }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occured. Please try again later." },
      { status: 500 }
    );
  }
}
