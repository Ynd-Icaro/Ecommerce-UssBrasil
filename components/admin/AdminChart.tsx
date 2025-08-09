'use client'

import { 
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'

interface ChartProps {
  data: any[]
  type: 'line' | 'area' | 'bar' | 'pie'
  dataKey: string
  xAxisKey?: string
  secondaryDataKey?: string
  color?: string
  secondaryColor?: string
  gradient?: boolean
  height?: number
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0C1A33]/95 border border-[#0E7466]/30 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[#0E7466]">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminChart({ 
  data, 
  type, 
  dataKey, 
  xAxisKey = 'name',
  secondaryDataKey,
  color = '#0E7466',
  secondaryColor = '#3B82F6',
  gradient = false,
  height = 300 
}: ChartProps) {
  const chartProps = {
    data,
    height,
    margin: { top: 5, right: 30, left: 20, bottom: 5 }
  }

  const axisProps = {
    axisLine: false,
    tickLine: false,
    tick: { fill: '#9CA3AF', fontSize: 12 }
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxisKey} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
            />
            {secondaryDataKey && (
              <Line 
                type="monotone" 
                dataKey={secondaryDataKey} 
                stroke={secondaryColor} 
                strokeWidth={2}
                dot={{ fill: secondaryColor, strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: secondaryColor, strokeWidth: 2 }}
              />
            )}
          </LineChart>
        )

      case 'area':
        return (
          <AreaChart {...chartProps}>
            {gradient && (
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
                {secondaryDataKey && (
                  <linearGradient id="secondaryAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.1}/>
                  </linearGradient>
                )}
              </defs>
            )}
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxisKey} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              fill={gradient ? "url(#areaGradient)" : color} 
            />
            {secondaryDataKey && (
              <Area 
                type="monotone" 
                dataKey={secondaryDataKey} 
                stroke={secondaryColor} 
                strokeWidth={2}
                fill={gradient ? "url(#secondaryAreaGradient)" : secondaryColor} 
                fillOpacity={0.6}
              />
            )}
          </AreaChart>
        )

      case 'bar':
        return (
          <BarChart {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxisKey} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        )

      default:
        return null
    }
  }

  const chart = renderChart()
  
  if (!chart) {
    return <div>Tipo de gráfico não suportado</div>
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {chart}
      </ResponsiveContainer>
    </div>
  )
}
