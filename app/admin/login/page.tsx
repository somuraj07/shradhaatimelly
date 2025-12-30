"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import InputField from "@/components/ui/common/InputField";
import PrimaryButton from "@/components/ui/common/PrimaryButton";
import BrandLogo from "@/components/ui/common/BrandLogo";
import AuthIllustration from "@/components/ui/AuthIllustration";
import { MAIN_COLOR } from "@/constants/colors";
import Checkbox from "@/components/ui/common/checkbox";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkBoxValue,setcheckBoxValue]=useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!checkBoxValue) {
      setError("You must agree to the terms & policy");
      setLoading(false);
      return;
    }
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    const session = await getSession();
    if (!session?.user) return;

    const roleRoutes: Record<string, string> = {
      SUPERADMIN: "/frontend/superadmin/dashboard",
      SCHOOLADMIN: "/frontend/schooladmin/dashboard",
      TEACHER: "/teachersPortal",
      STUDENT: "/frontend/student",
    };

    router.push(roleRoutes[session.user.role] || "/unauthorized");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-black">
      <AuthIllustration />

      <div className="flex flex-1 items-center justify-center px-6">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="flex flex-col items-center mb-4">
            <BrandLogo size="auth" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">Log In</h1>
            <p className="text-sm text-gray-400 mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isBorderBlack={false}
          />

          <InputField
            isBorderBlack={false}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <label className="flex items-center gap-2 cursor-pointer select-none relative">
           <Checkbox
              checked={checkBoxValue}
              onChange={(checked) => setcheckBoxValue(checked)}
            />

            {/* Centered white tick */}
            <svg
              className="
                  absolute
                  left-0
                  top-0
                  w-4 h-4
                  p-[2px]
                  text-white
                  hidden
                  peer-checked:block
                  pointer-events-none
                "
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="2.3 0 20 20"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>

            <span className="text-sm text-gray-300 ml-1">
              I agree to the terms & policy
            </span>
          </label>

          <PrimaryButton title="Log In" loading={loading} />
        </motion.form>
      </div>
    </div>
  );
}

const styles = {
  checkBox: {
    accentColor: MAIN_COLOR,
  },
};
