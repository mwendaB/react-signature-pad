import { Point } from '../types';

export const validateSignature = (points: Point[]): boolean => {
  if (points.length < 5) return false;
  
  // Check if signature has enough complexity
  const boundingBox = getBoundingBox(points);
  const area = (boundingBox.maxX - boundingBox.minX) * (boundingBox.maxY - boundingBox.minY);
  
  if (area < 100) return false; // Too small
  
  // Check if signature has enough movement
  const totalDistance = calculateTotalDistance(points);
  if (totalDistance < 50) return false; // Not enough movement
  
  return true;
};

export const getBoundingBox = (points: Point[]): { minX: number; minY: number; maxX: number; maxY: number } => {
  if (points.length === 0) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  
  let minX = points[0].x;
  let minY = points[0].y;
  let maxX = points[0].x;
  let maxY = points[0].y;
  
  for (let i = 1; i < points.length; i++) {
    minX = Math.min(minX, points[i].x);
    minY = Math.min(minY, points[i].y);
    maxX = Math.max(maxX, points[i].x);
    maxY = Math.max(maxY, points[i].y);
  }
  
  return { minX, minY, maxX, maxY };
};

export const calculateTotalDistance = (points: Point[]): number => {
  let distance = 0;
  
  for (let i = 1; i < points.length; i++) {
    distance += Math.sqrt(
      Math.pow(points[i].x - points[i - 1].x, 2) + 
      Math.pow(points[i].y - points[i - 1].y, 2)
    );
  }
  
  return distance;
};

export const isSignatureEmpty = (dataURL: string): boolean => {
  // Create a canvas to check if the signature is empty
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return true;
  
  const img = new Image();
  img.src = dataURL;
  
  // This is a simplified check - in a real implementation, you'd need to wait for the image to load
  // and then check if it has any non-transparent pixels
  
  return dataURL === '' || dataURL.includes('data:image/png;base64,AAAA');
};