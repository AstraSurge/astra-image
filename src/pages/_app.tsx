import { type AppType } from "next/dist/shared/lib/utils";
import { RxGithubLogo } from "react-icons/rx";
import { ImMail4 } from "react-icons/im";
import Logo from "~/components/common/Logo";

import "~/styles/globals.css";
import Link from "next/link";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl  font-extrabold tracking-tight text-blue-950">
          <Link href={"/"}>Astra Image</Link>
        </h1>
        <a
          target="_blank"
          href="https://github.com/AstraSurge/astra-image"
          aria-label="Go to Astra Image's Github"
        >
          <RxGithubLogo className="text-xl text-blue-950" />
        </a>
      </header>
      <Component {...pageProps} />
      <footer className="flex flex-col items-center gap-2 px-4 py-8">
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
