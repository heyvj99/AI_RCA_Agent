// Chart data for Root Cause Analysis Report

export interface PerformanceDataPoint {
  month: string;
  sales: number;
  marketing: number;
  operations: number;
  support: number;
}

export interface ResourceDataPoint {
  month: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

// Sales Performance & Cost Analysis Data
export const performanceData: PerformanceDataPoint[] = [
  // Q1: Post-holiday normalization; marketing ramps late Q1 for April campaign
  { month: 'Jan', sales: 52000, marketing: 11000, operations: 9000, support: 5200 },
  { month: 'Feb', sales: 48000, marketing: 10000, operations: 8800, support: 5400 },
  { month: 'Mar', sales: 51000, marketing: 14000, operations: 9000, support: 5600 },
  // Q2: Campaign lift in April-May; operations scale modestly; support lags by ~1 month
  { month: 'Apr', sales: 62000, marketing: 12500, operations: 10200, support: 6000 },
  { month: 'May', sales: 60000, marketing: 13500, operations: 10500, support: 6800 },
  { month: 'Jun', sales: 58000, marketing: 12000, operations: 10300, support: 7200 },
  // Q3: Summer softness in July; back-to-school ramp Aug-Sep
  { month: 'Jul', sales: 54000, marketing: 9500, operations: 9900, support: 7000 },
  { month: 'Aug', sales: 66000, marketing: 15000, operations: 10800, support: 7400 },
  { month: 'Sep', sales: 69000, marketing: 16000, operations: 11200, support: 8200 },
  // Q4: Major promo in Oct, holiday ramp Nov-Dec; support increases after peaks
  { month: 'Oct', sales: 75000, marketing: 21000, operations: 12000, support: 9000 },
  { month: 'Nov', sales: 72000, marketing: 18000, operations: 11800, support: 11000 },
  { month: 'Dec', sales: 88000, marketing: 23000, operations: 13000, support: 10500 }
];

// System Resource Utilization Data
export const resourceData: ResourceDataPoint[] = [
  { month: 'Jan', cpu: 65, memory: 45, disk: 30, network: 25 },
  { month: 'Feb', cpu: 70, memory: 50, disk: 35, network: 30 },
  { month: 'Mar', cpu: 75, memory: 55, disk: 40, network: 35 },
  { month: 'Apr', cpu: 80, memory: 60, disk: 45, network: 40 },
  { month: 'May', cpu: 85, memory: 65, disk: 50, network: 45 },
  { month: 'Jun', cpu: 90, memory: 70, disk: 55, network: 50 },
  { month: 'Jul', cpu: 88, memory: 68, disk: 52, network: 48 },
  { month: 'Aug', cpu: 92, memory: 75, disk: 58, network: 52 },
  { month: 'Sep', cpu: 89, memory: 72, disk: 55, network: 50 },
  { month: 'Oct', cpu: 95, memory: 80, disk: 62, network: 55 },
  { month: 'Nov', cpu: 93, memory: 78, disk: 60, network: 53 },
  { month: 'Dec', cpu: 98, memory: 85, disk: 65, network: 58 }
];

// Chart Configuration
export const chartConfig: ChartConfig = {
  sales: {
    label: "Sales Revenue",
    color: "#3b82f6", // Blue
  },
  marketing: {
    label: "Marketing Spend",
    color: "#10b981", // Green
  },
  operations: {
    label: "Operations Cost",
    color: "#f59e0b", // Amber
  },
  support: {
    label: "Support Cost",
    color: "#ef4444", // Red
  },
  cpu: {
    label: "CPU Usage",
    color: "hsl(var(--chart-1))",
  },
  memory: {
    label: "Memory Usage",
    color: "hsl(var(--chart-2))",
  },
  disk: {
    label: "Disk Usage",
    color: "hsl(var(--chart-3))",
  },
  network: {
    label: "Network Usage",
    color: "hsl(var(--chart-4))",
  },
};
