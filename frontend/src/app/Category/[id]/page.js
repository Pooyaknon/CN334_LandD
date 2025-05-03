'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Navbar
function Navbar({ activeCategoryId }) {
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

      <ul className="hidden md:flex gap-6 text-xl">
        {categories.map(cat => (
          <li
            key={cat.id}
            className={`cursor-pointer hover:text-yellow-400 ${
              String(cat.id) === String(activeCategoryId) ? "border-b-2 border-white pb-1" : ""
            }`}
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

// การ์ดที่ดิน
function LandCard({ land }) {
  return (
    <div className="bg-white rounded-2xl p-6 w-72 shadow-lg text-center">
      <div className="bg-black h-60 w-full rounded mb-4 overflow-hidden">
        {land.images?.[0]?.image_url ? (
          <img
            src={land.images[0].image_url}
            alt="land"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="text-white text-base">ไม่มีรูป</div>
        )}
      </div>
      <p className="text-base text-gray-700">จังหวัด: {land.location}</p>
      <p className="text-base font-semibold text-gray-900">
        ราคา: ฿{parseFloat(land.price).toLocaleString()}
      </p>
    </div>
  );
}

export default function CategoryPage() {
  const { id } = useParams();
  const [lands, setLands] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // ดึงทั้งหมด แล้ว filter ตาม category id
    fetch('http://localhost:8000/api/lands/')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(land => String(land.category) === String(id));
        setLands(filtered);
      })
      .catch(err => console.error("Error fetching lands:", err));

    // ดึงชื่อภาคจาก category id
    fetch(`http://localhost:8000/api/categories/${id}/`)
      .then(res => res.json())
      .then(data => setCategoryName(data.name))
      .catch(err => console.error("Error fetching category name:", err));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-200 font-dm-serif">
      <Navbar activeCategoryId={id} />
      <div className="px-4 py-8 sm:px-12 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#2F3A46] mb-10">{categoryName}</h1>

        <div className="flex flex-wrap justify-center gap-8">
          {lands.length > 0 ? (
            lands.map((land) => <LandCard key={land.id} land={land} />)
          ) : (
            <p className="text-xl text-gray-600 text-center">ไม่มีข้อมูลที่ดินในหมวดนี้</p>
          )}
        </div>
      </div>
    </div>
  );
}
