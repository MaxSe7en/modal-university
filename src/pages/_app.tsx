import Modal from "@/components/Modal/Modal";
import { FormProvider } from "@/contexts/FormContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Modal /> */}
      <FormProvider>
        <Component {...pageProps} />
      </FormProvider>
    </>
  );
}
