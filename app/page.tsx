import Shop from "../components/Shop";
import Leaderboard from "../components/Leaderboard";
import Manual from "@/components/Manual";
import Launchpad from "@/components/Launchpad";
import EmployeesQuarters from "@/components/EmployeesQuarters";

export default function Home() {
  const name = "Nadden"
  const cash = 816;


  return (
    <div className="bg-blue-darkest w-screen h-screen flex justify-center relative text-white font-jaro">
      <img className="h-screen opacity-25 blur-xs w-screen object-cover absolute z-0" src="/imgs/starBackground.jpg"></img>
      <div className="px-12 py-8 flex gap-8 h-screen w-screen max-w-7xl absolute z-10">
        <div className="h-full basis-1/3 flex flex-col">
          <div className="flex flex-col gap-4 pb-24">
            <div className="text-5xl title-glow">
              <span className="text-2xl text-blue-light"> n&m </span>
              Space <br /> <span className="text-blue-lightest"> Odyssey </span> </div>
            <div className="text-blue-lightest text-xl"> {name}'s Space Station </div>
            <div className="flex gap-4">
              <img className="h-8 w-8" src="/sprites/cash.png" />
              <div className=" text-green text-xl"> ${cash} </div>
            </div>

          </div>
          <Shop className="grow w-full" />
        </div>

        <div className="h-full basis-1/3 flex flex-col gap-8">
          <EmployeesQuarters className="basis-1/2 w-full"/>
          <Launchpad className="basis-1/2 w-full"/>
        </div>

        <div className="h-full basis-1/3 flex flex-col gap-8">
          <Manual className="basis-1/2 w-full"/>
          <Leaderboard className="basis-1/2 w-full"/>
        </div>
      </div>
    </div>
  );
}
