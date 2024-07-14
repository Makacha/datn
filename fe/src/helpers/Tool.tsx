import React from "react";
import {HighlightOutlined, } from "@ant-design/icons";
import {ToolClass} from "../interfaces";
import {ToolType} from "../constants/tool";
import ChartStore from "../Canvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {LineToolIcon, PenToolIcon} from "./Icon";

const toolClasses: ToolClass[] = [
  {
    icon: <LineToolIcon />,
    title: 'Các công cụ Đường xu hướng',
    toolGroups: [
      {
        title: 'Đường',
        tools: [
          {
            type: ToolType.trendLine,
            icon: <LineToolIcon />,
            title: 'Đường xu hướng',
          }
        ]
      }
    ]
  },
  {
    icon: <PenToolIcon/>,
    title: 'Công cụ vẽ',
    toolGroups: [
      {
        title: 'Cọ',
        tools:
          [
            {
              type: ToolType.pen,
              icon: <PenToolIcon/>,
              title: 'Cọ vẽ',
            },
            {
              type: ToolType.highlighter,
              icon: <HighlightOutlined/>,
              title: 'Bút đánh dấu',
            }
          ]
      }
    ],
  },
  {
    icon: <FontAwesomeIcon icon={faTrashCan} />,
    title: 'Công cụ vẽ',
    toolGroups: [],
    action: () => {
      console.log('delete');
      ChartStore.instance.disableTool();
    },
  }
];

const toolHelpers = {
  toolClasses,
}

export default toolHelpers;