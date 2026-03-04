export interface RFactorStock {
  symbol: string;
  sector: string;
  ltp: number;
  change_pct: number;
  volume_ratio: number;
  rfactor: number;
  rsi: number;
  mfi: number;
  relative_strength: number;
  fo: boolean;
  delivery_pct?: number;
  bid_ask_ratio?: number;
  oi_change_pct?: number;
}

export interface RFactorData {
  stocks: RFactorStock[];
  last_updated: string;
}

export const rfactorMockData: RFactorData = {
  stocks: [
    { symbol: "TIINDIA", sector: "AUTO", ltp: 2849, change_pct: 3.47, volume_ratio: 2.1, rfactor: 78.5, rsi: 64.2, mfi: 61.8, relative_strength: 5.67, fo: true },
    { symbol: "MUTHOOTFIN", sector: "BANKING & FINANCE", ltp: 1840, change_pct: 3.5, volume_ratio: 3.1, rfactor: 74.2, rsi: 66.1, mfi: 63.4, relative_strength: 4.9, fo: true },
    { symbol: "KEI", sector: "INFRA", ltp: 3800, change_pct: 2.5, volume_ratio: 3.4, rfactor: 70.1, rsi: 63.5, mfi: 61.0, relative_strength: 4.3, fo: true },
    { symbol: "BEL", sector: "PSU & DEFENCE", ltp: 290, change_pct: 2.1, volume_ratio: 2.6, rfactor: 66.7, rsi: 60.3, mfi: 57.4, relative_strength: 3.6, fo: true },
    { symbol: "NATIONALUM", sector: "METALS", ltp: 363, change_pct: 2.4, volume_ratio: 2.8, rfactor: 71.8, rsi: 61.5, mfi: 60.2, relative_strength: 3.8, fo: true },
    { symbol: "MCX", sector: "BANKING & FINANCE", ltp: 6200, change_pct: 2.6, volume_ratio: 2.3, rfactor: 68.9, rsi: 62.1, mfi: 59.8, relative_strength: 4.1, fo: true },
    { symbol: "PERSISTENT", sector: "IT", ltp: 5200, change_pct: -1.1, volume_ratio: 2.5, rfactor: 65.3, rsi: 58.3, mfi: 55.1, relative_strength: 2.1, fo: true },
    { symbol: "CLEAN", sector: "CHEMICALS", ltp: 1850, change_pct: 1.0, volume_ratio: 2.2, rfactor: 58.6, rsi: 56.4, mfi: 53.9, relative_strength: 2.5, fo: false },
    { symbol: "HINDZINC", sector: "METALS", ltp: 490, change_pct: 2.3, volume_ratio: 1.8, rfactor: 59.4, rsi: 57.2, mfi: 54.6, relative_strength: 3.2, fo: true },
    { symbol: "LAURUSLABS", sector: "PHARMA", ltp: 580, change_pct: -0.8, volume_ratio: 1.9, rfactor: 61.2, rsi: 55.4, mfi: 52.3, relative_strength: 1.4, fo: true },
    { symbol: "SUNPHARMA", sector: "PHARMA", ltp: 1720, change_pct: 1.0, volume_ratio: 1.6, rfactor: 55.1, rsi: 53.8, mfi: 51.2, relative_strength: 2.0, fo: true },
    { symbol: "HAL", sector: "PSU & DEFENCE", ltp: 4200, change_pct: 1.1, volume_ratio: 1.5, rfactor: 54.3, rsi: 54.0, mfi: 51.8, relative_strength: 2.2, fo: true },
    { symbol: "ONGC", sector: "ENERGY", ltp: 260, change_pct: 0.9, volume_ratio: 1.7, rfactor: 52.8, rsi: 52.1, mfi: 50.3, relative_strength: 1.5, fo: true },
    { symbol: "ITC", sector: "FMCG", ltp: 450, change_pct: 0.3, volume_ratio: 1.2, rfactor: 42.3, rsi: 48.2, mfi: 46.5, relative_strength: 0.8, fo: true },
    { symbol: "NAVINFLUOR", sector: "CHEMICALS", ltp: 3400, change_pct: 0.7, volume_ratio: 1.4, rfactor: 44.8, rsi: 49.6, mfi: 47.2, relative_strength: 1.2, fo: false },
    { symbol: "IRCTC", sector: "INFRA", ltp: 890, change_pct: 0.1, volume_ratio: 0.9, rfactor: 32.5, rsi: 44.3, mfi: 42.1, relative_strength: 0.3, fo: true },
    { symbol: "TATASTEEL", sector: "METALS", ltp: 150, change_pct: -0.6, volume_ratio: 1.1, rfactor: 28.4, rsi: 41.2, mfi: 39.8, relative_strength: -1.2, fo: true },
    { symbol: "RBLBANK", sector: "BANKING & FINANCE", ltp: 240, change_pct: -2.0, volume_ratio: 3.5, rfactor: 22.1, rsi: 35.4, mfi: 33.2, relative_strength: -3.5, fo: true },
    { symbol: "SWIGGY", sector: "FMCG", ltp: 420, change_pct: -4.2, volume_ratio: 4.1, rfactor: 15.3, rsi: 28.6, mfi: 25.4, relative_strength: -6.7, fo: false },
    { symbol: "RVNL", sector: "REALTY", ltp: 380, change_pct: -5.1, volume_ratio: 3.8, rfactor: 10.2, rsi: 22.3, mfi: 19.8, relative_strength: -7.8, fo: true },
  ],
  last_updated: "14:35:22"
};
