import React, { useContext } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AppContext } from '../context/AppContext';
import Card, { CardHeader } from './Card';
import { Target } from 'lucide-react';

const CustomTooltip = ({ active, payload, label, tooltipStyle }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={tooltipStyle}>
        <p style={{ fontWeight: 'bold' }}>{label}</p>
        <p style={{ fontSize: '0.875rem' }}>{`Progress: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};


const SpiderChart: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { spiderData, theme } = context;

  const radarColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const gridColor = theme === 'dark' ? '#444444' : '#DDDDDD';
  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  const tooltipStyle = {
      backgroundColor: theme === 'dark' ? '#111' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      border: `1px solid ${theme === 'dark' ? '#fff' : '#000'}`,
      padding: '8px',
      borderRadius: '6px',
  };

  return (
    <Card className="h-[400px]">
      <CardHeader icon={<Target size={20}/>}>Life Balance</CardHeader>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="55%" outerRadius="80%" data={spiderData}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Progress" dataKey="value" stroke={radarColor} fill={radarColor} fillOpacity={0.6} />
          <Tooltip content={<CustomTooltip tooltipStyle={tooltipStyle} />} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SpiderChart;