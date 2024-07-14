import React, {HTMLProps} from "react";
// @ts-ignore
import {ReactComponent as LineToolSvg} from "../Assets/icons/line-straight.svg";
// @ts-ignore
import {ReactComponent as PenToolSvg} from "../Assets/icons/pen.svg";
// @ts-ignore
import {ReactComponent as SearchSvg} from "../Assets/icons/search.svg";
// @ts-ignore
import {ReactComponent as MenuSvg} from "../Assets/icons/menu.svg";

const LineToolIcon: React.FC<HTMLProps<any>> = (props) => {
  return (
    <span style={props.style}>
      <LineToolSvg/>
    </span>
  );
}

const PenToolIcon: React.FC<HTMLProps<any>> = (props) => {
  return (
    <span style={props.style}>
      <PenToolSvg/>
    </span>
  );
}

const SearchIcon: React.FC<HTMLProps<any>> = (props) => {
  return (
    <span style={props.style}>
      <SearchSvg/>
    </span>
  );
}

const MenuIcon: React.FC<HTMLProps<any>> = (props) => {
  return (
    <span style={props.style}>
      <MenuSvg/>
    </span>
  );
}

export {LineToolIcon, PenToolIcon, SearchIcon, MenuIcon};


