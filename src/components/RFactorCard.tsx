import { RFactorStock } from "@/data/rfactorMockData";
import { formatInsightNumber, InsightTooltip, StageBadge, TrendIndicator } from "./StockInsightWidgets";

interface RFactorCardProps {
  stock: RFactorStock;
}

function getBorderColor(rfactor: number): string {
  if (rfactor >= 3.5) return "#00C853";
  if (rfactor >= 2.5) return "#FFD600";
  if (rfactor >= 1.5) return "#FF6B00";
  return "#F44336";
}

function getRsiMfiColor(value: number): string {
  if (value > 60) return "#00C853";
  if (value >= 40) return "#FFD600";
  return "#F44336";
}

function getVolumeColor(ratio: number): string {
  if (ratio > 2) return "#FF6B00";
  if (ratio > 1.5) return "#FFD600";
  return "#ffffff";
}

function getDeliveryColor(pct: number): string {
  if (pct > 50) return "#00C853";
  if (pct >= 30) return "#FFD600";
  return "#ffffff";
}

function getBidAskColor(ratio: number): string {
  if (ratio > 1.5) return "#00C853";
  if (ratio < 0.7) return "#F44336";
  return "#ffffff";
}

export function RFactorCard({ stock }: RFactorCardProps) {
  const borderColor = getBorderColor(stock.rfactor);
  const isPositive = stock.change_pct >= 0;
  const progressWidth = `${Math.max(0, Math.min(stock.rfactor <= 5 ? (stock.rfactor / 5) * 100 : stock.rfactor, 100))}%`;
  const trendLabel =
    stock.rfactor_trend_15m === undefined
      ? "Trend --"
      : `Trend ${stock.rfactor_trend_15m > 0 ? "+" : ""}${stock.rfactor_trend_15m.toFixed(2)}`;
  const opportunityLabel = `Opportunity ${formatInsightNumber(stock.opportunity_score, 1)}`;

  return (
    <div
      style={{
        backgroundColor: "#111111",
        borderRadius: "8px",
        borderLeft: `4px solid ${borderColor}`,
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
          <StageBadge stage={stock.setup_stage} />
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
          ₹{stock.ltp.toLocaleString("en-IN")}
        </span>
        <span
          style={{
            color: isPositive ? "#00C853" : "#F44336",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {isPositive ? "▲" : "▼"} {isPositive ? "+" : ""}
          {stock.change_pct.toFixed(2)}%
        </span>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #222222", margin: "12px 0" }} />

      {/* Row 3 — R-Factor Label + Score */}
      <div className="flex items-center justify-between">
        <InsightTooltip
          label="R-Factor"
          description="Current strength / confirmation"
        >
          <span
            style={{
              color: "#555555",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            R-FACTOR
          </span>
        </InsightTooltip>
        <span
          style={{
            color: borderColor,
            fontWeight: "bold",
            fontSize: "22px",
            lineHeight: 1,
          }}
        >
          {stock.rfactor.toFixed(2)}
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
            backgroundColor: borderColor,
            height: "100%",
            borderRadius: "9999px",
            width: progressWidth,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div
          style={{
            backgroundColor: "#151515",
            border: "1px solid #242424",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <InsightTooltip
            label="Trend"
            description="Whether R-Factor is rising in recent candles"
          >
            <div style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}>
              Trend 15m
            </div>
          </InsightTooltip>
          <div className="mt-1.5">
            <TrendIndicator
              trend={stock.rfactor_trend_15m}
              acceleration={stock.rfactor_trend_acceleration}
              points={stock.rfactor_trend_points}
            />
          </div>
          <div style={{ color: "#94A3B8", fontSize: "11px", fontWeight: 600, marginTop: "8px" }}>
            {trendLabel}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#151515",
            border: "1px solid #242424",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <InsightTooltip
            label="Opportunity"
            description="Early-entry quality before overextension"
          >
            <div style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}>
              Opportunity
            </div>
          </InsightTooltip>
          <div
            style={{
              color: "#FDBA74",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: "6px",
            }}
          >
            {formatInsightNumber(stock.opportunity_score, 1)}
          </div>
          <div style={{ color: "#FCD9AE", fontSize: "11px", fontWeight: 600, marginTop: "8px" }}>
            {opportunityLabel}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #222222", margin: "12px 0" }} />

      {/* Row 5 — Stats Grid 2x3 */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {/* RSI */}
        <div>
          <div
            style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}
          >
            RSI
          </div>
          <div
            style={{
              color: getRsiMfiColor(stock.rsi),
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {stock.rsi.toFixed(1)}
          </div>
        </div>

        {/* MFI */}
        <div>
          <div
            style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}
          >
            MFI
          </div>
          <div
            style={{
              color: getRsiMfiColor(stock.mfi),
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {stock.mfi.toFixed(1)}
          </div>
        </div>

        {/* Volume */}
        <div>
          <div
            style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}
          >
            Vol
          </div>
          <div
            style={{
              color: getVolumeColor(stock.volume_ratio),
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {stock.volume_ratio}x
          </div>
        </div>

        {/* RS */}
        <div>
          <div
            style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}
          >
            RS
          </div>
          <div
            style={{
              color: stock.relative_strength >= 0 ? "#00C853" : "#F44336",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {stock.relative_strength >= 0 ? "+" : ""}
            {stock.relative_strength.toFixed(2)}%
          </div>
        </div>

        {/* Delivery % */}
        <div>
          <div
            style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}
          >
            Delivery %
          </div>
          <div
            style={{
              color: stock.delivery_pct ? getDeliveryColor(stock.delivery_pct) : "#555555",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {stock.delivery_pct ? `${stock.delivery_pct.toFixed(1)}%` : "--"}
          </div>
        </div>

        {/* Bid/Ask */}
        <div>
          <div
            style={{ color: "#555555", fontSize: "10px", textTransform: "uppercase" }}
          >
            Bid/Ask
          </div>
          <div
            style={{
              color: stock.bid_ask_ratio ? getBidAskColor(stock.bid_ask_ratio) : "#555555",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {stock.bid_ask_ratio ? `${stock.bid_ask_ratio.toFixed(1)}x` : "--"}
          </div>
        </div>
      </div>
    </div>
  );
}
