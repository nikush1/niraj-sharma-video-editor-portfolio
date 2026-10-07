import { ImageResponse } from 'next/og';

export const alt = 'Niraj Kumar Sharma — Performance Video Editor for D2C brands';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', background: '#F9F6F1', padding: '66px 72px', color: '#1C1410', fontFamily: 'sans-serif', borderTop: '12px solid #C9961A' }}>
      <div style={{ display: 'flex', fontSize: 26, color: '#0D8C89' }}>NIRAJ KUMAR SHARMA</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', fontSize: 70, fontWeight: 700 }}>Performance Video Editor</div>
        <div style={{ display: 'flex', fontSize: 50, color: '#986A0A' }}>for D2C brands.</div>
        <div style={{ display: 'flex', fontSize: 27, marginTop: 20 }}>Meta Ads · UGC · Product Videos</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 23, color: '#5A4F45' }}>
        <span>Video Editor at BeastLife</span><span>nirajvisuals.in</span>
      </div>
    </div>,
    { ...size },
  );
}
