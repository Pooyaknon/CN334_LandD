'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  return (
    <div className="bg-[#2B2B2B] text-white text-3xl font-bold py-4 text-center tracking-wide">
      Welcome to Land :D
    </div>
  );
}

function FooterTabBar() {
  return (
    <footer className="bg-[#2B2B2B] w-full h-10 mt-12"></footer>
  );
}

export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      address: formData.get('address'),
      province: formData.get('province'),
      post_code: formData.get('post_code'),
      tel: formData.get('tel'),
    };

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the API");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-200 font-dm-serif">
      <Navbar />
      <div className="flex flex-1 items-center flex-col gap-4 mt-2">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-2">Register</h2>

        <form
          onSubmit={onRegister}
          className="bg-[#2c3e50] text-white rounded-xl shadow-lg p-8 w-80 flex flex-col gap-4"
        >
          {[
            { name: 'username', label: 'Username', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'firstname', label: 'Firstname', type: 'text' },
            { name: 'lastname', label: 'Lastname', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'address', label: 'Address', type: 'text' },
            { name: 'province', label: 'Province', type: 'text' },
            { name: 'post_code', label: 'Post Code', type: 'text' },
            { name: 'tel', label: 'Phone Number', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-semibold mb-1 block">{field.label} :</label>
              <input
                name={field.name}
                type={field.type}
                required
                className="w-full p-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          {errorMessage && (
            <p className="text-red-400 text-center text-sm">{errorMessage}</p>
          )}
        </form>

        <button
          type="submit"
          onClick={(e) => {
            const form = document.querySelector('form');
            form?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
          }}
          className="w-40 py-2 bg-[#1c2d3c] hover:bg-[#243544] rounded-md shadow-md text-white cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </div>
      <FooterTabBar />
    </main>
  );
}