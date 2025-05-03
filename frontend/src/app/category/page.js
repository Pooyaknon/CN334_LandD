'use client'
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [categoryName, setCategoryName] = useState("");
  const [lands, setLands] = useState([]);

  useEffect(() => {
    // ดึงชื่อ category
    fetch(`http://localhost:8000/api/categories/${categoryId}/`)
      .then(res => res.json())
      .then(data => setCategoryName(data.name))
      .catch(err => console.error("Error loading category:", err));

    // ดึงที่ดินทั้งหมด แล้วกรองตาม category
    fetch(`http://localhost:8000/api/lands/`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(l => l.category === parseInt(categoryId));
        setLands(filtered);
      })
      .catch(err => console.error("Error loading lands:", err));
  }, [categoryId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">หมวดหมู่: {categoryName}</h1>
      {lands.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {lands.map(land => (
            <div key={land.id} className="bg-white rounded-xl p-4 shadow">
              {land.images?.[0]?.image_url && (
                <img
                  src={land.images[0].image_url}
                  alt={land.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-sm font-semibold">{land.title}</h2>
              <p className="text-xs text-gray-600">ราคา: ฿{parseFloat(land.price).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">ไม่มีข้อมูลในหมวดหมู่นี้</p>
      )}
    </div>
  );
}
