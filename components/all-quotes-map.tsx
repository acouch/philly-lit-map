'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'
import Link from 'next/link'

// Fix for default marker icons in react-leaflet
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type Quote = {
  id: number
  title: string | null
  quote: string
  page_number: number
  latitude: number | null
  longitude: number | null
  books: {
    id: number
    title: string
    author: string
  }
}

type AllQuotesMapProps = {
  quotes: Quote[]
}

export default function AllQuotesMap({ quotes }: AllQuotesMapProps) {
  const quotesWithLocation = quotes.filter(
    (q) => q.latitude !== null && q.longitude !== null
  )

  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  if (quotesWithLocation.length === 0) {
    return (
      <div className="w-full bg-gray-100 p-12 text-center">
        <p className="text-gray-600">
          No quotes with location data yet. Add locations to your quotes to see
          them on the map!
        </p>
      </div>
    )
  }

  // Calculate center of all markers
  const avgLat =
    quotesWithLocation.reduce((sum, q) => sum + (q.latitude || 0), 0) /
    quotesWithLocation.length
  const avgLng =
    quotesWithLocation.reduce((sum, q) => sum + (q.longitude || 0), 0) /
    quotesWithLocation.length

  return (
    <div className="w-full">
      <div className="h-screen w-full">
        <MapContainer
          center={[avgLat, avgLng]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {quotesWithLocation.map((quote) => (
            <Marker
              key={quote.id}
              position={[quote.latitude!, quote.longitude!]}
              icon={icon}
            >
              <Popup>
                <div className="max-w-xs">
                  {quote.title && (
                    <h3 className="font-semibold mb-1">{quote.title}</h3>
                  )}
                  <p className="text-sm italic mb-2">
                    &quot;{quote.quote}&quot;
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    Page {quote.page_number}
                  </p>
                  <Link
                    href={`/books/${quote.books.id}`}
                    className="text-xs text-blue-600 hover:underline block"
                  >
                    From: {quote.books.title} by {quote.books.author}
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="bg-white p-4 text-center border-t">
        <p className="text-sm text-gray-600">
          Showing {quotesWithLocation.length} quote
          {quotesWithLocation.length !== 1 ? 's' : ''} with location data
        </p>
      </div>
    </div>
  )
}
