import Modal from "@/components/Modal/Modal";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { FormProvider } from "@/contexts/FormContext";
import { ToastProvider } from "@/contexts/ToastContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Modal /> */}
      <ToastProvider>
        <AdminAuthProvider>
          <FormProvider>
            <Component {...pageProps} />
          </FormProvider>
        </AdminAuthProvider>
      </ToastProvider>
    </>
  );
}
