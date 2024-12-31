import GetStartedButton from "@/components/get-started";
import Navigation from "@/components/navigation";

export default async function Home() {
  return (
    <>
      <Navigation enableSidebarTrigger={false} />
      <div className="flex flex-col items-center gap-5 justify-center h-[70vh]">
        <h1 className="text-4xl font-bold text-center">Introducing ChatGPT</h1>
        <GetStartedButton />
      </div>
    </>
  );
}
