import { useRef, useEffect } from "react";

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideClick({
  children,
  action,
}: {
  children: React.ReactNode;
  action: any;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        action();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return <div ref={wrapperRef}>{children}</div>;
}
