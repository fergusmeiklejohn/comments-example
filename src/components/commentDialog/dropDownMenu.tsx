import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  StarIcon,
  CodeBracketIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { useGlobalState } from "../../App";
import ConfirmDeleteDialog from "./confirmDeleteDialog";

type DropDownMenuProps = {
  deleteCommentsAndMarker: () => void;
};

export default function DropDownMenu({
  deleteCommentsAndMarker,
}: DropDownMenuProps) {
  const [_commentDialogOpen, setCommentDialogOpen] =
    useGlobalState("commentDialogOpen");
  const [_activeCommentMarker, setActiveCommentMarker] = useGlobalState(
    "activeCommentMarker"
  );
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  return (
    <>
      <div className="flex flex-shrink-0 self-center ">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`
                  ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                  flex rounded-t-lg px-4 py-2 text-sm
                `}
                    >
                      <StarIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Add to favorites</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`
                  ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                  flex px-4 py-2 text-sm
                `}
                    >
                      <CodeBracketIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Embed</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setCommentDialogOpen(false);
                        setActiveCommentMarker(undefined);
                      }}
                      className={`
                  ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                  flex w-full rounded-b-lg px-4 py-2 text-sm
                `}
                    >
                      <TrashIcon
                        className="mr-3 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Close</span>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenConfirmDeleteDialog(true)}
                      className={`
                  ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"}
                  flex w-full rounded-b-lg px-4 py-2 text-sm
                `}
                    >
                      <TrashIcon
                        className="mr-3 h-5 w-5 text-red-600"
                        aria-hidden="true"
                      />
                      <span>Delete</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <ConfirmDeleteDialog
        deleteCommentsAndMarker={deleteCommentsAndMarker}
        open={openConfirmDeleteDialog}
        setOpen={setOpenConfirmDeleteDialog}
      />
    </>
  );
}
