'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function CategoryPage() {
  const { id } = useParams()
  const [lands, setLands] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8000/api/lands/?category=${id}`)
      .then(res => res.json())
      .then(data => setLands(data))
      .catch(err => console.error('Fetch error:', err))
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">หมวดหมู่ที่ดิน #{id}</h1>
      <ul className="space-y-2">
        {lands.map(land => (
          <li key={land.id} className="bg-white p-4 rounded shadow">
            <p className="font-medium">{land.title}</p>
            <p>จังหวัด: {land.location}</p>
            <p>ราคา: ฿{land.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
