import React from "react";
import Link from "next/link";

type ActionButton = {
  label: string;
  url: string;
  variant: "solidRed" | "solidWhite" | "outlinedWhite";
  size: "small" | "medium" | "large";
};

type ActionsProps = {
  actions: ActionButton[];
  className?: string;
};

const VARIANT_STYLES: Record<ActionButton["variant"], string> = {
  solidRed: "bg-[#CC4141] text-white",
  solidWhite: "bg-white text-black border border-black",
  outlinedWhite: "border border-white text-white",
};

const SIZE_STYLES: Record<ActionButton["size"], string> = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

const Actions = ({ actions, className }: ActionsProps) => {
  return (
    <div className="grid">
      {actions &&
        actions.map(
          (action, index) =>
            action.url ? (
              <div key={index}>
                <Link
                  href={action.url}
                  className={`whitespace-nowrap inline-flex items-center justify-center rounded-lg ${className} ${
                    VARIANT_STYLES[action.variant]
                  } ${
                    SIZE_STYLES[action.size]
                  } hover:opacity-80 transition-opacity duration-200 font-helvetica font-semibold`}
                >
                  {action.label}
                </Link>
              </div>
            ) : null // Do not render if `url` is null or undefined
        )}
    </div>
  );
};

export default Actions;
