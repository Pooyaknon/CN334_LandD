//app/Homepage/page.js

'use client'
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Top
function Navbar() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/categories/')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error loading categories:", err));
  }, []);

  return (
    <nav className="bg-[#2B2B2B] text-white px-6 py-3 flex items-center justify-between">
      <div className="text-4xl font-bold tracking-wide">Land:D</div>

      {/* ดึงหมวดหมู่จาก API */}
      <ul className="hidden md:flex gap-6 text-xl">
        {categories.map(cat => (
          <li
            key={cat.id}
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => router.push(`/Category/${cat.id}`)}
          >
            {cat.name}
          </li>
        ))}
      </ul>

      <div className="text-4xl">
        <FaUserCircle />
      </div>
    </nav>
  );
}

//Data
function Section({ title, lands }) {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold font-section-title text-gray-800">{title}</h2>
      <div className="bg-[#5E6B77] rounded-3xl px-10 py-10 shadow-lg">
        <div className="flex gap-8 overflow-x-auto hide-scrollbar">
          {lands.length > 0 ? (
            lands.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 w-70 h-100 flex-shrink-0 shadow-lg text-center"
              >
                {/* รูปภาพจาก land.images */}
                <div className="bg-black h-60 w-full rounded mb-4 overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].image_url}
                      alt="land"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-white text-base">ไม่มีรูป</div>
                  )}
                </div>
                <p className="text-base text-gray-700">จังหวัด: {item.location}</p>
                <p className="text-base font-semibold text-gray-900">
                  ราคา: ฿{parseFloat(item.price).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white text-lg">ไม่มีสินค้า</p>
          )}
          <button className="bg-[#D4AF37] text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center self-center shrink-0">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}


//เพิ่ม list ตามสบาย
export default function Home() {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/lands/')
      .then((res) => res.json())
      .then((data) => setLands(data))
      .catch((err) => console.error("Error fetching lands:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 font-dm-serif">
      <Navbar />
      <div className="px-4 py-8 sm:px-12">
        <main className="flex flex-col gap-12 max-w-screen-xl mx-auto">
          <Section title="พื้นที่ใหม่ย่านกรุงเทพ" lands={lands.filter(l => l.location.includes("กรุงเทพ"))} />
          <Section title="ลดราคาสุดคุ้ม" lands={lands.filter(l => l.promotion !== null)} />
          <Section title="พื้นที่ใหม่ล่าสุด!" lands={lands.slice(0, 4)} />
        </main>
      </div>
    </div>
  );
}