import { ImageResponse } from 'next/og';

export const alt = 'Komorebi: Japan, in its own time';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          color: '#f4efe4',
          background: 'radial-gradient(circle at 30% 25%, #c9c48c 0%, #6f7a4f 35%, #2a3324 100%)',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.85 }}>Private journeys · Seasonal · Slow · Japan</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 180, lineHeight: 0.9, letterSpacing: -4 }}>KOMOREBI</div>
          <div style={{ fontSize: 40, marginTop: 20 }}>Japan, in its own time.</div>
        </div>
      </div>
    ),
    size,
  );
}
