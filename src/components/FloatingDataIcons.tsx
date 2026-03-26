import { motion } from "framer-motion";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  LineChart,
  Table2,
  FileSpreadsheet,
  Database,
  Activity,
  LayoutDashboard,
  ChartPie,
  ChartBar,
  ChartLine,
  GitGraph,
  Sigma,
  Gauge,
  Percent,
} from "lucide-react";

const iconDefs = [
  { Icon: BarChart3, size: 30 },
  { Icon: PieChart, size: 34 },
  { Icon: TrendingUp, size: 26 },
  { Icon: LineChart, size: 28 },
  { Icon: Table2, size: 24 },
  { Icon: FileSpreadsheet, size: 22 },
  { Icon: Database, size: 24 },
  { Icon: Activity, size: 28 },
  { Icon: LayoutDashboard, size: 26 },
  { Icon: ChartPie, size: 22 },
  { Icon: ChartBar, size: 24 },
  { Icon: ChartLine, size: 26 },
  { Icon: GitGraph, size: 22 },
  { Icon: Sigma, size: 20 },
  { Icon: Gauge, size: 26 },
  { Icon: Percent, size: 22 },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateIcons() {
  const result: {
    Icon: typeof BarChart3;
    x: string;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }[] = [];

  const rows = 30;
  const perRow = 4;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < perRow; col++) {
      const seed = row * perRow + col;
      const idx = seed % iconDefs.length;
      const { Icon, size } = iconDefs[idx];
      const xBase = (col / perRow) * 100 + 3 + seededRandom(seed * 7) * 20;
      const yPx = row * 280 + seededRandom(seed * 13) * 180;
      result.push({
        Icon,
        x: `${Math.min(xBase, 95)}%`,
        y: yPx,
        size,
        delay: seededRandom(seed * 3) * 4,
        duration: 6 + seededRandom(seed * 11) * 6,
      });
    }
  }
  return result;
}

const icons = generateIcons();

export default function FloatingDataIcons() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {icons.map(({ Icon, x, y, size, delay, duration }, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/30 dark:text-primary/20"
          style={{ left: x, top: y }}
          animate={{
            opacity: [0, 0.5, 0.8, 0.5, 0],
            y: [0, -30, -10, 20, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            opacity: { duration: duration, delay, repeat: Infinity, ease: "easeInOut" },
            y: { duration: duration * 1.1, delay, repeat: Infinity, ease: "easeInOut" },
            x: { duration: duration * 1.3, delay, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: duration * 1.5, delay, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Icon size={size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
