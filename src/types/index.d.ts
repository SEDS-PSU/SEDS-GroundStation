export {};

declare global {
  interface Window {
    showOpenFilePicker: any;
    showSaveFilePicker: any;
    gtag: (...args: any[]) => void;
  }
}