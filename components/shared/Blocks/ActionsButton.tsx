import React from "react";
import Link from "next/link";
import { ButtonSize, ButtonVariant } from "./buttonEnum";

type ActionButton = {
  label: string;
  url: string;
  variant: ButtonVariant;
  size: ButtonSize;
};

type ActionsProps = {
  actions: ActionButton[];
  className?: string;
};

const Actions = ({ actions, className }: ActionsProps) => {
  return (
    <div className="grid">
      {actions &&
        actions.map((action, index) =>
          action.url ? (
            <div key={index}>
              <Link
                href={action.url}
                className={`whitespace-nowrap inline-flex items-center justify-center rounded-lg ${className} ${action.variant} ${action.size} hover:opacity-80 transition-opacity duration-200  font-semibold`}
              >
                {action.label}
              </Link>
            </div>
          ) : null
        )}
    </div>
  );
};

export default Actions;
