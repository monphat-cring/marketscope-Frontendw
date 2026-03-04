// Mock data for MorningWatchlist – used as a fallback when the backend at
// localhost:8000 is unavailable (e.g. during local front-end development).

export interface WatchlistRow {
  symbol: string;
  sector: string;
  bias: "LONG" | "SHORT" | "WAIT";
  orb_high: number | null;
  orb_low: number | null;
  current_price: number | null;
  prev_day_high: number | null;
  volume_ratio: number | null;
  score: number | null;
  action: "BUY" | "SELL" | null;
}

export interface TopSector {
  name: string;
  bias: "LONG" | "SHORT" | "WAIT";
  change_pct: number;
}

export interface MorningWatchlistData {
  watchlist: WatchlistRow[];
  top_sectors: TopSector[];
}

export const morningWatchlistMockData: MorningWatchlistData = {
  top_sectors: [
    { name: "IT", bias: "LONG", change_pct: 1.42 },
    { name: "AUTO", bias: "LONG", change_pct: 0.87 },
    { name: "PHARMA", bias: "SHORT", change_pct: -0.95 },
  ],
  watchlist: [
    {
      symbol: "INFY",
      sector: "IT",
      bias: "LONG",
      orb_high: 1845.5,
      orb_low: 1822.0,
      current_price: 1862.3,
      prev_day_high: 1850.0,
      volume_ratio: 2.4,
      score: 7,
      action: "BUY",
    },
    {
      symbol: "TCS",
      sector: "IT",
      bias: "LONG",
      orb_high: 4210.0,
      orb_low: 4175.5,
      current_price: 4195.0,
      prev_day_high: 4220.0,
      volume_ratio: 1.8,
      score: 6,
      action: null,
    },
    {
      symbol: "HCLTECH",
      sector: "IT",
      bias: "WAIT",
      orb_high: 1560.0,
      orb_low: 1540.0,
      current_price: 1550.5,
      prev_day_high: 1575.0,
      volume_ratio: 1.1,
      score: 4,
      action: null,
    },
    {
      symbol: "MARUTI",
      sector: "AUTO",
      bias: "LONG",
      orb_high: 11350.0,
      orb_low: 11200.0,
      current_price: 11410.0,
      prev_day_high: 11380.0,
      volume_ratio: 2.1,
      score: 7,
      action: "BUY",
    },
    {
      symbol: "M&M",
      sector: "AUTO",
      bias: "LONG",
      orb_high: 2985.0,
      orb_low: 2940.0,
      current_price: 2970.0,
      prev_day_high: 2990.0,
      volume_ratio: 1.6,
      score: 5,
      action: null,
    },
    {
      symbol: "TATAMOTORS",
      sector: "AUTO",
      bias: "WAIT",
      orb_high: 795.0,
      orb_low: 778.0,
      current_price: 785.5,
      prev_day_high: 800.0,
      volume_ratio: 1.3,
      score: 3,
      action: null,
    },
    {
      symbol: "DRREDDY",
      sector: "PHARMA",
      bias: "SHORT",
      orb_high: 1252.0,
      orb_low: 1228.0,
      current_price: 1220.0,
      prev_day_high: 1260.0,
      volume_ratio: 2.2,
      score: 6,
      action: "SELL",
    },
    {
      symbol: "SUNPHARMA",
      sector: "PHARMA",
      bias: "SHORT",
      orb_high: 1695.0,
      orb_low: 1672.0,
      current_price: 1668.0,
      prev_day_high: 1700.0,
      volume_ratio: 1.9,
      score: 5,
      action: "SELL",
    },
    {
      symbol: "WIPRO",
      sector: "IT",
      bias: "WAIT",
      orb_high: 480.0,
      orb_low: 470.5,
      current_price: 475.0,
      prev_day_high: 485.0,
      volume_ratio: 0.9,
      score: 2,
      action: null,
    },
    {
      symbol: "BAJAJ-AUTO",
      sector: "AUTO",
      bias: "LONG",
      orb_high: 9020.0,
      orb_low: 8940.0,
      current_price: 9045.0,
      prev_day_high: 9000.0,
      volume_ratio: 1.7,
      score: 6,
      action: "BUY",
    },
  ],
};
