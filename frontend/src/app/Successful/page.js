'use client'
import { FaUserCircle, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Navbar() {
    const router = useRouter();
  return (
    <nav className="bg-[#2B2B2B] text-white px-6 py-3 flex items-center justify-between">
        <div className="text-4xl font-bold tracking-wide cursor-pointer " 
            onClick={() => router.push(`/Homepage/`)}
        >
            Land:D
        </div>
      <div
        className="text-4xl cursor-pointer"
        onClick={async () => {
          const token = localStorage.getItem("access_token");
          if (!token) {
            alert("กรุณาเข้าสู่ระบบก่อน");
            return;
          }

          try {
            const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/me/`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (!userRes.ok) {
              throw new Error("ไม่สามารถดึงข้อมูลลูกค้าได้");
            }

            const customerData = await userRes.json();
            const customerId = customerData.id;

            router.push(`/Profile/${customerId}`);
          } catch (err) {
            console.error("เกิดข้อผิดพลาด:", err);
            alert("เกิดข้อผิดพลาดขณะโหลดข้อมูลผู้ใช้งาน");
          }
        }}
      >
        <FaUserCircle />
      </div>
    </nav>
  );
}

function FooterTabBar() {
  return (
    <footer className="bg-[#2B2B2B] w-full h-10 mt-12"></footer>
  );
}

export default function SuccessfulPage() {
    const router = useRouter();
  return (

    <div className="min-h-screen bg-gray-200 flex flex-col justify-between font-dm-serif">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow text-center py-20">
        <FaCheckCircle className="text-8xl mb-6" />
        <h2 className="text-3xl font-semibold mb-6 p-6">Thank you for your support!</h2>
        <button
          onClick={() => router.push("/Homepage")}
          className="bg-black text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-500 cursor-pointer"
        >
          Go to Homepage
        </button>
      </main>
      <FooterTabBar />
    </div>
  );
}