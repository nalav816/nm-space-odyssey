
export interface Shop {
  astronauts: any[],
  rockets: any[]
}

export interface Player {
  username: string,
  netWorth: number,
  astronauts: any[],
  astronautRoomCount: number,
  roomSpaceCap: number,
  rocketPlotCount: number,
  shop: Shop
}

export const DEFAULT_PLAYER_DATA: Player =
{
  username: 'nadden',
  netWorth: 300,
  astronauts: [],
  astronautRoomCount: 2,
  roomSpaceCap: 5,
  rocketPlotCount: 1,
  shop: {
    astronauts: [
      {
        name: "Scrub",
        rating: 1,
        price: 100,
        iconUrl: "/sprites/scrubIcon.png",
        modelUrl: "/sprites/scrub.png",
        isLocked: false,
        isEngineer: true,
        isScientist: true,
        isPilot: true,
        dollarsPerSecond: 1
      },
      {
        name: "Ace",
        rating: 3,
        price: 1000,
        iconUrl: "/sprites/aceIcon.png",
        modelUrl: "/sprites/ace.png",
        isLocked: false,
        isEngineer: false,
        isScientist: false,
        isPilot: true,
        dollarsPerSecond: 0
      },
    ],
    rockets: []
  }
}

export async function savePlayerData(player: Player) {
  try {
    await window.data.savePlayerData(player)
  } catch (e) {
    throw e
  }
}

export async function loadPlayerData() {
  try {
    const player = await window.data.loadPlayerData()
    return player
  } catch (e) {
    throw e
  }
}