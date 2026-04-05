import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ShareChartProps {
  proportionMCF: string;
  remainingSize: string;
  nfm: number;
}

export default function ShareChart({ proportionMCF, remainingSize, nfm }: ShareChartProps) {
  const [mcfNum, mcfDen] = proportionMCF.split('/').map(Number);
  const [remNum, remDen] = remainingSize.split('/').map(Number);

  const mcfShare = mcfNum / mcfDen;
  const remShare = remNum / remDen;

  if (!isFinite(mcfShare) || !isFinite(remShare)) return null;

  const data = [
    ...Array.from({ length: nfm }, (_, i) => ({
      name: `Член семьи ${i + 1}`,
      value: parseFloat((mcfShare * 100).toFixed(2)),
    })),
    {
      name: 'Остаток владельцев',
      value: parseFloat((remShare * 100).toFixed(2)),
    },
  ];

  const COLORS = [
    'oklch(0.55 0.18 250)',
    'oklch(0.50 0.16 260)',
    'oklch(0.60 0.15 240)',
    'oklch(0.45 0.14 270)',
    'oklch(0.65 0.13 230)',
  ];

  return (
    <div className="w-full" role="img" aria-label={`Распределение долей: каждому члену семьи по ${proportionMCF}, остаток ${remainingSize}`}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            animationDuration={500}
            animationEasing="ease-out"
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  index < nfm
                    ? COLORS[index % COLORS.length]
                    : 'oklch(0.75 0.03 250)'
                }
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${Number(value).toFixed(2)}%`, '']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid oklch(0.90 0.02 250)',
              fontSize: '13px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ background: COLORS[0] }}
          />
          <span className="text-muted-foreground">
            Доля по МСК ({proportionMCF})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ background: 'oklch(0.75 0.03 250)' }}
          />
          <span className="text-muted-foreground">
            Остаток ({remainingSize})
          </span>
        </div>
      </div>
    </div>
  );
}
