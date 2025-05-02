// ฤสส ยพนกีแะ
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AllProducts() {
  const [lands, setLands] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/lands/')
      .then(res => res.json())
      .then(data => setLands(data))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการที่ดินทั้งหมด</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lands.map(land => (
          <div key={land.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{land.title}</h2>
            <p>{land.location}</p>
            <p>size: {land.size} ไร่</p>
            <p className="text-green-600 font-bold">฿ {land.price}</p>
            <Link href={`/product/byId/${land.id}`} className="text-blue-500">detail</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
