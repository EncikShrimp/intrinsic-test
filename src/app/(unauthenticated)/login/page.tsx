"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email, password);

    // basic validation
    if (email === "" || password === "") {
      alert("Please complete the forms");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const { data } = await response.json();
      localStorage.setItem("user", data.email);
      data && alert("Successfully logged in");
      router.push("/dashboard");
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
  }, []);

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <Card className="mx-auto w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
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
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 flex items-center">
            <p>Don&apos;t have an account? </p>{" "}
            <Button
              className="text-blue-500"
              variant="link"
              onClick={(e) => router.push("/register")}
            >
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
