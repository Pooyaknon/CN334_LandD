'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

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
        <div className="text-4xl">
            <FaUserCircle />
        </div>
    </nav>
  );
}
// โหลด cart จาก localStorage
function loadCart() {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

// เซฟ cart ลง localStorage
function saveCart(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// คำนวณยอดรวม
function getTotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
}

// ลบ item จาก cart
function removeItem(cartItems, id) {
  return cartItems.filter(item => item.id !== id);
}

// แยก Component ย่อยของสินค้าแต่ละชิ้น
function CartItem({ item, onRemove }) {
    return (
      <div className="bg-[#586674] text-white rounded-xl p-6 flex justify-between items-center shadow-md ">
        <div className="flex items-center gap-6 px-15">
          <div className="bg-white rounded-2xl p-6 w-80 h-80 flex-shrink-0 shadow-lg text-center">
            <div className="bg-black h-full w-full rounded mb-4 overflow-hidden">
                {item.images?.[0]?.image_url ? (
                <img src={item.images[0].image_url} className="w-full h-full object-cover" alt="land" />
                ) : (
                <div className="text-white text-lg h-full flex items-center justify-center">ไม่มีรูป</div>
                )}
            </div>
          </div>
          <div>
            <p className="text-xl font-bold">Name : {item.title}</p>
            <p className="text-sm">Location : {item.location}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">ราคา : {parseFloat(item.price).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})} บาท</p>
          <button
            className="bg-white text-black rounded-full w-8 h-8 mt-2 text-xl"
            onClick={onRemove}
          >−</button>
        </div>
      </div>
    );
}

function FooterTabBar() {
  return (
    <footer className="bg-[#2B2B2B] w-full h-10 mt-12"></footer>
  );
}


export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loaded = loadCart();
    setCartItems(loaded);
  }, []);

  const handleRemove = (id) => {
    const updated = removeItem(cartItems, id);
    setCartItems(updated);
    saveCart(updated);
  };

  const handleBuyMore = () => router.push("/Homepage");
  const handleCheckout = () => router.push("/Payment");

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 font-dm-serif">
        <Navbar />
        <main className="flex-grow">
        <h1 className="text-5xl font-bold text-center text-[#2C3E50] py-8 mb-10">Check out for your lands</h1>
        <div className="space-y-6">
            {cartItems.map(item => (
            <CartItem key={item.id} item={item} onRemove={() => handleRemove(item.id)} />
            ))}
        </div>

        <div className="mt-10 text-right text-xl text-[#2C3E50] px-15">
            <strong>
                ยอดสุทธิ : {getTotal(cartItems)} บาท
            </strong>
        </div>

        <div className="flex justify-end mt-6 gap-7 px-15">
            <button onClick={handleBuyMore} 
                    className="bg-[#D4AF37] text-white px-6 py-2 rounded-xl shadow-md text-xl cursor-pointer
                    hover:bg-yellow-500 transition-transform transform hover:scale-105">
            Buy more
            </button>
            <button onClick={handleCheckout} 
                    className="bg-[#783F15] text-white px-6 py-2 rounded-xl shadow-md text-xl cursor-pointer
                    hover:bg-red-500 transition-transform transform hover:scale-105">
            Check out
            </button>
        </div>
        </main>
        <FooterTabBar />
    </div>
  );
}

