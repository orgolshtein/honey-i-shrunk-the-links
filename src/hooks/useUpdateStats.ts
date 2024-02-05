import { fetchTopShrinked, fetchTopVisited, fetchLastVisited, fetchSelectedStats } from "../api";
import { PersonalLinkData, StatsData } from "../types";
import asyncHandler from "./useAsyncHandler";

const updateStats = asyncHandler(async (
    stats_setters: {
        set_top_shrinks: (top_shrinks: StatsData[]) => void,
        set_top_visited: (top_visited: StatsData[]) => void,
        set_last_visited: (last_visited: StatsData[]) => void,
        set_selected: (selected: PersonalLinkData) => void
    }, input_ref?: React.RefObject<HTMLInputElement>
): Promise<void> => {
    const shrinks_array: StatsData[] = await fetchTopShrinked();
    stats_setters.set_top_shrinks(shrinks_array);
    const visited_array: StatsData[] = await fetchTopVisited();
    stats_setters.set_top_visited(visited_array)
    const last_visited: StatsData[] = await fetchLastVisited();
    stats_setters.set_last_visited(last_visited);
    if (input_ref){
        const selected_link: PersonalLinkData = await fetchSelectedStats(input_ref);
        stats_setters.set_selected(selected_link);
    }
});

export default updateStats;