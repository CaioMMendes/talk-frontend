"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface ITextExpander {
  expanded?: boolean;
  children: string;
}

export default function TextExpander({
  expanded = false,
  children,
}: ITextExpander) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [textHeight, setTextHeight] = useState(0);
  const textRef = useRef(null);
  const handleIsExpanded = () => {
    setIsExpanded((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (!textRef.current) return;
    setTextHeight((textRef.current as HTMLElement).clientHeight);
  }, []);

  return (
    <div className="flex w-full flex-col ">
      <p
        ref={textRef}
        className={`${!isExpanded ? "line-clamp-4 " : "!w-full"} break-all text-justify `}
      >
        {children}
      </p>
      {textHeight >= 96 && (
        <button
          onClick={handleIsExpanded}
          className={`flex text-sm text-primary-1 `}
        >
          {isExpanded ? "Mostrar menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
}
