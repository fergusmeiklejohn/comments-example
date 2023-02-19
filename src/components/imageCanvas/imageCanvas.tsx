import HeaderBar from "./headerBar";
import { createImage, minMax } from "../../helpers";
import ImageContainer from "./imageContainer";

import { useGlobalState } from "../../App";
import useMeasure from "react-use-measure";

export default function ImageCanvas() {
  const [images, setImages] = useGlobalState("images");
  const [commentMarkers, setCommentMarkers] = useGlobalState("commentMarkers");
  const [ref, bounds] = useMeasure();
  const canvasWidth = minMax(320, 800, bounds.width);
  const canvasHeight = minMax(320, 600, bounds.height);
  return (
    <div
      ref={ref}
      className="relative mt-4 flex w-screen max-w-[800px] flex-col shadow-lg"
    >
      <HeaderBar
        addImage={() => {
          const newImage = createImage(images, canvasWidth, canvasHeight);
          const newImages = images ? [...images, newImage] : [newImage];
          setImages(newImages);
        }}
      />
      <ImageContainer
        commentMarkers={commentMarkers}
        setCommentMarkers={setCommentMarkers}
        screenWidth={canvasWidth}
        screenHeight={canvasHeight}
      />
    </div>
  );
}
