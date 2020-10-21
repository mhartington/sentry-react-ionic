import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/react";


Sentry.init({
  dsn: "https://c7031313ddb8454d8a12f5b4da20895f@o437425.ingest.sentry.io/5439241",
  release: process.env.react_app_sentry_release,
});


const PATH_STRIP_RE = /capacitor:\/\/localhost/;
function normalizeUrl(url: string, pathStripRe: RegExp): string {
  return url.replace(pathStripRe, "");
}


Sentry.addGlobalEventProcessor((data: any) => {
  if (data.culprit) {
    data.culprit = normalizeUrl(data.culprit, PATH_STRIP_RE);
  }
  const stacktrace =
    data.stacktrace ||
    (data.exception &&
      data.exception.values &&
      data.exception.values[0].stacktrace);
  if (stacktrace) {
    stacktrace.frames.forEach((frame: any) => {
      if (
        frame.filename !== "[native code]" &&
        frame.filename !== "<anonymous>"
      ) {
        frame.filename = normalizeUrl(frame.filename, PATH_STRIP_RE);
      }
    });
  }
  return data;
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
