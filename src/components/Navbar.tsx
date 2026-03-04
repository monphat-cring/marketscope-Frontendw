import { useState, useEffect, useCallback } from "react";
import { isMarketOpen } from "@/lib/market";

const REFRESH_INTERVAL = 300; // 5 minutes

export function Navbar() {
  const [time, setTime] = useState("");
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [marketOpen, setMarketOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setTime(
        ist.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setMarketOpen(isMarketOpen());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((c) => (c <= 1 ? REFRESH_INTERVAL : c - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-market-surface">
      <div className="text-xl md:text-2xl font-bold text-primary tracking-tight">
        MarketScope
      </div>

      <div className="text-lg md:text-xl font-mono text-foreground tabular-nums">
        {time}
      </div>

      <div className="flex items-center gap-3 text-xs md:text-sm">
        <span className="hidden md:inline text-muted-foreground">
          Next refresh: {mins}:{secs.toString().padStart(2, "0")}
        </span>
        <span
          className={`px-2.5 py-1 rounded text-xs font-semibold ${
            marketOpen
              ? "bg-gain-strong/20 text-gain-medium"
              : "bg-loss-strong/20 text-loss-medium"
          }`}
        >
          {marketOpen ? "MARKET OPEN" : "MARKET CLOSED"}
        </span>
        <span className="hidden md:inline text-muted-foreground">
          Updated: 14:35:22
        </span>
      </div>
    </nav>
  );
}
