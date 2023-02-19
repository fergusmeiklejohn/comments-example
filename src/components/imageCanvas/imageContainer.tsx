import {
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { createId } from "@paralleldrive/cuid2";

import { Container, Sprite, Stage } from "@pixi/react";
import { FederatedPointerEvent, Texture } from "pixi.js";
import { useState } from "react";
import { useGlobalState } from "../../App";
import CommentDialog from "../commentDialog/CommentDialog";

import { changePosition } from "../../helpers";
import { CommentMarker, Position } from "../../types";
import { AnimatePresence } from "framer-motion";

type ImageContainerProps = {
  commentMarkers: CommentMarker[];
  setCommentMarkers: React.Dispatch<React.SetStateAction<CommentMarker[]>>;
  screenWidth: number;
  screenHeight: number;
};
export default function ImageContainer({
  commentMarkers,
  setCommentMarkers,
  screenWidth,
  screenHeight,
}: ImageContainerProps) {
  const [scale, setScale] = useGlobalState("scale");
  const [images] = useGlobalState("images");
  const [position, setPosition] = useGlobalState("position");
  const [commentDialogOpen, setCommentDialogOpen] =
    useGlobalState("commentDialogOpen");
  const [activeCommentMarker, setActiveCommentMarker] = useGlobalState(
    "activeCommentMarker"
  );

  return (
    <div className="relative">
      <Stage
        width={screenWidth}
        height={screenHeight}
        options={{ backgroundColor: 0xeef1f5 }}
      >
        {/* This is Texture sprite is a hack to fix a click bug in pixiJS React: https://github.com/pixijs/pixi-react/issues/416 when the bug is fixed we can remove this <Sprite texture.. /> */}
        <Sprite texture={Texture.WHITE} width={1} height={1} />
        <Container scale={scale} position={position}>
          {images?.map((image) => (
            <Sprite
              key={image.id}
              image={image.url}
              position={image.position}
              interactive
              pointerdown={(e: FederatedPointerEvent) => {
                const newCommentMarker: CommentMarker = {
                  id: createId(),
                  imageID: image.id,
                  position: [e.screen.x, e.screen.y] as Position,
                  color: "green",
                };
                setCommentMarkers((c) => [...c, newCommentMarker]);
                setActiveCommentMarker(newCommentMarker);
                setCommentDialogOpen(true);
              }}
            />
          ))}

          {commentMarkers?.map((commentMarker) => (
            <Sprite
              key={commentMarker.id}
              image={`/comment_note_${commentMarker.color}.png`}
              scale={[0.5, 0.5]}
              pivot={[0, 0]}
              position={commentMarker.position}
              interactive
              pointerdown={() => {
                setActiveCommentMarker(commentMarker);
                setCommentDialogOpen(true);
              }}
            />
          ))}
        </Container>
      </Stage>
      <AnimatePresence>
        {commentDialogOpen && activeCommentMarker ? (
          <CommentDialog
            key={activeCommentMarker.id}
            commentMarker={activeCommentMarker}
          />
        ) : null}
      </AnimatePresence>

      <div className="absolute top-4 right-4 flex items-center justify-center space-x-4">
        <button onClick={() => setScale(scale - 0.1)}>
          <MagnifyingGlassMinusIcon
            className="text-grey-500 h-5 w-5 hover:text-blue-600"
            aria-hidden="true"
          />
        </button>
        <button onClick={() => setScale(scale + 0.1)}>
          <MagnifyingGlassPlusIcon
            className="text-grey-500 h-5 w-5 hover:text-blue-600"
            aria-hidden="true"
          />
        </button>
      </div>
      <div className="absolute top-12 right-3 flex flex-col items-center justify-center">
        <button onClick={() => setPosition(changePosition(position, "up"))}>
          <ChevronUpIcon
            className="text-grey-500 h-5 w-5 hover:text-blue-600"
            aria-hidden="true"
          />
        </button>
        <div className="flex space-x-5">
          <button onClick={() => setPosition(changePosition(position, "left"))}>
            <ChevronLeftIcon
              className="text-grey-500 h-5 w-5 hover:text-blue-600"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => setPosition(changePosition(position, "right"))}
          >
            <ChevronRightIcon
              className="text-grey-500 h-5 w-5 hover:text-blue-600"
              aria-hidden="true"
            />
          </button>
        </div>

        <button onClick={() => setPosition(changePosition(position, "down"))}>
          <ChevronDownIcon
            className="text-grey-500 h-5 w-5 hover:text-blue-600"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
