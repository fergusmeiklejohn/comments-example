import { BellIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

import ColorPicker from "./colorPicker";
import DropDownMenu from "./dropDownMenu";
import ResolveSwitch from "./resolveSwitch";
import Comment from "./comment";
import WriteComment from "./writeComment";
import { useGlobalState } from "../../App";
import { CommentMarker } from "../../types";

type CommentDialogProps = {
  commentMarker: CommentMarker;
};

export default function CommentDialog({ commentMarker }: CommentDialogProps) {
  const [_commentMarkers, setCommentMarkers] = useGlobalState("commentMarkers");
  const [comments, setComments] = useGlobalState("comments");
  const [_commentDialogOpen, setCommentDialogOpen] =
    useGlobalState("commentDialogOpen");
  const [_activeCommentMarker, setActiveCommentMarker] = useGlobalState(
    "activeCommentMarker"
  );

  const deleteCommentsAndMarker = () => {
    const newCommentMarkers = _commentMarkers.filter(
      (marker) => marker.id !== commentMarker.id
    );
    const newComments = comments.filter(
      (comment) => comment.commentMarkerID !== commentMarker.id
    );
    setCommentMarkers(newCommentMarkers);
    setComments(newComments);
    setCommentDialogOpen(false);
    setActiveCommentMarker(undefined);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute bottom-0 right-0 h-auto w-screen rounded-md bg-white px-4 py-5 shadow-xl sm:px-6 md:bottom-5 md:right-5 md:w-[30rem]"
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between space-x-3 border-b border-gray-200 py-2">
          <ResolveSwitch deleteCommentsAndMarker={deleteCommentsAndMarker} />

          <ColorPicker commentMarker={commentMarker} />
          <div className="flex items-center justify-center space-x-1">
            <button onClick={() => console.log("bell icon clicked")}>
              <BellIcon
                className="mr-3 h-5 w-5 text-blue-500 hover:text-blue-900"
                aria-hidden="true"
              />
            </button>
            <DropDownMenu deleteCommentsAndMarker={deleteCommentsAndMarker} />
          </div>
        </div>

        {comments
          .filter((comment) => comment.commentMarkerID === commentMarker.id)
          .map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}

        <WriteComment
          commentMarkerID={commentMarker.id}
          imageID={commentMarker.imageID}
        />
      </div>
    </motion.div>
  );
}
