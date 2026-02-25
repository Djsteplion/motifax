import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Motifax | Design DNA AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* The Mf Logo */}
        <div style={{ 
          display: 'flex', 
          fontStyle: 'italic', 
          fontWeight: 'bold', 
          letterSpacing: '-0.05em',
          fontSize: 200,
          marginBottom: 20
        }}>
          Mf
        </div>
        {/* The Subtitle */}
        <div style={{ 
          fontSize: 32, 
          letterSpacing: '0.2em', 
          textTransform: 'uppercase',
          color: '#888'
        }}>
          Design DNA Decoder
        </div>
      </div>
    ),
    { ...size }
  )
}