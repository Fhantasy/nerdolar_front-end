import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import TimeAgo from "javascript-time-ago";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TimeAgo.addDefaultLocale({
      locale: "pt-BR",
      now: {
        now: {
          current: "agora",
          future: "em instantes",
          past: "em instantes atras",
        },
      },
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
        second: { past: "{0} segundo(s) atras", future: "em {0} segundo(s)" },
        minute: { past: "{0} minuto(s) atras", future: "em {0} minuto(s)" },
        hour: { past: "{0} hora(s) atras", future: "em {0} hora(s)" },
        day: { past: "{0} dia(s) atras", future: "em {0} dia(s)" },
        week: { past: "{0} semana(s) atras", future: "em {0} semana(s)" },
        month: { past: "{0} mes(es) atras", future: "em {0} mes(es)" },
        year: { past: "{0} ano(s) atras", future: "em {0} ano(s)" },
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
  }, []);
  return <Component {...pageProps} />;
}
