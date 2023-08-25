import StandardLayout from "@/src/components/commons/standardLayout";
import MediaProductComponent from "@/src/components/mediaProduct";
import { useState } from "react";

export default function MediaProduct() {
  const [mediaTitle, setMediaTitle] = useState("");

  return (
    <StandardLayout
      pageTitle={`Nerdolar - ${mediaTitle}`}
      mainContent={<MediaProductComponent cbTitle={setMediaTitle} />}
    />
  );
}
