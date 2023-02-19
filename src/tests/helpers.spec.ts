import { test, expect } from "vitest";
import { createImage, changePosition, minMax } from "../helpers";
import { createId } from "@paralleldrive/cuid2";

test.concurrent("createImageFromUndefined", () => {
  const image = createImage(undefined, 0, 0);
  expect(image).toHaveProperty("id");
  expect(image).toHaveProperty("url");
  expect(image).toHaveProperty("position");
});

test.concurrent("createImageFromEmptyArray", () => {
  const image = createImage([], 320, 600);
  expect(image).toHaveProperty("id");
  expect(image).toHaveProperty("url");
  expect(image).toHaveProperty("position");
});

test.concurrent("createImageFromArray", () => {
  const image = createImage(
    [
      {
        id: createId(),
        url: "/taipei101.png",
        position: [0, 0],
      },
    ],
    800,
    600
  );
  expect(image).toHaveProperty("id");
  expect(image).toHaveProperty("url");
  expect(image).toHaveProperty("position");
});

test("changePositionUp", () => {
  const position = changePosition([0, 0], "up");
  expect(position).toEqual([0, -20]);
});
test("changePositionDown", () => {
  const position = changePosition([0, 0], "down");
  expect(position).toEqual([0, 20]);
});
test("changePositionLeft", () => {
  const position = changePosition([0, 0], "left");
  expect(position).toEqual([-20, 0]);
});
test("changePositionRight", () => {
  const position = changePosition([0, 0], "right");
  expect(position).toEqual([20, 0]);
});
test("unknownDirection", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expect(() => changePosition([0, 0], "unknown" as any)).toThrowError(
    "Unknown direction"
  );
});

test("minMax", () => {
  expect(minMax(0, 10, 20)).toBe(10);
  expect(minMax(0, 10, -20)).toBe(0);
  expect(minMax(0, 10, 5)).toBe(5);
});
