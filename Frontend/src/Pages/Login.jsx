import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { login, googleSignIn } = useAuth();
const navigate = useNavigate();

// Handle normal email/password login
const handleLogin = async (e) => {
e.preventDefault();
try {
await login(email, password);
alert("Logged in successfully!");
navigate("/dashboard"); // ✅ Redirect after alert
} catch (error) {
console.error("Login error:", error);
alert("Login failed: " + error.message);
}
};

// Handle Google login
const handleGoogleLogin = async () => {
try {
await googleSignIn();
alert("Logged in with Google!");
navigate("/dashboard"); // ✅ Redirect after alert
} catch (error) {
console.error("Google Login error:", error);
alert("Google Login failed: " + error.message);
}
};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8"> <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl"> <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
Login to Your Account </h2>

    <form onSubmit={handleLogin} className="space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
          required
        />
      </div>

      {/* Google Login */}
      <div className="flex items-center justify-center">
        <FaGoogle
          onClick={handleGoogleLogin}
          className="cursor-pointer text-neutral-600 hover:text-neutral-800 transition duration-200 text-2xl"
          title="Sign in with Google"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-neutral-700 hover:bg-neutral-800 text-white font-semibold rounded-lg transition duration-300"
      >
        Login
      </button>
    </form>
  </div>
</div>
);
}

export default Login;