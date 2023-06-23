import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import MenuItem from "../components/sidemenu/MenuItem";
import HeaderMenu from "../components/header_menu/HeaderMenu";
import ButtonWithIcon from "../components/header_menu/ButtonWithIcon";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/MenuItem">
                <MenuItem/>
            </ComponentPreview>
            <ComponentPreview path="/HeaderMenu">
                <HeaderMenu/>
            </ComponentPreview>
            <ComponentPreview path="/ButtonWithIcon">
                <ButtonWithIcon/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews