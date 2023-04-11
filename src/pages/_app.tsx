import { type AppType } from "next/dist/shared/lib/utils";
import { RxGithubLogo } from "react-icons/rx";
import { ImMail4 } from "react-icons/im";
import Logo from "~/components/common/Logo";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <footer className="flex flex-col items-center gap-2 bg-blue-50 px-4 py-8">
        <span className="inline-flex items-center gap-2 font-light text-slate-950">
          <a
            aria-label="Astra Surge's Website"
            target="_blank"
            href="https://www.astrasurge.com"
          >
            <Logo className="inline-block h-5 w-5 " />
          </a>
          <span>&copy; {new Date().getFullYear()} Astra Surge</span>
        </span>
        <div className="flex gap-2 text-xl text-slate-600">
          <a
            aria-label="Astra Surge's Github"
            href="https://github.com/astrasurge"
            target="_blank"
          >
            <RxGithubLogo />
          </a>
          <a
            aria-label="Mail to Astra Surge"
            href="mailto:contact@astrasurge.com"
          >
            <ImMail4 />
          </a>
        </div>
      </footer>
    </>
  );
};

export default MyApp;
