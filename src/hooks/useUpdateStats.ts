import { Dispatch, SetStateAction } from "react";
import { fetchTopShrinked, fetchTopVisited, fetchLastVisited, fetchSelectedStats } from "../api";
import { PersonalLinkData, StatsData } from "../types";
import asyncHandler from "./useAsyncHandler";

export const updateStats = asyncHandler(async (stats_setter: {
    top_shrinks: Dispatch<SetStateAction<StatsData[]>>,
    top_visited: Dispatch<SetStateAction<StatsData[]>>,
    last_visited: Dispatch<SetStateAction<StatsData[]>>,
    selected: Dispatch<SetStateAction<PersonalLinkData>>
}, ref?: React.RefObject<HTMLInputElement>) => {
    const shrinks_array: StatsData[] = await fetchTopShrinked();
    stats_setter.top_shrinks(shrinks_array);
    const visited_array: StatsData[] = await fetchTopVisited();
    stats_setter.top_visited(visited_array)
    const last_visited: StatsData[] = await fetchLastVisited();
    stats_setter.last_visited(last_visited);
    if (ref){
        const selected_link: PersonalLinkData = await fetchSelectedStats(ref);
        stats_setter.selected(selected_link);
    }
});