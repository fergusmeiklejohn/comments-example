import HeaderBar from "./headerBar";
import { createImage } from "../../helpers";
import ImageContainer from "./imageContainer";

import { useGlobalState } from "../../App";

export default function ImageCanvas() {
  const [images, setImages] = useGlobalState("images");
  const [commentMarkers, setCommentMarkers] = useGlobalState("commentMarkers");

  return (
    <div className="relative mt-4 flex w-[800px] flex-col shadow-lg">
      <HeaderBar
        addImage={() => {
          const newImage = createImage(images);
          const newImages = images ? [...images, newImage] : [newImage];
          setImages(newImages);
        }}
      />
      <ImageContainer
        commentMarkers={commentMarkers}
        setCommentMarkers={setCommentMarkers}
      />
    </div>
  );
}
