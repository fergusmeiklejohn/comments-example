import { useGlobalState } from "../../App";
import SwitchUser from "../switchUser";

type HeaderBarProps = {
  addImage: () => void;
};

export default function HeaderBar({ addImage }: HeaderBarProps) {
  const [_images, setImages] = useGlobalState("images");
  const [_commentMarkers, setCommentMarkers] = useGlobalState("commentMarkers");
  const [_comments, setComments] = useGlobalState("comments");
  const [_commentDialogOpen, setCommentDialogOpen] =
    useGlobalState("commentDialogOpen");
  const [_activeCommentMarker, setActiveCommentMarker] = useGlobalState(
    "activeCommentMarker"
  );
  const [_scale, setScale] = useGlobalState("scale");
  const [_position, setPosition] = useGlobalState("position");

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <SwitchUser />
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              setImages([]);
              setCommentMarkers([]);
              setComments([]);
              setCommentDialogOpen(false);
              setActiveCommentMarker(undefined);
              setScale(1);
              setPosition([0, 0]);
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
