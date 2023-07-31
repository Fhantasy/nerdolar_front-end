export function categoryColor(category: string) {
  switch (category) {
    case "Filmes":
      return "#391ee8";
    case "Animes":
      return "#b00deb";
    case "Series":
      return "#519a2a";
    default:
      return "#000000";
  }
}
