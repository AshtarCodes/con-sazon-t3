import {
  SignIn,
  SignUp,
  SignInButton,
  SignUpButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
const Header = () => {
  const user = useUser();
  return (
    <header className=" ">
      <nav className="flex list-none flex-row justify-end gap-3">
        <li className="mr-auto">Con Sazon</li>
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
