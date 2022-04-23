export {};

declare global {
  interface Window {
    showOpenFilePicker: any;
    getFile: any;
    showSaveFilePicker
    gtag: (...args: any[]) => void;
  }
}