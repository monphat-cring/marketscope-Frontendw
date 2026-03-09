const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://marketscope-backend1.onrender.com";

export const API_BASE_URL = API_BASE.replace(/\/$/, "");

export function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

import type { SetupStage } from "@/data/mockData";
import type { RFactorData, RFactorStock } from "@/data/rfactorMockData";

export type RFactorSortBy = "rfactor" | "opportunity" | "trend";

const VALID_SETUP_STAGES: SetupStage[] = ["Building", "Triggering", "Extended", "Neutral"];

function asFiniteNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
}

function asOptionalNumber(value: unknown) {
  return asFiniteNumber(value);
}

function asOptionalBoolean(value: unknown) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }

  return undefined;
}

function asOptionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function asSetupStage(value: unknown): SetupStage | undefined {
  return typeof value === "string" && VALID_SETUP_STAGES.includes(value as SetupStage)
    ? (value as SetupStage)
    : undefined;
}

function asTrendPoints(value: unknown) {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const points = value
    .map((point) => asFiniteNumber(point))
    .filter((point): point is number => point !== undefined);

  return points.length > 0 ? points : undefined;
}

function normalizeRFactorStock(value: unknown): RFactorStock | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const stock = value as Record<string, unknown>;
  const symbol = asOptionalString(stock.symbol);
  const sector = asOptionalString(stock.sector) ?? "Unknown";
  const ltp = asFiniteNumber(stock.ltp);
  const changePct = asFiniteNumber(stock.change_pct);
  const volumeRatio = asFiniteNumber(stock.volume_ratio);
  const rfactor = asFiniteNumber(stock.rfactor);
  const rsi = asFiniteNumber(stock.rsi);
  const mfi = asFiniteNumber(stock.mfi);
  const relativeStrength = asFiniteNumber(stock.relative_strength);
  const fo = asOptionalBoolean(stock.fo) ?? false;

  if (
    !symbol ||
    ltp === undefined ||
    changePct === undefined ||
    volumeRatio === undefined ||
    rfactor === undefined ||
    rsi === undefined ||
    mfi === undefined ||
    relativeStrength === undefined
  ) {
    return null;
  }

  return {
    symbol,
    sector,
    ltp,
    change_pct: changePct,
    volume_ratio: volumeRatio,
    rfactor,
    rsi,
    mfi,
    relative_strength: relativeStrength,
    fo,
    delivery_pct: asOptionalNumber(stock.delivery_pct),
    bid_ask_ratio: asOptionalNumber(stock.bid_ask_ratio),
    oi_change_pct: asOptionalNumber(stock.oi_change_pct),
    opportunity_score: asOptionalNumber(stock.opportunity_score),
    rfactor_trend_15m: asOptionalNumber(stock.rfactor_trend_15m),
    rfactor_trend_acceleration: asOptionalNumber(stock.rfactor_trend_acceleration),
    rfactor_trend_points: asTrendPoints(stock.rfactor_trend_points),
    setup_stage: asSetupStage(stock.setup_stage),
  };
}

function getRFactorStocksEnvelope(payload: unknown) {
  if (Array.isArray(payload)) {
    return { stocks: payload, lastUpdated: undefined };
  }

  if (!payload || typeof payload !== "object") {
    return { stocks: [], lastUpdated: undefined };
  }

  const data = payload as Record<string, unknown>;

  if (Array.isArray(data.stocks)) {
    return { stocks: data.stocks, lastUpdated: asOptionalString(data.last_updated) };
  }

  if (Array.isArray(data.data)) {
    return { stocks: data.data, lastUpdated: asOptionalString(data.last_updated) };
  }

  return { stocks: [], lastUpdated: asOptionalString(data.last_updated) };
}

export async function fetchRFactorData(sortBy: RFactorSortBy, signal?: AbortSignal): Promise<RFactorData | null> {
  const response = await fetch(apiUrl(`/rfactor?sort_by=${sortBy}`), { signal });

  if (!response.ok) {
    throw new Error(`Failed to load /rfactor (${response.status})`);
  }

  const payload = await response.json();
  const { stocks, lastUpdated } = getRFactorStocksEnvelope(payload);
  const normalizedStocks = stocks
    .map((stock) => normalizeRFactorStock(stock))
    .filter((stock): stock is RFactorStock => stock !== null);

  if (normalizedStocks.length === 0 && stocks.length > 0) {
    return null;
  }

  return {
    stocks: normalizedStocks,
    last_updated:
      lastUpdated ??
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
  };
}