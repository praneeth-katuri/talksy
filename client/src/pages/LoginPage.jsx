import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Welcome");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Login to Talksy..
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Input
                className="py-6 md:text-base rounded"
                id="email"
                type="email"
                value={userName}
                placeholder="Email address"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                className="rounded mb-4 py-6 md:text-base"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 py-6 rounded md:text-xl font-semibold"
            >
              Log In
            </Button>
            <div className="text-sm py-6 text-center">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgotten password?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
