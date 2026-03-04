import { BoostStock } from "@/data/boostMockData";

interface BoostCardProps {
  stock: BoostStock;
}

const safe = (val: unknown, decimals = 1): string => {
  const num = parseFloat(val as string);
  if (val === undefined || val === null || isNaN(num)) return "--";
  return num.toFixed(decimals);
};

const safeNum = (val: unknown, fallback = 0): number => {
  const num = parseFloat(val as string);
  return isNaN(num) ? fallback : num;
};

function getBoostColor(score: number): string {
  if (score >= 3.5) return "#00C853";
  if (score >= 2.5) return "#FFD600";
  return "#F44336";
}

function getBoostLabel(score: number): { text: string; bg: string; color: string } {
  if (score >= 3.5) return { text: "STRONG",   bg: "rgba(0,200,83,0.2)",   color: "#00C853" };
  if (score >= 2.5) return { text: "MODERATE", bg: "rgba(255,214,0,0.2)",  color: "#FFD600" };
  return              { text: "WEAK",     bg: "rgba(102,102,102,0.3)", color: "#888888" };
}

function getVwapColor(pct: number): string {
  if (pct > 0.5) return "#00C853";
  if (pct < -0.5) return "#F44336";
  return "#888888";
}

export function BoostCard({ stock }: BoostCardProps) {
  const boostColor = getBoostColor(safeNum(stock.boost_score));
  const badge = getBoostLabel(safeNum(stock.boost_score));
  const isPositive = safeNum(stock.change_pct) >= 0;

  let highLowDisplay: { icon: string; color: string } | null = null;
  if (stock.near_20d_high) {
    highLowDisplay = { icon: "✅", color: "#00C853" };
  } else if (stock.near_20d_low) {
    highLowDisplay = { icon: "📉", color: "#F44336" };
  }

  return (
    <div
      style={{
        backgroundColor: "#111111",
        borderRadius: "8px",
        borderLeft: `4px solid ${boostColor}`,
        padding: "14px",
        cursor: "pointer",
        transition: "background-color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#1a1a1a";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "#111111";
      }}
    >
      {/* Row 1 — Symbol + Badges */}
      <div className="flex items-center justify-between gap-2">
        <span style={{ color: "#ffffff", fontWeight: "bold", fontSize: "15px" }}>
          {stock.symbol}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {stock.fo && (
            <span
              style={{
                backgroundColor: "#1565C0",
                color: "#ffffff",
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "9999px",
              }}
            >
              F&amp;O
            </span>
          )}
          <span
            style={{
              backgroundColor: "#2a2a2a",
              color: "#888888",
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "9999px",
            }}
          >
            {stock.sector}
          </span>
        </div>
      </div>

      {/* Row 2 — LTP + Change */}
      <div className="flex items-center justify-between mt-2">
        <span style={{ color: "#888888", fontSize: "13px" }}>
          ₹{safeNum(stock.ltp).toLocaleString("en-IN")}
        </span>
        <span
          style={{
            color: isPositive ? "#00C853" : "#F44336",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}
          {safe(stock.change_pct, 2)}%
        </span>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #222222", margin: "12px 0" }} />

      {/* Row 3 — Boost Score */}
      <div className="flex items-center justify-between">
        <span
          style={{
            color: "#555555",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          BOOST SCORE
        </span>
        <span
          style={{
            color: boostColor,
            fontWeight: "bold",
            fontSize: "22px",
            lineHeight: 1,
          }}
        >
          {safe(stock.boost_score, 1)}
        </span>
      </div>

      {/* Row 4 — Progress Bar */}
      <div
        style={{
          backgroundColor: "#222222",
          height: "6px",
          borderRadius: "9999px",
          marginTop: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: boostColor,
            height: "100%",
            borderRadius: "9999px",
            width: `${(safeNum(stock.boost_score) / 5) * 100}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Row 5 — STRONG/MODERATE/WEAK Badge */}
      <div style={{ marginTop: "10px" }}>
        <span
          style={{
            backgroundColor: badge.bg,
            color: badge.color,
            fontSize: "11px",
            fontWeight: "bold",
            padding: "3px 10px",
            borderRadius: "4px",
            letterSpacing: "0.05em",
          }}
        >
          {badge.text}
        </span>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #222222", margin: "12px 0" }} />

      {/* Row 6 — Stats Grid 2x2 */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {/* Vol Surge */}
        <div>
          <div style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}>
            Vol Surge
          </div>
          <div
            style={{
              color:
                safeNum(stock.vol_surge) > 2 ? "#FF6B00" : safeNum(stock.vol_surge) > 1.5 ? "#FFD600" : "#ffffff",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {safe(stock.vol_surge, 1)}x
          </div>
        </div>

        {/* Range */}
        <div>
          <div style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}>
            Range
          </div>
          <div
            style={{
              color:
                safeNum(stock.range_ratio) > 2 ? "#00C853" : safeNum(stock.range_ratio) > 1.5 ? "#FFD600" : "#888888",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {safe(stock.range_ratio, 1)}x
          </div>
        </div>

        {/* 20D High/Low */}
        <div>
          <div style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}>
            20D High
          </div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: highLowDisplay?.color ?? "#555555" }}>
            {highLowDisplay ? highLowDisplay.icon : "--"}
          </div>
        </div>

        {/* VWAP */}
        <div>
          <div style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}>
            VWAP
          </div>
          <div
            style={{
              color: getVwapColor(safeNum(stock.vwap_pct)),
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {safeNum(stock.vwap_pct) >= 0 ? "+" : ""}
            {safe(stock.vwap_pct, 1)}%
          </div>
        </div>
      </div>
    </div>
  );
}
