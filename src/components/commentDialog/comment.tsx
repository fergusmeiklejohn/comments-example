import MoodReactionDropdown from "./moodReactionDropdown";
import { formatRelative } from "date-fns";
import { CommentType } from "../../types";

export default function Comment({ comment }: { comment: CommentType }) {
  const { id, text, userName, createdAt, userAvatar, mood } = comment;
  const timeAgo = formatRelative(new Date(createdAt), new Date());
  return (
    <div className="flex flex-col">
      <div className="flex space-x-2">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={userAvatar ?? ""}
            alt="commenter's avatar"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-medium text-gray-900">
            <a href="#" className="hover:underline">
              {userName}
            </a>
          </p>
          <p className="self-start text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="ml-14 flex-grow text-gray-800">{text}</p>
        <MoodReactionDropdown currentMoodReaction={mood} commentID={id} />
      </div>
    </div>
  );
}
