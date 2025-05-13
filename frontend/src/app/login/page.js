'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); // เพิ่มการจัดการข้อผิดพลาด
  const [isLoading, setIsLoading] = useState(false); // เพื่อให้สามารถแสดงสถานะ Loading

  async function onLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    setIsLoading(true);  // ตั้งค่าให้เป็น true เมื่อเริ่มทำการส่งข้อมูล
    setErrorMessage(""); // เคลียร์ข้อความผิดพลาดก่อน

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
        localStorage.setItem('access_token', data.access); // เก็บ access token
        localStorage.setItem('refresh_token', data.refresh); // เก็บ refresh token
        router.push('/Homepage');  // ถ้า login สำเร็จไปที่หน้า Homepage
      } else {
        setErrorMessage("Username or Password is incorrect"); // แสดงข้อความผิดพลาด
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the API"); // หากเกิดข้อผิดพลาดระหว่างการเชื่อมต่อ
      console.error(error);
    } finally {
      setIsLoading(false); // ตั้งค่าให้เป็น false หลังจากการดำเนินการเสร็จสิ้น
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className="text-center text-4xl font-bold mb-6">Login</div>

      <form onSubmit={onLogin} className="flex flex-col gap-4 p-4 w-80 border rounded-lg shadow-md">
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

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* แสดงข้อความผิดพลาด */}

        <button
          className="p-3 bg-green-500 text-white rounded-lg"
          type="submit"
          disabled={isLoading} // ไม่ให้กดซ้ำเมื่อกำลังโหลด
        >
          {isLoading ? "Logging in..." : "Login"} {/* แสดงสถานะการเข้าสู่ระบบ */}
        </button>
      </form>
    </main>
  );
}
