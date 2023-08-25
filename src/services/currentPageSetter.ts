import { Dispatch, SetStateAction } from "react";

export function currentPageSetter(
  setCurrentPage: Dispatch<SetStateAction<number>>
) {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      setCurrentPage((prevState) => prevState + 1);
    }
  });

  intersectionObserver.observe(document.querySelector("#pageBottom")!);
  return () => intersectionObserver.disconnect();
}
