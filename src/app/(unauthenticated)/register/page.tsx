"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    console.log(email, password, name);

    // basic validation
    if (email === "" || password === "" || name === "") {
      alert("Please complete the forms");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      data && alert(data);
    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }, [localStorage.getItem("user")]);

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <Card className="mx-auto w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="example@email.com"
                  required
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" type="submit" onClick={handleRegister}>
                Sign Up
              </Button>
            </div>
          </form>
          <div className="flex mt-4 items-center">
            <p>Already have an account?</p>
            <Button
              onClick={() => router.push(`/login`)}
              variant="link"
              className="text-blue-500"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
