"use client";

import { DataTableDemo } from "@/components/invoice-table";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialFormState = {
  name: "",
  customerName: "",
  customerEmail: "",
  invoiceDate: "",
  dueDate: "",
  amount: 0,
};

export default function Dashboard() {
  const [formState, setFormState] = useState<TInvoice>(initialFormState as any);
  const router = useRouter();

  const createInvoice = async (e: any) => {
    e.preventDefault();

    // basic missing information validation
    if (
      formState.name === "" ||
      formState.customerName === "" ||
      formState.customerEmail === "" ||
      formState.invoiceDate === "" ||
      formState.dueDate === "" ||
      formState.amount === 0 ||
      (formState.amount as any) === ""
    ) {
      alert("Please fill in all the forms");
      return;
    }

    try {
      const response = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState }),
      });

      const { data } = await response.json();
      data && alert("Successfully create invoice.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Invoice failed to be create.");
    }
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="dark flex min-h-screen flex-col items-center px-24 py-12 ">
      <h1 className="text-3xl">Dashboard</h1>
      <div className="w-full h-full flex items-start justify-between mt-8 gap-2">
        <Card className="w-2/5 h-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create Invoice</CardTitle>
            <CardDescription>You can create your invoice here</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createInvoice}>
              <div className="space-y-4">
                {/* Unique Invoice Identifier */}
                <div className="space-y-2">
                  <Label>Unique Invoice Identifier</Label>
                  <Input
                    placeholder="Invoice#1234"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </div>

                {/* Customer Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input
                      placeholder="John Doe"
                      value={formState.customerName}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Customer Email</Label>
                    <Input
                      placeholder="JohnDoe@gmail.com"
                      value={formState.customerEmail}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          customerEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Invoice Date */}
                <div className="space-y-2">
                  <div>Invoice Date (DD/MM/YYYY)</div>
                  <Input
                    placeholder="30/03/2024"
                    value={formState.invoiceDate}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        invoiceDate: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <div>Due Date (DD/MM/YYYY)</div>
                  <Input
                    placeholder="30/04/2024"
                    value={formState.dueDate}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Amount Due */}
                <div className="space-y-2">
                  <div>Amount Due (RM)</div>
                  <Input
                    type="number"
                    value={formState.amount}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        amount: e.target.value as unknown as number,
                      })
                    }
                  />
                </div>
              </div>
              <Button className="mt-4" type="submit">
                Create Invoice
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="w-3/5 h-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">View Invoices</CardTitle>
            <CardDescription>You can view your invoices here</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTableDemo />
          </CardContent>
        </Card>
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          variant="outline"
        >
          Logout
        </Button>
      </div>
    </main>
  );
}
