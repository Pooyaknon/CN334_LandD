'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); // สำหรับเก็บข้อความผิดพลาด
  const [isLoading, setIsLoading] = useState(false); // แสดงสถานะการโหลด

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
        router.push('/login'); // เมื่อสมัครสำเร็จไปที่หน้า login
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Registration failed"); // แสดงข้อความผิดพลาด
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the API");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className="text-center text-4xl font-bold mb-6">Register</div>

      <form onSubmit={onRegister} className="flex flex-col gap-4 p-4 w-80 border rounded-lg shadow-md">
        <div>
          <label className="block text-xl">Username</label>
          <input
            name="username"
            className="p-2 w-full rounded-lg border"
            type="text"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Password</label>
          <input
            name="password"
            className="p-2 w-full rounded-lg border"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Firstname</label>
          <input
            name="firstname"
            className="p-2 w-full rounded-lg border"
            type="text"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Lastname</label>
          <input
            name="lastname"
            className="p-2 w-full rounded-lg border"
            type="text"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Email</label>
          <input
            name="email"
            className="p-2 w-full rounded-lg border"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Address</label>
          <input
            name="address"
            className="p-2 w-full rounded-lg border"
            type="text"
            placeholder="Enter your address"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Province</label>
          <input
            name="province"
            className="p-2 w-full rounded-lg border"
            type="text"
            placeholder="Enter your province"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Post Code</label>
          <input
            name="post_code"
            className="p-2 w-full rounded-lg border"
            type="text"
            placeholder="Enter your post code"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Phone Number</label>
          <input
            name="tel"
            className="p-2 w-full rounded-lg border"
            type="text"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <button
          className="p-3 bg-green-500 text-white rounded-lg"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  );
}