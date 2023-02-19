import { Switch } from "@headlessui/react";
import { useState } from "react";

import ConfirmDeleteDialog from "./confirmDeleteDialog";

type ResolveSwitchProps = {
  deleteCommentsAndMarker: () => void;
};

export default function ResolveSwitch({
  deleteCommentsAndMarker,
}: ResolveSwitchProps) {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? "bg-blue-600" : "bg-gray-200"} 
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
        >
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-5" : "translate-x-0"} 
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
          `}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <span className="text-md font-medium text-gray-900">Resolve</span>
        </Switch.Label>
      </Switch.Group>
      <ConfirmDeleteDialog
        deleteCommentsAndMarker={deleteCommentsAndMarker}
        open={enabled}
        setOpen={setEnabled}
      />
    </>
  );
}
