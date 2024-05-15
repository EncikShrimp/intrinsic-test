import mongoose from "mongoose";

export interface TInvoice {
  name: string;
  customerName: string;
  customerEmail: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  paymentStatus: boolean;
}

const invoiceShema = new mongoose.Schema<TInvoice>(
  {
    name: {
      type: String,
      required: false,
    },
    customerName: {
      type: String,
      required: false,
    },
    customerEmail: {
      type: String,
      required: false,
    },
    invoiceDate: {
      type: String,
      required: false,
    },
    dueDate: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    paymentStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const Invoice =
  (mongoose.models.Invoice as mongoose.Model<TInvoice>) ||
  mongoose.model("Invoice", invoiceShema);

export default Invoice;
