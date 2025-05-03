// urlpatterns = [
//   path('admin/', admin.site.urls),
//   path('api/', include(router.urls)),
//   path('api/register/', RegisterView.as_view(), name='register'),
//   path('api/login/', login_view, name='login'),
//   path('api/logout/', logout_view, name='logout'),
//   path('api/user/', current_user, name='current_user'),
// ]

'use client'
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


// Top
function Navbar() {
  return (
    <nav className="bg-[#2B2B2B] text-white px-6 py-3 flex items-center justify-between">
      {/* โลโก้ */}
      <div className="text-2xl font-bold tracking-wide">Land :D</div>

      {/* หมวดหมู่ */}
      <ul className="hidden md:flex gap-6 text-sm">
        <li className="cursor-pointer hover:text-yellow-400">ภาคเหนือ</li>
        <li className="cursor-pointer hover:text-yellow-400">ภาคกลาง</li>
        <li className="cursor-pointer hover:text-yellow-400">ภาคตะวันออกเฉียงเหนือ</li>
        <li className="cursor-pointer hover:text-yellow-400">ภาคตะวันออก</li>
        <li className="cursor-pointer hover:text-yellow-400">ภาคตะวันตก</li>
        <li className="cursor-pointer hover:text-yellow-400">ภาคใต้</li>
      </ul>

      {/* ผู้ใช้งาน */}
      <div className="text-2xl">
        <FaUserCircle />
      </div>
    </nav>
  );
}

//Data
function Section({ title, lands }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="bg-[#5E6B77] rounded-3xl px-6 py-6 shadow">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {lands.length > 0 ? (
            lands.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 w-40 flex-shrink-0 shadow-md text-center"
              >
                {/* รูปภาพจาก land.images */}
                <div className="bg-black h-32 w-full rounded mb-3 overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].image_url}
                      alt="land"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-white text-sm">ไม่มีรูป</div>
                  )}
                </div>
                <p className="text-sm text-gray-700">จังหวัด: {item.location}</p>
                <p className="text-sm font-medium text-gray-900">
                  ราคา: ฿{parseFloat(item.price).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white">ไม่มีสินค้า</p>
          )}
          <button className="bg-[#D4AF37] text-white w-10 h-10 rounded-full text-xl flex items-center justify-center self-center shrink-0">
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="px-4 py-8 sm:px-12">
        <main className="flex flex-col gap-12 max-w-screen-xl mx-auto">
          <Section title="พื้นที่ใหม่ย่านกรุงเทพ" lands={lands.filter(l => l.location.includes("ปทุม"))} />
          <Section title="ลดราคาสุดคุ้ม" lands={lands.filter(l => l.promotion !== null)} />
          <Section title="พื้นที่ใหม่ล่าสุด!" lands={lands.slice(0, 4)} />
        </main>
      </div>
    </div>
  );
}