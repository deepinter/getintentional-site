"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const CENTER_X = 280;
const CENTER_Y = 118;
const BOUNDARY_R = 103;
const STRATEGY_START_CX = 70;
const STRATEGY_CY = 118;
const STRATEGY_R = 12;

const TOUCH_DX   = (CENTER_X - BOUNDARY_R - STRATEGY_R) - STRATEGY_START_CX; // touches boundary from left
const FRAME_MID  = 200;                                                        // horizontal centre of viewBox
const MEET_DOT   = FRAME_MID - STRATEGY_START_CX;                             // strategy travels to mid (+130)
const MEET_CLUSTER = FRAME_MID - CENTER_X;                                     // cluster travels to mid (-80)

// Colours: brand orange + muted blue, green, yellow, red
const C = {
  orange: "#d4561d",
  blue:   "#4a7fa8",
  green:  "#4a8a62",
  yellow: "#b89030",
  red:    "#b84040",
};

// All bubbles kept well within BOUNDARY_R when accounting for movement + scale
const bubbles = [
  { cx: 266, cy: 108, r: 42, moveDur: 2.8, scaleDur: 3.4, delay: 0.0, dx:  7, dy: -5, rs: 0.94, rl: 1.05, color: C.orange },
  { cx: 306, cy: 148, r: 30, moveDur: 2.3, scaleDur: 4.1, delay: 0.5, dx: -6, dy:  7, rs: 0.94, rl: 1.05, color: C.blue   },
  { cx: 232, cy: 154, r: 22, moveDur: 3.1, scaleDur: 2.9, delay: 1.1, dx:  8, dy:  5, rs: 0.94, rl: 1.06, color: C.green  },
  { cx: 282, cy:  82, r: 26, moveDur: 2.0, scaleDur: 3.7, delay: 0.2, dx: -5, dy: -8, rs: 0.94, rl: 1.05, color: C.orange },
  { cx: 318, cy: 118, r: 36, moveDur: 2.6, scaleDur: 4.4, delay: 1.7, dx:  6, dy:  6, rs: 0.94, rl: 1.05, color: C.yellow },
  { cx: 224, cy:  92, r: 17, moveDur: 2.2, scaleDur: 3.2, delay: 0.8, dx: -5, dy: -6, rs: 0.94, rl: 1.05, color: C.red    },
  { cx: 320, cy: 160, r: 18, moveDur: 3.3, scaleDur: 2.6, delay: 2.0, dx:  6, dy: -5, rs: 0.94, rl: 1.05, color: C.blue   },
  { cx: 260, cy: 176, r: 15, moveDur: 1.9, scaleDur: 3.9, delay: 0.4, dx: -7, dy:  5, rs: 0.94, rl: 1.06, color: C.orange },
  { cx: 308, cy:  60, r: 20, moveDur: 2.5, scaleDur: 3.1, delay: 1.4, dx:  5, dy:  7, rs: 0.94, rl: 1.05, color: C.green  },
  { cx: 206, cy: 132, r: 12, moveDur: 2.1, scaleDur: 4.6, delay: 2.3, dx: -6, dy: -4, rs: 0.94, rl: 1.05, color: C.yellow },
  { cx: 326, cy:  70, r: 14, moveDur: 3.0, scaleDur: 2.8, delay: 0.3, dx: -4, dy:  6, rs: 0.94, rl: 1.05, color: C.red    },
  { cx: 242, cy:  72, r: 24, moveDur: 2.4, scaleDur: 3.5, delay: 1.8, dx:  8, dy: -6, rs: 0.94, rl: 1.05, color: C.orange },
];

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

export default function StrategyIcon() {
  const sceneControls    = useAnimationControls();
  const strategyControls = useAnimationControls();
  const clusterControls  = useAnimationControls();
  const spreadControls   = useAnimationControls();

  useEffect(() => {
    let cancelled = false;

    const bump = async () => {
      await strategyControls.start({ x: TOUCH_DX, transition: { duration: 0.5, ease: "easeIn" } });
      await strategyControls.start({ x: 0, transition: { duration: 0.63, ease: [0.34, 1.56, 0.64, 1] } });
    };

    const run = async () => {
      // Initial state before first run
      sceneControls.set({ opacity: 1 });
      strategyControls.set({ x: 0 });
      clusterControls.set({ x: 0, scale: 1 });
      spreadControls.set({ scale: 1 });

      while (!cancelled) {

        await sleep(2000);
        if (cancelled) break;

        // 3 bumps, each returning to origin
        await bump(); await sleep(1000);
        if (cancelled) break;
        await bump(); await sleep(1000);
        if (cancelled) break;
        await bump();
        if (cancelled) break;

        // Pause before meeting
        await sleep(2000);
        if (cancelled) break;

        // Both move to meet at horizontal centre
        await Promise.all([
          strategyControls.start({ x: MEET_DOT,     transition: { duration: 1.0, ease: [0.25, 1.1, 0.5, 1] } }),
          clusterControls.start({  x: MEET_CLUSTER, transition: { duration: 1.0, ease: [0.25, 1.1, 0.5, 1] } }),
        ]);
        if (cancelled) break;

        // Bubbles spread to make space, then gently settle
        await spreadControls.start({ scale: 1.12, transition: { duration: 0.45, ease: "easeOut" } });
        await spreadControls.start({ scale: 1.06, transition: { duration: 0.5,  ease: "easeInOut" } });

        // Hold
        await sleep(3200);
        if (cancelled) break;

        await sceneControls.start({ opacity: 0, transition: { duration: 0.75 } });
        // Reset positions while invisible so fade-in reveals the start state
        strategyControls.set({ x: 0 });
        clusterControls.set({ x: 0, scale: 1 });
        spreadControls.set({ scale: 1 });
        await sleep(300);
        await sceneControls.start({ opacity: 1, transition: { duration: 0.75 } });
      }
    };

    run();
    return () => { cancelled = true; };
  }, [sceneControls, strategyControls, clusterControls, spreadControls]);

  return (
    <div className="w-full" style={{ aspectRatio: "5 / 3" }}>
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.g animate={sceneControls}>

          {/* AI bubble cluster — translates on entry */}
          <motion.g animate={clusterControls}>

            {/* Solid background behind bubbles */}
            <circle cx={CENTER_X} cy={CENTER_Y} r={BOUNDARY_R} fill="var(--background)" />

            {/* Soft pulsing edge halo */}
            <motion.circle
              cx={CENTER_X} cy={CENTER_Y} r={BOUNDARY_R}
              fill="none"
              stroke="#d4561d"
              strokeWidth={16}
              style={{ filter: "blur(8px)" }}
              animate={{ opacity: [0.15, 0.30, 0.15] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Bubbles — scale outward when strategy dot arrives */}
            <motion.g
              animate={spreadControls}
              style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
            >
              {bubbles.map((b, i) => (
                <motion.g
                  key={i}
                  animate={{ x: [0, b.dx, 0, -b.dx * 0.5, 0], y: [0, b.dy, 0, -b.dy * 0.5, 0] }}
                  transition={{ duration: b.moveDur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.circle
                    cx={b.cx} cy={b.cy} r={b.r}
                    animate={{ r: [b.r, b.r * b.rs, b.r * b.rl, b.r * b.rs, b.r] }}
                    transition={{ duration: b.scaleDur, delay: b.delay * 1.3, repeat: Infinity, ease: "easeInOut" }}
                    fill={b.color}
                    fillOpacity={0.13 + (i % 4) * 0.04}
                  />
                </motion.g>
              ))}
            </motion.g>
            <text
              x={CENTER_X} y={CENTER_Y + BOUNDARY_R - 12}
              textAnchor="middle" fontSize="11"
              fill="#d4561d" fillOpacity="0.65"
              fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.08em"
            >AI</text>
          </motion.g>

          {/* Our strategy — moves with strategyControls */}
          <motion.g animate={strategyControls}>
            <circle
              cx={STRATEGY_START_CX} cy={STRATEGY_CY} r={STRATEGY_R}
              fill="#4c0c0c"
            />
            {/* Crosshair — gap in centre, 4 inward ticks */}
            <line x1={STRATEGY_START_CX - 8} y1={STRATEGY_CY} x2={STRATEGY_START_CX - 3} y2={STRATEGY_CY} stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1={STRATEGY_START_CX + 3} y1={STRATEGY_CY} x2={STRATEGY_START_CX + 8} y2={STRATEGY_CY} stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1={STRATEGY_START_CX} y1={STRATEGY_CY - 8} x2={STRATEGY_START_CX} y2={STRATEGY_CY - 3} stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1={STRATEGY_START_CX} y1={STRATEGY_CY + 3} x2={STRATEGY_START_CX} y2={STRATEGY_CY + 8} stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <text
              x={STRATEGY_START_CX} y={STRATEGY_CY + 30}
              textAnchor="middle" fontSize="10"
              fill="#4c0c0c" fillOpacity="0.8"
              fontFamily="system-ui, sans-serif" fontWeight="600" letterSpacing="0.04em"
            >
              <tspan x={STRATEGY_START_CX} dy="0">Our</tspan>
              <tspan x={STRATEGY_START_CX} dy="13">strategy</tspan>
            </text>
          </motion.g>

        </motion.g>
      </svg>
    </div>
  );
}
