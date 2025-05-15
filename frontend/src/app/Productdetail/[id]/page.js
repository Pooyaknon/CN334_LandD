//app/Productdetail/[id]/page.js

'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaUserCircle, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

// Navbar ไม่มีหมวดหมู่
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

// รายละเอียดที่ดิน
function LandDetail({ land }) {
  return (
    <div className="flex flex-col md:flex-row gap-10 py-10 px-6 md:px-30">
      {/* ด้านซ้าย */}
      <div className="bg-white rounded-2xl p-6 w-150 h-150 flex-shrink-0 shadow-lg text-center">
        <div className="bg-black h-full w-full rounded mb-4 overflow-hidden">
          {land.images && land.images.length > 0 ? (
            <img
              src={land.images[0].image_url}
              alt="land"
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="text-white text-lg h-full flex items-center justify-center">ไม่มีรูป</div>
          )}
        </div>
      </div>

      {/* ด้านขวา */}
      <div className="flex-1">
        <br /><br />
        <h2 className="text-4xl font-bold mb-4 text-gray-800">{land.title}</h2>
        <p className="text-2xl text-gray-700 mb-2">{land.description}</p> <br /><br />
        <p className="text-2xl text-gray-700 mb-2"><strong>เนื้อที่ : </strong> {
            (() => {
                const sqm = parseFloat(land.size);
                const rai = Math.floor(sqm / 1600);
                const ngan = Math.floor((sqm % 1600) / 400);
                const wah = Math.floor((sqm % 400) / 4);
                const meter = (sqm % 4).toFixed(2);
          
                let result = [];
                if (rai) result.push(`${rai} ไร่`);
                if (ngan) result.push(`${ngan} งาน`);
                if (wah) result.push(`${wah} ตารางวา`);
                if (meter > 0) result.push(`${meter} ตารางเมตร`);
                if (result.length === 0) result.push(`${sqm} ตารางเมตร`);
            
            return result.join(' ');
            })()
        } 
        </p>
        <p className="text-2xl text-gray-700 mb-2"><strong>สถานที่ : </strong> {land.location}</p>
        <p className="text-2xl text-gray-700 mb-2"><strong>ราคา : </strong> {parseFloat(land.price).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท</p> <br /><br />
        <p className="text-2xl text-gray-700 mb-2"><strong>สถานะ : </strong> {land.is_sold ? 'ขายแล้ว' : 'พร้อมขาย'}</p> 
        <p className="text-2xl text-gray-700 mb-4"><strong>ประกาศเมื่อ : </strong> {new Date(land.created_at).toLocaleDateString()}</p> <br />

        <BuyButton land={land} isSold={land.is_sold} />
      </div>
    </div>
  );
}

// ปุ่ม Buy แยกเป็นฟังก์ชันภายในไฟล์
function BuyButton({ land, isSold }) {
  const router = useRouter();
    const handleAddToCart = () => {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const exists = existingCart.find(item => item.id === land.id);
      if (exists) {
        alert("คุณได้เพิ่มสินค้านี้ไปแล้ว");
      } else {
        const updatedCart = [...existingCart, land];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        router.push("/Cart");
        alert("เพิ่มสินค้าแล้ว");
      }
    };
    const buttonStyle = isSold
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#D4AF37] hover:bg-yellow-500 cursor-pointer";
  
    return (
      <button
        onClick={isSold ? null : handleAddToCart}
        disabled={isSold}
        className={`mt-6 ${buttonStyle} text-white px-8 py-3 rounded-xl text-lg shadow-md transition-all duration-200 transform ${isSold ? '' : 'hover:scale-105 active:scale-95 active:shadow-inner'}`}
      >
        {isSold ? 'ขายแล้ว' : 'Buy'}
      </button>
    );
  }
  
function FloatingCartButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/Cart")} // ไปหน้า cart
      className="fixed bottom-15 right-15 bg-[#D4AF37] text-white 
            p-10 rounded-full shadow-lg text-6xl z-50 
            flex items-center justify-center
            hover:bg-yellow-500 transition-transform transform hover:scale-105
            cursor-pointer"
    >
      <FaShoppingCart />
    </button>
  );
}

function FooterTabBar() {
  return (
    <footer className="bg-[#2B2B2B] w-full h-10 mt-12"></footer>
  );
}

// หน้า Product Detail
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [land, setLand] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lands/${params.id}/`)
      .then(res => res.json())
      .then(data => setLand(data))
      .catch(err => console.error("Error fetching land detail:", err));
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 font-dm-serif">
      <Navbar />
      <main className="flex-grow">
      <div className="px-6 py-4">
        <button
          className="flex items-center text-[#2C3E50] text-xl hover:text-yellow-600 text-lg mb-4 cursor-pointer"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="mr-3" />
          Back
        </button>

        {land ? <LandDetail land={land} /> : <p className="text-gray-600">Loading...</p>}
      </div>
      </main>
      <FloatingCartButton />
      <FooterTabBar />
    </div>
  );
}
