'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
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

type HomeMapWithSidebarProps = {
  quotes: Quote[]
}

function MapBoundsUpdater({
  onBoundsChange,
}: {
  onBoundsChange: (bounds: L.LatLngBounds) => void
}) {
  const map = useMapEvents({
    moveend: () => {
      onBoundsChange(map.getBounds())
    },
    zoomend: () => {
      onBoundsChange(map.getBounds())
    },
  })

  useEffect(() => {
    onBoundsChange(map.getBounds())
  }, [map, onBoundsChange])

  return null
}

export default function HomeMapWithSidebar({
  quotes,
}: HomeMapWithSidebarProps) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null)

  const quotesWithLocation = quotes.filter(
    (q) => q.latitude !== null && q.longitude !== null
  )

  // Filter quotes based on map bounds
  const visibleQuotes = mapBounds
    ? quotesWithLocation.filter((quote) =>
        mapBounds.contains([quote.latitude!, quote.longitude!])
      )
    : quotesWithLocation

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
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-12">
          <p className="text-gray-600 text-lg">
            No quotes with location data yet. Add locations to your quotes to
            see them on the map!
          </p>
        </div>
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
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-96 bg-white shadow-lg overflow-y-auto border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Literary Map</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {visibleQuotes.length} of {quotesWithLocation.length} quote
            {quotesWithLocation.length !== 1 ? 's' : ''}
          </p>
        </div>

        {selectedQuote ? (
          <div className="p-6">
            <button
              onClick={() => setSelectedQuote(null)}
              className="text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              ← Back to all quotes
            </button>

            <div className="space-y-4">
              {selectedQuote.title && (
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedQuote.title}
                </h3>
              )}

              <blockquote className="text-gray-700 italic border-l-4 border-gray-900 pl-4 py-2">
                &quot;{selectedQuote.quote}&quot;
              </blockquote>

              <div className="text-sm text-gray-600 space-y-2">
                <p>Page {selectedQuote.page_number}</p>

                <div className="border-t border-gray-200 pt-4">
                  <p className="font-medium text-gray-900 mb-1">From:</p>
                  <Link
                    href={`/books/${selectedQuote.books.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {selectedQuote.books.title}
                  </Link>
                  <p className="text-gray-600">
                    by {selectedQuote.books.author}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Link
                  href={`/quote/${selectedQuote.id}`}
                  className="inline-block bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  View Full Quote
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-gray-600 text-sm">
              Click on a marker on the map to view the quote details.
            </p>

            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-900">
                {mapBounds ? 'Quotes in View' : 'All Quotes'}
              </h3>
              {visibleQuotes.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {visibleQuotes.map((quote) => (
                    <button
                      key={quote.id}
                      onClick={() => setSelectedQuote(quote)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {quote.title || quote.quote}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {quote.books.title}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No quotes visible in this area. Zoom out to see more.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          center={[avgLat, avgLng]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          <MapBoundsUpdater onBoundsChange={setMapBounds} />
          {quotesWithLocation.map((quote) => (
            <Marker
              key={quote.id}
              position={[quote.latitude!, quote.longitude!]}
              icon={icon}
              eventHandlers={{
                click: () => setSelectedQuote(quote),
              }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
