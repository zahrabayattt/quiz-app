import type { ReactNode } from "react";

const LayoutContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};

export default LayoutContainer;
