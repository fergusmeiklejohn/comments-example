import { test, expect, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CommentDialog from "../components/commentDialog/CommentDialog";
import { CommentMarker } from "../types";

const commentMarker: CommentMarker = {
  id: "1",
  imageID: "2",
  color: "red",
  position: [50, 50],
};

/**
 * @vitest-environment jsdom
 */

test("CommentDialog", async () => {
  render(<CommentDialog commentMarker={commentMarker} />);
  expect(screen.getByText("Resolve")).toBeTruthy();
  expect(screen.getByPlaceholderText("Add your comment...")).toBeTruthy();
  await userEvent.type(
    screen.getByPlaceholderText("Add your comment..."),
    "test comment"
  );
  await userEvent.click(screen.getByLabelText("submit comment"));
  expect(screen.getByText("test comment")).toBeTruthy();
});
