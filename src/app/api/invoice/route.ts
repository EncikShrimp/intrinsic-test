import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongo/connect"; // Replace with your connection logic
import { NextResponse } from "next/server";
import Invoice, { TInvoice } from "@/lib/mongo/model/invoice.model";

export const serialize = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    // Validate request body

    const { name, customerName, customerEmail, invoiceDate, dueDate, amount } =
      (await new Response(req.body).json()) as TInvoice;

    const invoice = await Invoice.create({
      name,
      customerName,
      customerEmail,
      invoiceDate,
      dueDate,
      amount,
    });

    return NextResponse.json({ data: serialize(invoice) }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occured. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    // Validate request body

    const invoice = await Invoice.find({});

    return NextResponse.json({ data: serialize(invoice) }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occured. Please try again later." },
      { status: 500 }
    );
  }
}
