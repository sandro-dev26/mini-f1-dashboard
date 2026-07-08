import { useState, useEffect } from "react";
import { getF1Data, getF1Drivers } from "./fetch";
import type { DriverData, SpecDriverData } from "./fetch";

export function App() {
  const sunIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );

  const moonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
  const [isDark, setIsDark] = useState(true);
  function changeTheme() {
    setIsDark(!isDark);
  }
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  const [driverData, setDriverData] = useState<DriverData[] | null>(null);
  const [specDriversData, setSpecDriversData] = useState<
    SpecDriverData[] | null
  >(null);
  useEffect(() => {
    async function passDriverData() {
      const responseDataOne = await getF1Data();
      const responseDataTwo = await getF1Drivers();

      setDriverData(responseDataOne);
      setSpecDriversData(responseDataTwo);
    }

    passDriverData();
  }, []);
  return (
    <div
      className={`flex flex-col flex-start ${isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-black"} min-h-screen p-6`}
    >
      <button
        onClick={changeTheme}
        className={`flex justify-center items-center ${isDark ? "bg-slate-800 hover:bg-slate-700 active:bg-slate-950" : "bg-slate-200 hover:bg-slate-300 active:bg-slate-100"} w-10 h-10 rounded-full transition-all duration-200 hover:scale-[1.05] active:scale-[0.95]`}
      >
        {isDark ? moonIcon : sunIcon}
      </button>
      <h1 className="text-4xl text-red-500 font-semibold mt-20 w-76 hover:text-red-700">
        Mini F1 Dashboard
      </h1>
      <p
        className={`text-sm ${isDark ? "text-neutral-300" : "text-neutral-600"} w-76 mb-12`}
      >
        This Is{" "}
        <span className="font-bold text-red-500 hover:text-red-700">
          Mini Dashboard For F1 Drivers,{" "}
        </span>
        Where You Can View Driver Cards With Their Data
      </p>
      <div className="flex flex-col mt-4">
        <span className="text-3xl">Drivers</span>
        <span
          className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"} mb-4 hover:text-neutral-500`}
        >
          <span className="flex justify-center items-center mr-1 border-1 w-4 h-4 rounded-full text-[0.7rem] inline-flex">
            !
          </span>
          Data Is From 2025 Abu Dhabi GP
        </span>

        <ul className="list-none overflow-y-scroll h-116 py-4 scroll-fade-mask">
          {driverData
            ?.filter((driver) =>
              specDriversData?.some(
                (p) => p.driver_number === driver.driver_number,
              ),
            )
            .map((driver) => {
              const matchingProfile = specDriversData?.find(
                (p) => p.driver_number === driver.driver_number,
              );

              const teamHex = matchingProfile?.team_colour
                ? matchingProfile.team_colour
                : "ef4444";
              return (
                <li key={driver.driver_number}>
                  <div
                    className={`flex flex-col justify-start text-white ${isDark ? "bg-red-800 border-red-500" : "bg-red-500 border-red-600"} border-2 m-4 w-64 p-2 rounded-xl  transition-all duration-200 hover:scale-[1.05]`}
                  >
                    <span className="">
                      Number:{" "}
                      <span
                        className={`font-bold text-xl ${isDark ? "text-shadow-none" : "text-shadow-lg text-shadow-slate-800/15"} transition-all duration-200 hover:text-2xl`}
                        style={{ color: `#${teamHex}` }}
                      >{`${driver.driver_number}`}</span>
                    </span>
                    <span className="">
                      Name: {matchingProfile?.first_name}
                      <span
                        className={`font-bold text-xl ${isDark ? "text-shadow-none" : "text-shadow-lg text-shadow-slate-800/15"} transition-all duration-200 hover:text-2xl`}
                        style={{ color: `#${teamHex}` }}
                      >{` ${matchingProfile?.last_name}`}</span>
                    </span>
                    <span className="">
                      Team:{" "}
                      <span
                        className={`font-bold text-xl ${isDark ? "text-shadow-none" : "text-shadow-lg text-shadow-slate-800/15"} transition-all duration-200 hover:text-2xl`}
                        style={{ color: `#${teamHex}` }}
                      >{` ${matchingProfile?.team_name}`}</span>
                    </span>
                    <span className="">{`Points: ${driver.points_current}`}</span>
                    <span className="">{`Position: ${driver.position_current}`}</span>
                    {matchingProfile?.headshot_url ? (
                      <img
                        className="w-16 m-2 border-1 rounded-md transition-all duration-200 hover:scale-[1.05]"
                        style={{
                          background: `#${teamHex}`,
                        }}
                        src={matchingProfile?.headshot_url}
                      ></img>
                    ) : (
                      <span className="font-light mt-4 text-neutral-100 hover:text-neutral-300">
                        Picture Unavailable
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <span
        className={`text-sm ${isDark ? "text-neutral-300 hover:text-neutral-400" : "text-neutral-600 hover:text-neutral-500"} mt-8 mb-2`}
      >
        <span className="flex justify-center items-center mr-1 border-1 w-4 h-4 rounded-full text-[0.7rem] inline-flex">
          !
        </span>
        Disclaimer: This website is an unofficial, non-commercial fan project
        built strictly for educational and portfolio demonstration purposes. It
        is not affiliated with, endorsed by, or associated with the Formula 1
        companies, FIA, or any specific racing team. All product names, logos,
        and brands are property of their respective owners.
      </span>
    </div>
  );
}

export default App;
