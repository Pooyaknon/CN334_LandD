'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function LandDetail() {
  const { id } = useParams()
  const [land, setLand] = useState(null)

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lands/${id}/`)
        .then(res => res.json())
        .then(data => setLand(data))
    }
  }, [id])

  if (!land) return <div className="p-6">Loading data...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{land.title}</h1>
      <p className="text-gray-600">{land.description}</p>
      <p>ที่ตั้ง: {land.location}</p>
      <p>size: {land.size} ไร่</p>
      <p className="text-green-600 font-semibold text-lg">฿ {land.price}</p>
      <p>status: {land.is_sold ? 'ขายแล้ว' : 'พร้อมขาย'}</p>

      {land.images && land.images.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">image</h2>
          <div className="grid grid-cols-2 gap-4">
            {land.images.map((img, index) => (
              <img key={index} src={img.image_url} alt={`land-${index}`} className="w-full h-auto rounded shadow" />
            ))}
          </div>
        </div>
      )}

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        add to cart
      </button>
    </div>
  )
}