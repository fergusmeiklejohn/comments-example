import { FaceSmileIcon as FaceSmileIconOutline } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";

import { useState, Fragment, ForwardRefExoticComponent, SVGProps } from "react";
import { CommentMoodReaction, CommentType } from "../../types";
import { useGlobalState } from "../../App";

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Love",
    value: "love",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIconMini,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbs up",
    value: "thumbsup",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
];

type MoodReactionDropdownProps = {
  currentMoodReaction: CommentMoodReaction;
  commentID: string;
};

export default function MoodReactionDropdown({
  currentMoodReaction,
  commentID,
}: MoodReactionDropdownProps) {
  const [selected, setSelected] = useState(
    moods.filter((mood) => mood.value === currentMoodReaction)[0] || moods[0]
  );
  const [comments, setComments] = useGlobalState("comments");

  const selectMood = (e: {
    name: string;
    value: string;
    icon: ForwardRefExoticComponent<
      SVGProps<SVGSVGElement> & {
        title?: string | undefined;
        titleId?: string | undefined;
      }
    >;
    iconColor: string;
    bgColor: string;
  }) => {
    const thisComment = comments.filter(
      (comment) => comment.id === commentID
    )[0];
    const commentAmended: CommentType = {
      ...thisComment,
      mood: e.value as CommentMoodReaction,
    };
    const commentsRest = comments.filter((comment) => comment.id !== commentID);
    setComments([...commentsRest, commentAmended]);
    setSelected(e);
  };
  return (
    <div className="flow-root">
      <Listbox value={selected} onChange={(e) => selectMood(e)}>
        {({ open }) => (
          <>
            <Listbox.Label className="sr-only"> Your mood </Listbox.Label>
            <div className="relative ml-2">
              <Listbox.Button className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                <span className="flex items-center justify-center">
                  {selected.value === null ? (
                    <span>
                      <FaceSmileIconOutline
                        className="h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> Add your mood </span>
                    </span>
                  ) : (
                    <span>
                      <span
                        className={`${selected.bgColor} flex h-7 w-7 items-center justify-center rounded-full`}
                      >
                        <selected.icon
                          className="h-5 w-5 flex-shrink-0 text-white"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="sr-only">{selected.name}</span>
                    </span>
                  )}
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute right-0 z-10 w-14 origin-top-right rounded-3xl bg-white text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto">
                  {moods.map((mood) => (
                    <Listbox.Option
                      key={mood.value}
                      className={({ active }) =>
                        `${active ? "bg-gray-100" : "bg-white"}
                      relative cursor-default select-none py-2 px-3 transition-all first:rounded-t-3xl last:rounded-b-3xl`
                      }
                      value={mood}
                    >
                      <div className="flex items-center">
                        <div
                          className={`${mood.bgColor} flex h-8 w-8 items-center justify-center rounded-full`}
                        >
                          <mood.icon
                            className={`
                          ${mood.iconColor} 
                          h-5 w-5 flex-shrink-0`}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="sr-only">{mood.name}</span>
                      </div>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
