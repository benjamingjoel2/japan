// Photo library: maps each image slot's subject (see Media.subject) to an Unsplash photo.
// Generated from the photo research; edit by hand to swap a picture. Photos are used under the
// Unsplash License (https://unsplash.com/license) and hotlinked from Unsplash's CDN.
// Replace with your own photography over time by setting `src` on the media item instead.

export type Photo = { photo: string; alt: string; photographer: string };

export const photos: Record<string, Photo> = {};
