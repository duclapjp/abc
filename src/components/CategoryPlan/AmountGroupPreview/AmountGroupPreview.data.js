/* eslint-disable react/display-name  */
import React from "react";
import { round } from "lodash";

const roundToTwo = (num) => {
  return round(num, 2);
};

const renderPeople = (length, messages, previewItem) => {
  const arr = [];
  for (let i = 1; i <= length; i++) {
    arr.push({
      title: `${i} ${messages["page.AmountGroup.people"]}`,
      dataIndex: "",
      key: "",
      align: "center",
      render: (value, row) => {
        const valueDefault = row.amounts[i - 1];
        const total = +valueDefault + +previewItem.discounts;
        if (previewItem.unit === "%") {
          return (
            <div>
              {roundToTwo(
                valueDefault + (previewItem.discounts / 100) * valueDefault
              )}
            </div>
          );
        } else {
          return <div>{total}</div>;
        }
      },
    });
  }
  return arr;
};

export const columns = ({ messages, length, previewItem }) => {
  return [
    {
      title: messages["page.planAmountDefaults.th.amountRankName"],
      dataIndex: "amountRankName",
      key: "amountRankName",
      align: "center",
    },
    ...renderPeople(length, messages, previewItem),
  ];
};
