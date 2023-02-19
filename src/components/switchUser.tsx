import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useGlobalState, users } from "../App";

export default function SwitchUser() {
  const [authUser, setAuthUser] = useGlobalState("authUser");
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
              ${open ? "text-gray-900" : "text-gray-500}"} 
              group inline-flex items-center space-x-2 rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-4
            `}
          >
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={authUser?.avatar ?? ""}
                alt=""
              />
            </div>
            <span>Switch Auth User</span>
            <ChevronDownIcon
              className={`
                ${open ? "text-gray-600" : "text-gray-400"} 
                 ml-2 h-5 w-5 group-hover:text-gray-500
              `}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-xs px-2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-2 bg-white sm:gap-8 sm:p-4">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      className="bg-white"
                      onClick={() => {
                        setAuthUser(user);
                        close();
                      }}
                    >
                      <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-gray-50">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={user.avatar}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <a href="#" className="focus:outline-none">
                            <p className="text-lg font-medium text-gray-900">
                              {user.name}
                            </p>
                          </a>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
