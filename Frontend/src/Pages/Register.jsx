import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { signup } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
try {
await signup(email, password);
alert("Account created successfully!");
navigate("/login"); // ✅ Redirect after alert
} catch (error) {
console.error("Error occurred:", error);
alert("Registration failed: " + error.message);
}
};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8"> <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md sm:max-w-lg md:max-w-xl"> <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
Create an Account </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
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

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-neutral-700 hover:bg-neutral-800 text-white font-semibold rounded-lg transition duration-300"
      >
        Register
      </button>
    </form>
  </div>
</div>
);
}

export default Register;