import { asyncHandler } from "./hooks";
import { StatsData } from "./types";

export const server_link: string = "https://histl.onrender.com";
export const analytics_router: string = "/api/analytics";

export const fetchTopShrinked = asyncHandler(async () => {
  const shrinks_data: Response = await fetch(`${server_link}${analytics_router}/most-redirected/4`);
  const shrinks_array: StatsData[] = await shrinks_data.json();
  return shrinks_array
});

export const fetchTopVisited = asyncHandler(async () => {
  const visited_data: Response = await fetch(`${server_link}${analytics_router}/most-visited/4`);
  const visited_array: StatsData[] = await visited_data.json();
  return visited_array
});

export const fetchLastVisited = asyncHandler(async () => {
  const last_visited_data: Response = await fetch(`${server_link}${analytics_router}/last-visited/4`);
  const last_visited_array: StatsData[] = await last_visited_data.json();
  return last_visited_array
});