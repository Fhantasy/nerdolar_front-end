import StandardLayout from "@/src/components/commons/standardLayout";
import FeedComponent from "@/src/components/home/feedComponent";

export default function Home() {
  return (
    <StandardLayout
      pageTitle="Nerdolar - Home"
      mainContent={<FeedComponent />}
    />
  );
}
