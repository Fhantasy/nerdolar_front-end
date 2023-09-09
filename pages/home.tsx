import StandardLayout from "@/src/components/commons/standardLayout";
import ToastComponent from "@/src/components/commons/toastComponent";
import FeedComponent from "@/src/components/home/feedComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);

  useEffect(() => {
    if (router.query.posted === "true") {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }
  }, [router.query]);

  return (
    <>
      <StandardLayout
        pageTitle="Nerdolar - Home"
        mainContent={<FeedComponent />}
      />
      <ToastComponent
        color="bg-success"
        isOpen={toastIsOpen}
        message="Postado!"
      />
    </>
  );
}
