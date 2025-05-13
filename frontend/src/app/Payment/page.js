'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-[#2B2B2B] text-white px-6 py-3 flex items-center justify-between">
      <div
        className="text-4xl font-bold tracking-wide cursor-pointer"
        onClick={() => router.push('/Homepage')}
      >
        Land:D
      </div>
      <div className="text-4xl">
        <FaUserCircle />
      </div>
    </nav>
  );
}

function PaymentSelector({ selected, onSelect }) {
  const options = ['กสิกร', 'กรุงไทย', 'ออมสิน', 'กรุงเทพ', 'ไทยพาณิชย์', 'เงินสด', 'เครดิตการ์ด'];

  return (
    <div className="flex justify-center">
        <div className="bg-[#2C3E50] p-6 rounded-xl shadow-md w-80">
            <h3 className="text-white text-lg font-semibold mb-4 text-center">Mobile Banking</h3>
            <div className="w-full">
            {options.map((option) => (
                <div
                key={option}
                onClick={() => onSelect(option)}
                className={`mt-4 p-4 bg-white rounded-md text-center cursor-pointer text-black font-medium shadow transition
                    ${selected === option ? 'ring-4 ring-yellow-500' : 'opacity-90 hover:opacity-100'}`}
                >
                {option}
                </div>
            ))}
            </div>
        </div>
    </div>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');

  const handleSubmit = () => {
    if (!paymentMethod || !deliveryMethod) {
      alert('กรุณาเลือก Payment method และ Delivery method ให้ครบ');
      return;
    }

    localStorage.setItem('payment_method', paymentMethod);
    localStorage.setItem('delivery_method', deliveryMethod);
    router.push('/Successful');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-200 font-dm-serif">
      <Navbar />
      <main className="flex-grow px-6 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#2C3E50] text-xl hover:text-yellow-600 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-[#2C3E50]">Payment methods</h2>

        <PaymentSelector selected={paymentMethod} onSelect={setPaymentMethod} />

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <label className="text-xl font-semibold text-[#2C3E50]">Delivery methods</label>
          <select
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="p-2 rounded-md shadow-sm"
          >
            <option value="">-- เลือกวิธีจัดส่ง --</option>
            <option value="ส่งไปรษณีย์">ส่งไปรษณีย์</option>
            <option value="รับที่สำนักงาน">รับที่สำนักงาน</option>
            <option value="นัดรับ">นัดรับ</option>
          </select>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={handleSubmit}
            className="bg-[#D4AF37] hover:bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md text-lg"
          >
            Submit
          </button>
        </div>
      </main>
      <footer className="bg-[#2B2B2B] w-full h-10 mt-12"></footer>
    </div>
  );
}


