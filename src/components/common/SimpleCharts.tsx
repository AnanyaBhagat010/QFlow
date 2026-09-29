import React, { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  unit?: string;
  height?: number;
}

export const SimpleLineChart: React.FC<LineChartProps> = ({
  data,
  color = '#6A00F4',
  unit = 'people',
  height = 200,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const values = data.map(d => d.value);
  const minVal = Math.min(...values, 0);
  const maxVal = Math.max(...values, 10);
  const range = maxVal - minVal || 1;

  const svgWidth = 500;
  const svgHeight = height;
  const paddingX = 40;
  const paddingY = 25;

  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartWidth;
    const y = svgHeight - paddingY - ((d.value - minVal) / range) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${svgHeight - paddingY} L ${points[0].x},${svgHeight - paddingY} Z`;

  return (
    <div className="relative w-full select-none" style={{ height: `${svgHeight}px` }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((pct, idx) => {
          const y = paddingY + pct * chartHeight;
          const val = Math.round(maxVal - pct * range);
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="#E9E3F0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <text
                x={paddingX - 8}
                y={y + 3}
                fill="#706A7E"
                fontSize="10"
                textAnchor="end"
                fontFamily="sans-serif"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Gradient fill */}
        <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((pt, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHovered ? 6 : 4}
                fill={color}
                stroke="#ffffff"
                strokeWidth={isHovered ? 3 : 2}
                className="transition-all duration-150"
              />
              {/* Invisible larger hit target */}
              <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />
            </g>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between text-[11px] text-[#706A7E] font-medium px-8 mt-1">
        {data.map((d, i) => (
          <span key={i} className="text-center truncate max-w-16">
            {d.label}
          </span>
        ))}
      </div>

      {/* Floating tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute z-10 -top-2 transform -translate-x-1/2 bg-[#252033] text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none transition-all"
          style={{
            left: `${(hoveredIdx / (data.length - 1)) * 80 + 10}%`,
          }}
        >
          <div className="font-bold">{data[hoveredIdx].value} {unit}</div>
          <div className="text-[10px] text-[#FFD6A5]">{data[hoveredIdx].label}</div>
        </div>
      )}
    </div>
  );
};

interface BarChartProps {
  data: DataPoint[];
  color?: string;
  unit?: string;
  height?: number;
  maxValOverride?: number;
}

export const SimpleBarChart: React.FC<BarChartProps> = ({
  data,
  color = '#6A00F4',
  unit = 'arrivals',
  height = 200,
  maxValOverride,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = maxValOverride || Math.max(...data.map(d => d.value), 10);

  return (
    <div className="w-full select-none" style={{ height: `${height}px` }}>
      <div className="h-[calc(100%-28px)] flex items-end gap-2 sm:gap-3 px-2 pt-4">
        {data.map((d, i) => {
          const heightPct = Math.min(100, Math.max(8, (d.value / maxVal) * 100));
          const isHovered = hoveredIdx === i;

          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center h-full justify-end relative cursor-pointer group"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -top-10 bg-[#252033] text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10 pointer-events-none">
                  <span className="font-bold">{d.value}</span> {unit}
                </div>
              )}

              {/* The bar */}
              <div
                className="w-full rounded-t-lg transition-all duration-200"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: color,
                  opacity: isHovered ? 1 : 0.85,
                  transform: isHovered ? 'scaleY(1.03)' : 'scaleY(1)',
                  transformOrigin: 'bottom',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between gap-1 text-[11px] text-[#706A7E] font-medium px-2 mt-2">
        {data.map((d, i) => (
          <span key={i} className="flex-1 text-center truncate" title={d.label}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
};
