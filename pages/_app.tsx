import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale({
  locale: "pt-BR",
  mini: {
    second: "{0}s",
    minute: "{0}m",
    hour: "{0}h",
    day: "{0}d",
    week: "{0}s",
    month: "{0}mes",
    year: "{0}ano",
  },
  short: {
    second: "{0} seg",
    minute: "{0} min",
    hour: "{0} hora(s)",
    day: "{0} dia(s)",
    week: "{0} sem",
    month: "{0} mes",
    year: "{0} ano",
  },
  long: {
    second: "{0} segundo(s) atras",
    minute: "{0} minutos(s) atras",
    hour: "{0} hora(s) atras",
    day: "{0} dia(s) atras",
    week: "{0} semana(s) atras",
    month: "{0} mes(es) atras",
    year: "{0} ano(s) atras",
  },
  narrow: {
    second: "{0}s",
    minute: "{0}m",
    hour: "{0}h",
    day: "{0}d",
    week: "{0}s",
    month: "{0}mes",
    year: "{0}ano",
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
