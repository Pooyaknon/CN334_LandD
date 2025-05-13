'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { fetchWithAuth } from '../utils/auth';

function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
  };

  return (
    <nav className="bg-[#2B2B2B] text-white px-6 py-3 flex items-center justify-between">
      <div className="text-4xl font-bold tracking-wide cursor-pointer" onClick={() => router.push(`/Homepage/`)}>
        Land:D
      </div>
      <button
        onClick={handleLogout}
        className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-yellow-500 transition-all"
      >
        Logout
      </button>
      <div className="text-4xl">
        <FaUserCircle />
      </div>
    </nav>
  );
}

function loadCart() {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

function saveCart(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function getTotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function removeItem(cartItems, id) {
  return cartItems.filter(item => item.id !== id);
}

function CartItem({ item, onRemove }) {
  return (
    <div className="relative bg-[#586674] text-white rounded-xl px-8 py-6 shadow-md mx-auto max-w-5xl mt-6">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 text-xl shadow-md cursor-pointer hover:bg-red-500 hover:text-white"
      >
        −
      </button>
      <div className="flex items-center gap-8">
        <div className="bg-white rounded-xl w-32 h-40 overflow-hidden flex items-center justify-center shadow-md">
          {item.images?.[0]?.image_url ? (
            <img
              src={item.images[0].image_url}
              alt="land"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-black w-full h-full" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold">ชื่อ : {item.title}</p>
          <p className="text-lg mt-2">สถานที่ : {item.location}</p>
        </div>
        <div className="absolute bottom-6 right-10 text-right">
          <p className="font-bold text-lg ">
            ราคา : {parseFloat(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท
          </p>
        </div>
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

  const handleCheckout = () => {
    const token = localStorage.getItem("access_token");

    // ถ้าไม่มี token -> แจ้งเตือนและเด้งไปหน้า login
    if (!token) {
      alert("กรุณา login ก่อนทำการชำระ");
      router.push("/login");
      return;
    }

    const landItems = cartItems.map(item => ({ land: item.id }));

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ items: landItems }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error("Checkout failed:", res.status, data);
          throw new Error("Checkout failed");
        }
        return data;
      })
      .then((data) => {
        alert("Checkout สำเร็จ!");
        localStorage.removeItem("cart");
        setCartItems([]);
      })
      .catch((err) => {
        console.error("Error during checkout:", err);
        alert("เกิดข้อผิดพลาดระหว่าง checkout");
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 font-dm-serif">
      <Navbar />
      <main className="flex-grow">
        <h1 className="text-5xl font-bold text-center text-[#2C3E50] py-10">Check out for your lands</h1>
        <div className="space-y-6">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} onRemove={() => handleRemove(item.id)} />
          ))}
        </div>
        <div className="mt-20 text-right text-xl text-[#2C3E50] px-25">
          <strong>
            ยอดสุทธิ : {getTotal(cartItems)} บาท
          </strong>
        </div>
        <div className="flex justify-end mt-6 gap-7 px-25">
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
