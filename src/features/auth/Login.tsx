import { AvatarHeader, SignUpLink } from "@/components/auth/Shared";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/core/hooks/useAuthQueries";

export default function Login() {
  const { mutate: login, isPending: isLoading} = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 py-8">
      <div className="max-w-md mx-auto w-full">
        <AvatarHeader />

        <div className="mb-4">
          <h1 className="text-3xl font-serif text-primary-dark mb-4 leading-tight">
            Join 2+ million people who uses Hemo tracker in Africa
          </h1>
        </div>

        <div className="space-y-4 text-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="">
              <label
                htmlFor="email"
                className="text-gray-400 text-xs font-medium "
              >
                EMAIL ADDRESS
              </label>{" "}
              <br />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm"
              />
            </div>

            <div className="">
              <label
                htmlFor="password"
                className="text-gray-400 text-xs font-medium "
              >
                ENTER PASSWORD
              </label>{" "}
              <br />
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-sm border border-gray-300 px-3 py-2 text-gray-600 outline-none w-full text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeClosed className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* {error && (
              <div className="text-red-500 text-sm">
                Login failed: {error.message}
              </div>
            )} */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3.5 rounded-md transition-colors shadow-sm text-sm disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <SignUpLink />
      </div>
    </div>
  );
}
