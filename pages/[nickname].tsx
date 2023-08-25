import StandardLayout from "@/src/components/commons/standardLayout";
import ProfileComponent from "@/src/components/profile";
import { useState } from "react";

export default function Profile() {
  const [userNickname, setUserNickname] = useState("");
  const [currentUserNickname, setCurrentUserNickname] = useState("");

  return (
    <StandardLayout
      pageTitle={`Nerdolar - ${userNickname}`}
      mainContent={
        <ProfileComponent
          cbNickname={setUserNickname}
          isMyProfile={userNickname === currentUserNickname}
        />
      }
      cbUserNickname={setCurrentUserNickname}
    />
  );
}
