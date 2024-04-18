export interface LinkData {
  _id: string;
  output: string;
};


export interface StatsData {
  site: string;
  counter: number;
  visit_date?: string
};
export interface PersonalLinkData {
  target: string;
  link: string;
  visits: number;
  last_visit: string;
};

export interface StatsObject {
    top_shrinked: StatsData[];
    top_visited: StatsData[];
    last_visited: StatsData[];
    selected_shrinked: PersonalLinkData;
};