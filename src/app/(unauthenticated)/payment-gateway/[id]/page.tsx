"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TInvoice } from "@/lib/mongo/model/invoice.model";
import { BookmarkIcon, IdCardIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [paymentMethod, setPaymentMethod] = React.useState("Card");
  const [invoice, setInvoice] = React.useState<TInvoice>({} as any);

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`/api/invoice/${params.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const { data } = await res.json();
      setInvoice(data);
    } catch (error) {
      alert("An error has occured");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(`/api/invoice/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: true }),
      });

      const { data } = await res.json();
      setInvoice(data);
      alert("Payment Successfull!");
    } catch (error) {
      alert("An error has occured!");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <main className="w-full min-h-screen relative isolate px-10 pt-40 sm:p-32">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Payment Form</CardTitle>
            <CardDescription>
              Please fill up the payment details to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full m-auto px-6 py-6 sm:py-10 space-y-6">
            <div className="flex flex-col">
              <h2 className="mb-2">Pay With</h2>
              <div className="flex space-x-2">
                {/* Credit card */}
                <Button
                  variant="outline"
                  onClick={(e) => setPaymentMethod("Card")}
                  className={`${
                    paymentMethod === "Card" ? "border-gray-500" : ""
                  }`}
                >
                  <div className="flex space-x-4">
                    <IdCardIcon className="h-6 w-6" />
                    <h3 className="text-base font-semibold text-heading">
                      Credit Card
                    </h3>
                  </div>
                </Button>

                {/* Bank */}
                <Button
                  variant="outline"
                  onClick={(e) => setPaymentMethod("Bank")}
                  className={`${
                    paymentMethod === "Bank" ? "border-gray-500" : ""
                  }`}
                >
                  <div className="flex space-x-4">
                    <BookmarkIcon className="h-6 w-6" />
                    <h3 className="text-base font-semibold text-heading">
                      Bank Account
                    </h3>
                  </div>
                </Button>
              </div>
            </div>
            {paymentMethod === "Card" && (
              <div>
                <div className="mb-5">
                  <Label
                    htmlFor="input-number"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Card number
                  </Label>
                  <Input
                    type="text"
                    id="input-number"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <div className="mb-5">
                    <Label
                      htmlFor="input-exp"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Expiration
                    </Label>
                    <Input type="text" id="input-exp" placeholder="MM/YY" />
                  </div>
                  <div className="mb-5">
                    <Label
                      htmlFor="input-cvc"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      CVC
                    </Label>
                    <Input type="text" id="input-cvc" placeholder="CVC" />
                  </div>
                </div>
                <div className="mb-5 text-xs text-gray-400 dark:text-gray-500">
                  By providing your card information, you allow Company to
                  charge your card for future payments in accordance with their
                  terms.
                </div>
                <div className="mb-5">
                  <Label
                    htmlFor="input-name"
                    className="block text-sm font-medium mb-2 dark:text-white"
                  >
                    Cardholder name
                  </Label>
                  <Input type="text" id="input-name" placeholder="John Doe" />
                </div>
                <div className="mb-5">
                  <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 font-medium">
                    <div>Subtotal</div>
                    <div>RM {invoice.amount}</div>
                  </div>
                  <div className="flex justify-between py-1 text-gray-700 dark:text-gray-200 font-medium">
                    <div>Total</div>
                    <div>RM {invoice.amount}</div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "Bank" && <></>}

            <Button
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparen"
              onClick={handlePayment}
            >
              Pay RM {invoice.amount}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
