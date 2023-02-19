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

function randomPosition(): [number, number] {
  return [Math.floor(Math.random() * 260), Math.floor(Math.random() * 140)];
}

export function createImage(images: Image[] | undefined): Image {
  return {
    id: createId(),
    url: randomImageUrl(images),
    position: randomPosition(),
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
