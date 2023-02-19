import ImageCanvas from "./components/imageCanvas/imageCanvas";

import { createGlobalState } from "react-hooks-global-state";
import { Image, CommentType, AuthUser, CommentMarker } from "./types";

export const users: AuthUser[] = [
  {
    id: "1",
    name: "Jane Doe",
    avatar: "/female-avatar.png",
  },
  {
    id: "2",
    name: "John Patrick",
    avatar: "male-avatar.png",
  },
];

export const { useGlobalState } = createGlobalState<{
  commentDialogOpen: boolean;
  activeCommentMarker: CommentMarker | undefined;
  commentMarkers: CommentMarker[];
  comments: CommentType[];
  images: Image[] | undefined;
  authUser: AuthUser | undefined;
}>({
  commentDialogOpen: false,
  activeCommentMarker: undefined,
  commentMarkers: [],
  comments: [],
  images: [],
  authUser: users[0],
});

function App() {
  return (
    <div className="flex flex-col items-center justify-center pb-16">
      <ImageCanvas />
    </div>
  );
}

export default App;
