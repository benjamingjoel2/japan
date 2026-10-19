// Sunrise / sunset from the NOAA solar position approximation. Accurate to about a minute,
// which is all a "today's sunrise in Kyoto" line needs. No network calls.

const rad = Math.PI / 180;

/** Returns minutes after local midnight for the given IANA offset (hours). */
export function sunTimes(date: Date, lat: number, lng: number, tzHours: number) {
  // Day of year in the target timezone.
  const local = new Date(date.getTime() + tzHours * 3600_000);
  const start = Date.UTC(local.getUTCFullYear(), 0, 0);
  const doy = Math.floor((local.getTime() - start) / 86_400_000);

  const g = ((2 * Math.PI) / 365) * (doy - 1);
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 -
    0.399912 * Math.cos(g) +
    0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) +
    0.000907 * Math.sin(2 * g) -
    0.002697 * Math.cos(3 * g) +
    0.00148 * Math.sin(3 * g);
  const zenith = 90.833 * rad;
  const ha = Math.acos(Math.cos(zenith) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl)) / rad;
  const noon = 720 - 4 * lng - eqTime + tzHours * 60;
  return { sunrise: noon - 4 * ha, sunset: noon + 4 * ha };
}

export function formatMinutes(min: number) {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return `${h}:${String(m === 60 ? 0 : m).padStart(2, '0')}`;
}

export const KYOTO = { lat: 35.0116, lng: 135.7681 };
