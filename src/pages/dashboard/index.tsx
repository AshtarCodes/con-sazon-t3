import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import Header from "~/components/Header";
import HtmlHead from "~/components/HtmlHead";

const Dashboard: NextPage = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <>
      <HtmlHead title="Dashboard" />
      <main className="py-2 px-3">
        <Header />
        <div className="my-4 mx-4">
          <h3 className="text-3xl font-bold">Welcome {user.firstName}</h3>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
