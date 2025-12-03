'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

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
  pageNumber: number | null
  latitude: number | null
  longitude: number | null
}

type QuotesMapProps = {
  quotes: Quote[]
}

export default function QuotesMap({ quotes }: QuotesMapProps) {
  const quotesWithLocation = quotes.filter(
    (q) => q.latitude !== null && q.longitude !== null
  )

  // Calculate center of all markers
  const avgLat =
    quotesWithLocation.reduce((sum, q) => sum + (q.latitude || 0), 0) /
    quotesWithLocation.length
  const avgLng =
    quotesWithLocation.reduce((sum, q) => sum + (q.longitude || 0), 0) /
    quotesWithLocation.length

  useEffect(() => {
    // Fix for SSR issues with Leaflet
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  if (quotesWithLocation.length === 0) {
    return null
  }
  return (
    <div className="border-t border-gray-300 pt-8 mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quote Map</h2>
      <div className="h-96 rounded-lg overflow-hidden ring-1 ring-gray-900/5">
        <MapContainer
          center={[avgLat, avgLng]}
          zoom={13}
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
                  <p className="text-xs text-gray-600">
                    Page {quote.pageNumber}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Showing {quotesWithLocation.length} quote
        {quotesWithLocation.length !== 1 ? 's' : ''} with location data
      </p>
    </div>
  )
}
