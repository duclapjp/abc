import React, { memo } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { get, map } from "lodash";

import { colSingleLeft } from "@iso/assets/styles/form.style";
import CategoryMapping from "@iso/constants/category.mapping";
import { CategoryDetailWrapper } from "@iso/components/TaskAddEditComponent/category-detail/CategoryDetail.style";
import Loader from "@iso/components/utility/loader";

const DefaultCategoryDetail = ({
  name,
  items,
  items1 = {},
  loading,
  setFieldValue,
}) => {
  return (
    <CategoryDetailWrapper>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {map(items, (item, idx) => {
            const Component = get(CategoryMapping, item.itemCode);
            return (
              <Col {...colSingleLeft} key={idx}>
                {Component && (
                  <Component
                    valueItems={items1}
                    defaultValue={items1?.[`ITEMID${item.itemId}`]}
                    name={`${name}.ITEMID${item.itemId}`}
                    setFieldValue={setFieldValue}
                  />
                )}
              </Col>
            );
          })}
        </Row>
      )}
    </CategoryDetailWrapper>
  );
};

DefaultCategoryDetail.propTypes = {
  planDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  planDefaultList: PropTypes.array,
  categoryList: PropTypes.array,
  items: PropTypes.array,
  items1: PropTypes.object,
  name: PropTypes.string,
  setFieldValue: PropTypes.func,
};

export default memo(DefaultCategoryDetail);
