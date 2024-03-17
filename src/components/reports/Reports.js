import PassReports from "./PassReports";
import WorktimeAccounting from "./WorktimeAccounting";
import TabsSet from "../common/common components/TabsSet";

const tabs = {
  "Отчёты о проходах": <PassReports />,
  "Учёт рабочего времени": <WorktimeAccounting />,
};

const ReportsScreen = () => {
  const FilterFunction = () => {
    alert("filter");
  };

  return <TabsSet tabs={tabs} />;
};

export default ReportsScreen;
