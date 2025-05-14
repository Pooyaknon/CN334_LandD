'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaUserCircle, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  const router = useRouter();
  return (
    <nav className="bg-[#2B2B2B] text-white px-6 py-3 flex items-center justify-between">
      <div className="text-4xl font-bold tracking-wide cursor-pointer" onClick={() => router.push(`/Homepage/`)}>
        Land:D
      </div>
      <div className="text-4xl">
        <FaUserCircle />
      </div>
    </nav>
  );
}

function FloatingCartButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/Cart')}
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
  return <footer className="bg-[#2B2B2B] w-full h-10 mt-12" />;
}

export default function CustomerProfile() {
  const router = useRouter();
  const { id } = useParams(); // <-- รับ id จาก URL
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log("ID:", id);
    console.log("Token:", token);
    
    if (!token) {
      setError('กรุณาเข้าสู่ระบบก่อน');
      return;
    }

    fetch(`http://localhost:8000/api/customers/${id}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error('โหลดข้อมูลไม่สำเร็จ');
        return res.json();
      })
      .then(data => {
        console.log("Customer data:", data);
        setCustomer(data);
      })
      .catch(err => {
        console.error('Error fetching customer:', err);
        setError('ไม่สามารถโหลดข้อมูลลูกค้าได้');
      });
  }, [id]);


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

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {customer ? (
            <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col md:flex-row gap-10">
              <div className="text-center flex-shrink-0">
                <FaUserCircle className="text-[150px] text-[#2B2B2B] mb-4 mx-auto" />
              </div>
              <div className="text-xl md:text-2xl text-gray-800">
                <p className="mb-3"><strong>Name:</strong> {customer.firstname} {customer.lastname}</p>
                <p className="mb-3"><strong>Email:</strong> {customer.email}</p>
                <p className="mb-3"><strong>Address:</strong> {customer.address || '-'}</p>
                <p className="mb-3"><strong>Province:</strong> {customer.province || '-'}</p>
                <p className="mb-3"><strong>Post code:</strong> {customer.post_code || '-'}</p>
                <p className="mb-3"><strong>Tel:</strong> {customer.tel || '-'}</p>
              </div>
            </div>
          ) : !error ? (
            <p className="text-gray-700 text-xl">กำลังโหลดข้อมูลลูกค้า...</p>
          ) : null}
        </div>
      </main>
      <FloatingCartButton />
      <FooterTabBar />
    </div>
  );
}
