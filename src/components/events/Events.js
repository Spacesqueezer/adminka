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
import EventsTable from "./EventsTable";

const EventsScreen = () => {
    const FilterFunction = () => {
        alert("filter");
    };



    return (
        <Wrapper>
            <HeaderMenuContainer>
                <Elements>
                    <SearchAndFilters>
                        <SearchInput />
                        <ButtonWithIcon
                            label={"Разделы"}
                            backColor={(props) => props.theme.White}
                            textColor={(props) => props.theme.Black}
                            icon={FilterImg}
                            callback={FilterFunction}
                        />
                    </SearchAndFilters>
                </Elements>
                <Separator />
            </HeaderMenuContainer>
            <TableContainer>
                <EventsTable />
            </TableContainer>
        </Wrapper>
    );
};

export default EventsScreen;
