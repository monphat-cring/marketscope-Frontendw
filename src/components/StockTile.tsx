import { Stock } from "@/data/mockData";
import { getChangeColor, getTileFlex, formatCurrency, getAdaptiveBgColor } from "@/lib/market";
import { useState } from "react";

interface StockTileProps {
  stock: Stock;
  colorRange?: { min: number; max: number };
}

const VWAP_LABELS: Record<string, { label: string; color: string }> = {
  ABOVE:           { label: "▲ ABOVE VWAP",     color: "#00C853" },
  EXTENDED_ABOVE:  { label: "▲▲ EXTENDED ABOVE", color: "#69F0AE" },
  AT_VWAP:         { label: "≈ AT VWAP",         color: "#FFD600" },
  BELOW:           { label: "▼ BELOW VWAP",      color: "#FF1744" },
  EXTENDED_BELOW:  { label: "▼▼ EXTENDED BELOW", color: "#FF5252" },
};

export function StockTile({ stock, colorRange }: StockTileProps) {
  const [hovered, setHovered] = useState(false);
  const flex = getTileFlex(stock.change_pct);

  // 6c: use adaptive color when colorRange is provided, otherwise fall back to fixed classes
  const adaptiveBg = colorRange
    ? getAdaptiveBgColor(stock.change_pct, colorRange.min, colorRange.max)
    : null;
  const bg = colorRange ? undefined : getChangeColor(stock.change_pct);

  // 6a: relative strength badge
  const rs = stock.relative_strength;
  const rsBadge =
    rs !== undefined && rs > 0.5
      ? { label: "▲ NF", color: "#69F0AE", bg: "#003300" }
      : rs !== undefined && rs < -0.5
      ? { label: "▼ NF", color: "#FF5252", bg: "#330000" }
      : null;

  // 6b: vwap position
  const vwapInfo = stock.vwap_position ? VWAP_LABELS[stock.vwap_position] : null;

  return (
    <div
      className={`relative ${bg ?? ""} rounded min-h-[50px] flex flex-col items-center justify-center px-1.5 py-1.5 cursor-pointer transition-all duration-150 hover:brightness-125`}
      style={{ flex, ...(adaptiveBg ? { backgroundColor: adaptiveBg } : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="font-bold text-[11px] md:text-[11px] text-[9px] text-primary-foreground leading-tight truncate max-w-full">
        {stock.symbol}
      </span>
      <span className="text-[10px] md:text-[10px] text-[8px] text-primary-foreground/80 font-medium">
        {stock.change_pct > 0 ? "+" : ""}
        {stock.change_pct.toFixed(1)}%
      </span>

      {/* 6a: Relative Strength badge in top-right corner */}
      {rsBadge && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "2px",
            backgroundColor: rsBadge.bg,
            color: rsBadge.color,
            fontSize: "7px",
            fontWeight: 700,
            padding: "1px 3px",
            borderRadius: "2px",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          {rsBadge.label}
        </span>
      )}

      {/* Hover tooltip with VWAP position (6b) */}
      {hovered && (
        <div className="absolute z-50 bottom-full mb-1 left-1/2 -translate-x-1/2 bg-card border border-border rounded px-3 py-2 text-xs whitespace-nowrap shadow-lg pointer-events-none">
          <span className="text-foreground font-semibold">{stock.symbol}</span>
          <span className="text-muted-foreground"> | LTP: {formatCurrency(stock.ltp)}</span>
          <span className={stock.change_pct >= 0 ? "text-gain-medium" : "text-loss-medium"}>
            {" "}| {stock.change_pct > 0 ? "+" : ""}{stock.change_pct.toFixed(1)}%
          </span>
          {vwapInfo && (
            <span style={{ color: vwapInfo.color }}> | {vwapInfo.label}</span>
          )}
          {rs !== undefined && (
            <span style={{ color: rs > 0.5 ? "#69F0AE" : rs < -0.5 ? "#FF5252" : "#888" }}>
              {" "}| RS: {rs > 0 ? "+" : ""}{rs.toFixed(2)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
