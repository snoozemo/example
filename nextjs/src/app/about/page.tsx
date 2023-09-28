// import { P5Text } from "@/components";

import { TestAbout } from "./components";

export const metadata = {
  title: ">> SIGN IN >>",
};
export default function SignInPage() {
  return (
    <div className={`flex h-screen w-screen flex-col space-y-10 overflow-auto`}>
      <TestAbout></TestAbout>
    </div>
  );
}
