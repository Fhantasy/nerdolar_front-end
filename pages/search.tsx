import StandardLayout from "@/src/components/commons/standardLayout";
import SearchComponent from "@/src/components/search";

export default function Search() {
  return (
    <StandardLayout
      mainContent={<SearchComponent />}
      pageTitle="Nerdolar - Pesquisa"
    />
  );
}
