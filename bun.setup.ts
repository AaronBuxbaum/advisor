// Setup file for Bun tests
import "@testing-library/jest-dom";
import { Window } from "happy-dom";

// Set up happy-dom for React component testing
const window = new Window({
  url: "http://localhost:3000",
  settings: {
    disableJavaScriptFileLoading: true,
    disableCSSFileLoading: true,
    disableIframePageLoading: true,
  }
});

global.window = window as any;
global.document = window.document as any;
global.navigator = window.navigator as any;
global.HTMLElement = window.HTMLElement as any;
global.Element = window.Element as any;
