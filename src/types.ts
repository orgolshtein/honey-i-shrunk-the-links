export interface LinkData {
  _id: string;
  output: string;
}

export interface StatsData {
  site: string;
  counter: number;
  visit_date?: string
}

export interface PersonalLinkData {
  target: string;
  link: string;
  visits: number;
  last_visit: string;
}