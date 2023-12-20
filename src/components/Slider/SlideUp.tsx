"use client"; // this is a client component

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
interface ISlideUp extends React.HTMLAttributes<HTMLDivElement> {
  offset?: string;
  delay?: number;
  forward?: boolean;
}

export default function SlideUp({
  children,
  offset = "0px",
  delay,
  forward,
  className,
}: ISlideUp) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-cubi");
            setShow(true);
          } else {
            if (!forward) {
              entry.target.classList.remove("show-cubi");
              entry.target.classList.add("hidden-cubi");
              setShow(false);
            }
          }
        });
      },
      { rootMargin: offset },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, offset, forward]);
  const styles =
    show && delay
      ? { transitionDelay: `${delay}ms`, animationDelay: `${delay}ms` }
      : {};
  return (
    <div
      ref={ref}
      className={cn("relative w-full opacity-0", className)}
      style={styles}
    >
      {children}
    </div>
  );
}
