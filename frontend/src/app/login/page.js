'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  return (
    <div className="bg-[#2f2f2f] text-white text-3xl font-bold py-4 text-center tracking-wide">
      Welcome to Land :D
    </div>
  );
}

// ✅ Footer function
function FooterTabBar() {
  return (
    <footer className="bg-[#2B2B2B] w-full h-10 mt-12"></footer>
  );
}

// ✅ Main Login Component
export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        router.push('/Homepage');
      } else {
        setErrorMessage("Username or Password is incorrect");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the API");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-200 font-dm-serif">
      <Navbar />

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={onLogin}
          className="bg-[#2c3e50] text-white rounded-xl shadow-lg p-8 w-80 flex flex-col gap-4"
        >
          <h2 className="text-2xl text-center font-bold mb-2">Log in</h2>

          <div>
            <label className="text-sm block font-semibold mb-1">Username :</label>
            <input
              name="username"
              className="w-full p-2 rounded-md text-black"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="text-sm block font-semibold mb-1">Password :</label>
            <input
              name="password"
              className="w-full p-2 rounded-md text-black"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-400 text-center text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="mt-2 py-2 bg-[#1c2d3c] hover:bg-[#243544] rounded-md shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>

      {/* ✅ ใช้ Footer */}
      <FooterTabBar />
    </main>
  );
}
