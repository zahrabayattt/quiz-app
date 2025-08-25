import type { ReactNode } from "react";

const LayoutContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`container mx-auto px-6 ${className}`}>{children}</div>;
};

export default LayoutContainer;
