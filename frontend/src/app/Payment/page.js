'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

function Navbar() {
<<<<<<< HEAD
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

function PaymentSelector({ selected, onSelect, options }) {
    return (
        <div className="flex justify-center">
            <div className="bg-[#2C3E50] p-6 rounded-xl shadow-md w-fit">
                <div className="grid grid-cols-2 gap-8">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => onSelect(option.value)}
                            className={`p-8 bg-white text-xl rounded-md text-center cursor-pointer text-black font-medium shadow transition ${selected === option.value ? 'ring-4 ring-yellow-500' : 'opacity-90 hover:opacity-100'
                                }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
=======
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

function PaymentSelector({ selected, onSelect, options }) {
  return (
    <div className="flex justify-center">
      <div className="bg-[#2C3E50] p-6 rounded-xl shadow-md w-fit">
        <div className="grid grid-cols-2 gap-8">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => onSelect(option.value)}
              className={`p-8 bg-white text-xl rounded-md text-center cursor-pointer text-black font-medium shadow transition ${
                selected === option.value ? 'ring-4 ring-yellow-500' : 'opacity-90 hover:opacity-100'
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
>>>>>>> 03d9a36946ab557530f75e1860e414909e8c1e52
}

export default function PaymentPage() {
    const router = useRouter();
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payment-methods/`)
<<<<<<< HEAD
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.map((item) => ({
                    id: item.id,
                    value: item.method_name,
                    label: item.method_name,
                }));
                setPaymentOptions(mapped);
            })
            .catch((err) => console.error('Error fetching payment methods:', err));

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delivery-methods/`)
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.map((item) => ({
                    id: item.id,
                    value: item.method_name,
                    label: item.method_name,
                }));
                setDeliveryOptions(mapped);
            })
            .catch((err) => console.error('Error fetching delivery methods:', err));
    }, []);

    const handleSubmit = async () => {
        if (!paymentMethod || !deliveryMethod) {
            alert('กรุณาเลือก Payment method และ Delivery method ให้ครบ');
            return;
        }

        const token = localStorage.getItem('token');
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        const landId = cartItems?.[0]?.id;

        if (!token || !landId) {
            alert('ไม่พบข้อมูลผู้ใช้หรือสินค้า กรุณาทำการสั่งซื้อใหม่');
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        };

        const payload = {
            land: landId,
            payment_method: paymentMethod,
            delivery_method: deliveryMethod,
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Order failed:", errorData);
                alert("สั่งซื้อไม่สำเร็จ");
                return;
            }

            localStorage.removeItem('cart');
            localStorage.removeItem('payment_method');
            localStorage.removeItem('delivery_method');
            alert('สั่งซื้อสำเร็จแล้ว!');
            router.push('/Successful');
        } catch (err) {
            console.error('Error during order creation:', err);
            alert('เกิดข้อผิดพลาดระหว่างทำรายการ');
        }
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

                <PaymentSelector selected={paymentMethod} onSelect={setPaymentMethod} options={paymentOptions} />

                <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                    <label className="text-xl font-semibold text-[#2C3E50]">Delivery methods</label>
                    <select
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="p-2 rounded-md shadow-sm"
                    >
                        <option value="">-- เลือกวิธีจัดส่ง --</option>
                        {deliveryOptions.map((option) => (
                            <option key={option.id} value={option.value}>
                                {option.label}
                            </option>
                        ))}
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
=======
        .then((res) => res.json())
        .then((data) => {
            const mapped = data.map((item) => ({
            id: item.id,
            value: item.method_name,
            label: item.method_name,
            }));
            setPaymentOptions(mapped);
        })
        .catch((err) => console.error('Error fetching payment methods:', err));

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delivery-methods/`)
        .then((res) => res.json())
        .then((data) => {
            const mapped = data.map((item) => ({
            id: item.id,
            value: item.method_name,
            label: item.method_name,
            }));
            setDeliveryOptions(mapped);
        })
        .catch((err) => console.error('Error fetching delivery methods:', err));
    }, []);

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

            <PaymentSelector selected={paymentMethod} onSelect={setPaymentMethod} options={paymentOptions} />

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
            <label className="text-xl font-semibold text-[#2C3E50]">Delivery methods</label>
            <select
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="p-2 rounded-md shadow-sm"
            >
                <option value="">-- เลือกวิธีจัดส่ง --</option>
                {deliveryOptions.map((option) => (
                <option key={option.id} value={option.value}>
                    {option.label}
                </option>
                ))}
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


>>>>>>> 03d9a36946ab557530f75e1860e414909e8c1e52
