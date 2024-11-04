import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email Required")
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(1, "Password Required")
    .min(6, "Password must be atleast 6 characters"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, submitCount },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleLogin = (data) => {
    console.log("Welcome", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Login to Talksy..
          </h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
              <Input
                className="py-6 md:text-base rounded"
                id="email"
                type="text"
                placeholder="Email address"
                {...register("email")}
              />
              {dirtyFields.email || submitCount > 0
                ? errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )
                : null}
            </div>

            <div className="mb-4">
              <div className="relative">
                <Input
                  className="rounded py-6 md:text-base"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {dirtyFields.password || submitCount > 0
                ? errors.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )
                : null}
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
