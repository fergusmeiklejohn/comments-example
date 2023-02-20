import { createId } from "@paralleldrive/cuid2";
import { Image, Position } from "./types";

const imageUrls = [
  "/taipei101.png",
  "/taipei102.png",
  "/taipei103.png",
  "/taipei104.png",
  "/taipei105.png",
  "/taipei106.png",
];

function randomImageUrl(images: Image[] | undefined) {
  if (!images) return imageUrls[Math.floor(Math.random() * imageUrls.length)];
  const usedUrls = images.map((image) => image.url);
  const unusedUrls = imageUrls.filter((url) => !usedUrls.includes(url));
  if (unusedUrls.length === 0)
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
  return unusedUrls[Math.floor(Math.random() * unusedUrls.length)];
}

export function minMax(min: number, max: number, value: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function randomPosition(
  canvasWidth: number,
  canvasHeight: number
): [number, number] {
  const maxInsertWidth = canvasWidth - canvasWidth / 4 - 100;
  const maxInsertHeight = canvasHeight - canvasHeight / 2 - 50;
  return [
    minMax(0, maxInsertWidth, Math.floor(Math.random() * maxInsertWidth)),
    minMax(0, maxInsertHeight, Math.floor(Math.random() * maxInsertHeight)),
  ];
}
randomPosition(800, 600); //?

export function createImage(
  images: Image[] | undefined,
  canvasWidth: number,
  canvasHeight: number
): Image {
  return {
    id: createId(),
    url: randomImageUrl(images),
    position: randomPosition(canvasWidth, canvasHeight),
  };
}

type Direction = "up" | "down" | "left" | "right";

export function changePosition(
  position: Position,
  direction: Direction
): [number, number] {
  const clonedPosition: Position = [...position];
  switch (direction) {
    case "up":
      clonedPosition[1] -= 20;
      break;
    case "down":
      clonedPosition[1] += 20;
      break;
    case "left":
      clonedPosition[0] -= 20;
      break;
    case "right":
      clonedPosition[0] += 20;
      break;
    default:
      throw new Error("Unknown direction");
  }
  return clonedPosition;
}
