import {
  SignIn,
  SignUp,
  SignInButton,
  SignUpButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  const user = useUser();
  return (
    <header className=" ">
      <nav className="flex list-none flex-row justify-end gap-3">
        <li className="mr-auto">Con Sazon</li>
        <li onClick={() => router.push("/")}>All Recipes</li>
        <li onClick={() => router.push("/dashboard")}>Dashboard</li>
        {!user.isSignedIn && (
          <li>
            <SignInButton />
          </li>
        )}
        {!user.isSignedIn && (
          <li>
            <SignUpButton />
          </li>
        )}
        {!!user.isSignedIn && (
          <li>
            <SignOutButton />
          </li>
        )}
      </nav>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </header>
  );
};
export default Header;
