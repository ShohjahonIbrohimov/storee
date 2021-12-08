
import Link from "next/link";
import React from "react";
import FlexBox from "./FlexBox";
import Icon from "./icon/Icon";
import { H1, SemiSpan } from "./Typography";
import {FormattedMessage} from "react-intl";

export interface CategorySectionHeaderProps {
  title?: string;
  seeMoreLink?: string;
  iconName?: string;
}

const CategorySectionHeader: React.FC<CategorySectionHeaderProps> = ({
  title,
  seeMoreLink,
  iconName,
}) => {
  return (
    <FlexBox
        justifyContent="space-between"
        alignItems="center"
        mb="1.5rem"
    >
      <FlexBox
          alignItems="center"
      >
        {iconName && (
          <Icon
              defaultcolor="auto"
              mr="0.5rem"
          >
            {iconName}
          </Icon>
        )}
        <H1
            fontWeight="bold"
            className="title_category_Section_header"
            lineHeight="1"
        >
          {title}
        </H1>
      </FlexBox>

      {seeMoreLink && (
        <Link
            href={seeMoreLink}
        >
          <a>
            <FlexBox
                alignItems="center"
                ml="0.5rem"
                color="text.muted"
            >
              <SemiSpan
                  className="more_category_section_header"
                  mr="0.5rem"
              >
                <FormattedMessage
                  id="view_all"
                  defaultMessage="View all"
                />
              </SemiSpan>
              <Icon
                  size="12px"
                  defaultcolor="currentColor"
              >
                right-arrow
              </Icon>
            </FlexBox>
          </a>
        </Link>
      )}
    </FlexBox>
  );
};

export default CategorySectionHeader;
