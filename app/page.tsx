import Shop from "../components/Shop";
import Leaderboard from "../components/Leaderboard";
import Science from "@/components/Science";
import Launchpad from "@/components/Launchpad";
import EmployeesQuarters from "@/components/EmployeesQuarters";
import { getPlayerData } from "@/services/playerService";

export default async function Home() {
  const userName = "Nadden"
  const player = await getPlayerData(userName);
  const cash = player.netWorth;

  return (
    <div className="bg-blue-darkest w-screen h-screen flex justify-center relative text-white font-jaro">
      <img className="h-screen opacity-25 blur-xs w-screen object-cover absolute z-0" src="/imgs/starBackground.jpg"></img>
      <div className="px-12 py-8 flex gap-8 h-screen w-screen max-w-7xl absolute z-10">
        <div className="h-full basis-1/3 flex flex-col">
          <div className="flex flex-col gap-4 pb-24">
            <div className="text-5xl title-glow">
              <span className="text-2xl text-blue-light"> n&m </span>
              Space <br /> <span className="text-blue-lightest"> Odyssey </span> </div>
            <div className="text-blue-lightest text-xl"> {userName}'s Space Station </div>
            <div className="flex gap-4 items-center">
              <img className="h-8 w-8 image-pixelated" src="/sprites/cash.png" />
              <div className=" text-green text-xl"> ${cash} </div>
            </div>

          </div>
          <Shop className="min-w-80 grow w-full" />
        </div>

        <div className="h-full basis-1/3 flex flex-col gap-8">
          <EmployeesQuarters employeeData={player.astronauts} className="min-w-80 basis-1/2 w-full"/>
          <Launchpad className="min-w-80 basis-1/2 w-full"/>
        </div>

        <div className="h-full basis-1/3 flex flex-col gap-8">
          <Science className="min-w-80 basis-1/2 w-full"/>
          <Leaderboard className="min-w-80 basis-1/2 w-full"/>
        </div>
      </div>
    </div>
  );
}
