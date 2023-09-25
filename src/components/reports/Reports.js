import SearchInput from "../header_menu/SearchInput";
import ButtonWithIcon from "../header_menu/ButtonWithIcon";
import FilterImg from "../../project_images/filter.png";
import {
  Wrapper,
  HeaderMenuContainer,
  TableContainer,
  Elements,
  SearchAndFilters,
  Separator,
} from "../common/common components/screenComponents";
import PassReports from "./PassReports";
import WorktimeAccounting from "./WorktimeAccounting";
import TabsSet from "../common/common components/TabsSet";
// import EventsTable from "./EventsTable";

const tabs = {
  "Отчёты о проходах": <PassReports />,
  "Учёт рабочего времени": <WorktimeAccounting />,
};

const ReportsScreen = () => {
  const FilterFunction = () => {
    alert("filter");
  };

  return (
    // <Wrapper>
      <TabsSet tabs={tabs} />
    // </Wrapper>
  );
};

export default ReportsScreen;
