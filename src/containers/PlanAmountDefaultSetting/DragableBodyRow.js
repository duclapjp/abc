import React, { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { isNull, isUndefined } from "lodash";

const type = "DragableBodyRow";

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item) => {
      if (isUndefined(item.index) || isNull(item.index)) return;
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};

DragableBodyRow.propTypes = {
  index: PropTypes.number,
  moveRow: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.any,
};

export default memo(DragableBodyRow);
