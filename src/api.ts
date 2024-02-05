import { LinkData, PersonalLinkData, StatsData } from "./types";

export const server_link: string = "https://histl.onrender.com";
export const analytics_router: string = "/api/analytics";

export const postNewShrinked = async (ref: React.RefObject<HTMLInputElement>): Promise<LinkData> => {
  const new_data: Response = await fetch(
    `${server_link}/api/create`, 
    { method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({target: (ref.current as HTMLInputElement).value.toString()})
    }
  );
  const new_shrinked_object: LinkData = await new_data.json();
  return new_shrinked_object
};

export const fetchTopShrinked = async (): Promise<StatsData[]> => {
  const shrinks_data: Response = await fetch(`${server_link}${analytics_router}/most-redirected/4`);
  const shrinks_array: StatsData[] = await shrinks_data.json();
  return shrinks_array
};

export const fetchTopVisited = async (): Promise<StatsData[]> => {
  const visited_data: Response = await fetch(`${server_link}${analytics_router}/most-visited/4`);
  const visited_array: StatsData[] = await visited_data.json();
  return visited_array
};

export const fetchLastVisited = async (): Promise<StatsData[]> => {
  const last_visited_data: Response = await fetch(`${server_link}${analytics_router}/last-visited/4`);
  const last_visited_array: StatsData[] = await last_visited_data.json();
  return last_visited_array
};

export const fetchSelectedStats = async (ref: React.RefObject<HTMLInputElement>): Promise<PersonalLinkData> => {
 const selected_data: Response = await fetch(
    `${server_link}${analytics_router}`, 
    { method: "POST", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({shrinked: (ref.current as HTMLInputElement).value.toString()})
    }
  );
  const selected_stats_object: PersonalLinkData = await selected_data.json();
  return selected_stats_object
};

export const patchShrinked = async (link: LinkData, edited_shrink: string): Promise<LinkData> => {
  const edited_data: Response = await fetch(
    `${server_link}/api/edit/${link._id}`, 
    { method: "PATCH", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({new_link: edited_shrink})
    }
  );
  const edited_link_object: LinkData = await edited_data.json();
  return edited_link_object
};