import { forIn } from "lodash";

export const enhanceItemsData = (itemsInput = {}) => {
  const items = [];
  forIn(itemsInput, (value, key) => {
    items.push({
      itemId: parseInt(key.replace("ITEMID", "")),
      itemJsonValue: JSON.stringify(value || {}),
    });
  });

  return items;
};

export const parseItemsDataToForm = (itemsInputData = []) => {
  const items = {};
  itemsInputData.map((item) => {
    let value = {};
    try {
      value = JSON.parse(item.itemJsonValue);
    } catch (error) {
      console.log(item.itemId, " - Parse json error: ", error);
    }
    items[`ITEMID${item.itemId}`] = value;
    return item;
  });

  return items;
};
