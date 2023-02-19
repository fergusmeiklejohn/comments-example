import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useGlobalState } from "../../App";
import { createId } from "@paralleldrive/cuid2";
import { CommentMoodReaction, CommentType } from "../../types";

export default function WriteComment({
  commentMarkerID,
  imageID,
}: {
  commentMarkerID: string;
  imageID: string;
}) {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useGlobalState("comments");
  const [authUser] = useGlobalState("authUser");
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={authUser?.avatar ?? ""}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="border-b border-gray-200 focus-within:border-gray-600">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            rows={2}
            name="comment"
            id="comment"
            className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 placeholder:text-base focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder="Add your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div className="flex justify-end pt-2">
          <div className="my-auto flex">
            <button
              aria-label="submit comment"
              onClick={() => {
                const newComment: CommentType = {
                  id: createId(),
                  text: commentText,
                  commentMarkerID,
                  imageID,
                  userID: authUser?.id ?? "Anonymous",
                  userName: authUser?.name ?? "Anonymous",
                  userAvatar: authUser?.avatar ?? "",
                  createdAt: new Date(),
                  mood: "happy",
                };
                setCommentText("");
                setComments([...comments, newComment]);
              }}
              className="inline-flex items-center rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
            >
              <PaperAirplaneIcon className="h-7 w-7 text-blue-500 hover:text-blue-900" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
