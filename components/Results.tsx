import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { inter } from "./Links";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-card">
        <p className={inter.className}>{`${label} : ${payload?.[0].value}`}</p>
      </div>
    );
  }

  return null;
};

interface ResultsProps {
  chartData: { name: string; votes: number }[];
}
const Results: React.FC<ResultsProps> = ({ chartData }) => {
  return (
    <div
      style={{
        minHeight: "200px",
        minWidth: "200px",
        maxHeight: "300px",
        maxWidth: "600px",
        margin: "auto",
        width: "80vw",
        height: "100%",
      }}
    >
      <ResponsiveContainer height={300}>
        <BarChart
          desc="A bar chart of the results"
          data={chartData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          barSize={50}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 50, right: 50 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="votes" fill="rgba(130,130,200,0.7)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Results;
