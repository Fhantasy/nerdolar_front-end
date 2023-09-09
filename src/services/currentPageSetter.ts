import { Dispatch, SetStateAction } from "react";

export function currentPageSetter(
  setCurrentPage: Dispatch<SetStateAction<number>>,
  bottomId?: string
) {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      setCurrentPage((prevState) => {
        return prevState + 1;
      });
    }
  });

  intersectionObserver.observe(
    document.querySelector(bottomId || "#pageBottom")!
  );
  return () => intersectionObserver.disconnect();
}
