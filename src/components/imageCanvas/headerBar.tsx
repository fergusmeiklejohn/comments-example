import { useGlobalState } from "../../App";
import SwitchUser from "../switchUser";

export default function HeaderBar({ addImage }: { addImage: () => void }) {
  const [_images, setImages] = useGlobalState("images");
  const [_commentMarkers, setCommentMarkers] = useGlobalState("commentMarkers");
  const [_comments, setComments] = useGlobalState("comments");
  const [_commentDialogOpen, setCommentDialogOpen] =
    useGlobalState("commentDialogOpen");
  const [_activeCommentMarker, setActiveCommentMarker] = useGlobalState(
    "activeCommentMarker"
  );

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <SwitchUser />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              setImages([]);
              setCommentMarkers([]);
              setComments([]);
              setCommentDialogOpen(false);
              setActiveCommentMarker(undefined);
            }}
          >
            Reset All
          </button>
          <button
            type="button"
            className="relative inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => addImage()}
          >
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
}