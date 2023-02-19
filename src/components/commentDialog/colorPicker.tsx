import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { useGlobalState } from "../../App";
import { CommentMarker, CommentMarkerColors } from "../../types";

type ColorPickerType = {
  name: CommentMarkerColors;
  bgColor:
    | "bg-yellow-500"
    | "bg-green-500"
    | "bg-red-500"
    | "bg-blue-500"
    | "bg-gray-900";
  selectedColor:
    | "ring-yellow-500"
    | "ring-green-500"
    | "ring-red-500"
    | "ring-blue-500"
    | "ring-gray-900";
};
const colors: ColorPickerType[] = [
  {
    name: "yellow",
    bgColor: "bg-yellow-500",
    selectedColor: "ring-yellow-500",
  },
  {
    name: "green",
    bgColor: "bg-green-500",
    selectedColor: "ring-green-500",
  },
  { name: "red", bgColor: "bg-red-500", selectedColor: "ring-red-500" },
  { name: "blue", bgColor: "bg-blue-500", selectedColor: "ring-blue-500" },
  {
    name: "black",
    bgColor: "bg-gray-900",
    selectedColor: "ring-gray-900",
  },
];

type ColorPickerProps = {
  commentMarker: CommentMarker;
};

export default function ColorPicker({ commentMarker }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(
    colors.filter((color) => color.name === commentMarker.color)[0] || colors[0]
  );
  const [commentMarkers, setCommentMarkers] = useGlobalState("commentMarkers");
  const handleSelectColor = (color: ColorPickerType) => {
    const thisCommentMarker = commentMarkers.filter(
      (commentMarker) => commentMarker.id === commentMarker.id
    )[0];
    thisCommentMarker.color = color.name;
    const commentMarkersRest = commentMarkers.filter(
      (commentMarker) => commentMarker.id !== thisCommentMarker.id
    );
    setCommentMarkers([...commentMarkersRest, thisCommentMarker]);
    setSelectedColor(color);
  };

  return (
    <RadioGroup value={selectedColor} onChange={(e) => handleSelectColor(e)}>
      <RadioGroup.Label className="hidden">
        Choose a comment color
      </RadioGroup.Label>
      <div className="flex items-center space-x-3">
        {colors.map((color) => (
          <RadioGroup.Option
            key={color.name}
            value={color}
            className={({ active, checked }) =>
              `
              ${color.selectedColor} 
              ${active && checked ? "ring ring-offset-1" : ""} 
              ${!active && checked ? "ring-2" : ""} 
              relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 transition-all duration-200 ease-in-out focus:outline-none
              `
            }
          >
            <RadioGroup.Label as="span" className="sr-only">
              {color.name}
            </RadioGroup.Label>
            <span
              aria-hidden="true"
              className={`
              ${color.bgColor} 
              h-4 w-4 rounded-full border border-black border-opacity-10
              `}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
