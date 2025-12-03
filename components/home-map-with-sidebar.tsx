'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Book = {
  id: number
  title: string
  author: string
  imageUrl: string | null
  publishDate: Date | null
}

type Quote = {
  id: number
  title: string | null
  quote: string
  pageNumber: number | null
  latitude: number | null
  longitude: number | null
  books: Book
}

type HomeMapWithSidebarProps = {
  quotes: Quote[]
  books: Book[]
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
  books,
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

  // Filter books to show only those with visible quotes
  const visibleBookIds = new Set(visibleQuotes.map((q) => q.books.id))
  const visibleBooks = books.filter((book) => visibleBookIds.has(book.id))

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
          <h1 className="text-2xl font-bold text-gray-900">Philly Lit Map</h1>
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
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedQuote.title}
                </h2>
              )}

              <blockquote className="text-gray-700 italic border-l-4 border-gray-900 pl-4 py-2">
                &quot;{selectedQuote.quote}&quot;
              </blockquote>

              <div className="text-sm text-gray-600 space-y-2">
                <p>Page {selectedQuote.pageNumber}</p>

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

            {/* Books Section */}
            {visibleBooks.length > 0 && (
              <div className="mt-6 space-y-3">
                <h2 className="font-semibold text-gray-900">
                  {mapBounds ? 'Books in View' : 'All Books'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Showing {visibleBooks.length} of {books.length} books
                  {visibleBooks.length !== 1 ? 's' : ''}
                </p>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {visibleBooks.map((book) => (
                    <Link
                      key={book.id}
                      href={`/books/${book.id}`}
                      className="flex gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {book.imageUrl && (
                        <Image
                          src={book.imageUrl}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                          width="48"
                          height="64"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {book.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {book.author}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quotes Section */}
            <div className="mt-6 space-y-3">
              <h2 className="font-semibold text-gray-900">
                {mapBounds ? 'Quotes in View' : 'All Quotes'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {visibleQuotes.length} of {quotesWithLocation.length}{' '}
                quote
                {quotesWithLocation.length !== 1 ? 's' : ''}
              </p>
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
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapBoundsUpdater onBoundsChange={setMapBounds} />
          <MarkerClusterGroup>
            {quotesWithLocation.map((quote) => {
              const imageUrl = quote.books.imageUrl
              const icon = L.icon({
                iconUrl:
                  imageUrl ??
                  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl:
                  imageUrl ??
                  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl:
                  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })
              return (
                <Marker
                  key={quote.id}
                  position={[quote.latitude!, quote.longitude!]}
                  icon={icon}
                  eventHandlers={{
                    click: () => setSelectedQuote(quote),
                  }}
                />
              )
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  )
}
