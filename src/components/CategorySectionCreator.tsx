import React from "react";
import Box from "./Box";
import CategorySectionHeader from "./CategorySectionHeader";
import Container from "./Container";

export interface CategorySectionCreatorProps {
  iconName?: string;
  title?: string;
  seeMoreLink?: string;
  id?:string
}

const CategorySectionCreator: React.FC<CategorySectionCreatorProps> = ({
  iconName,
  seeMoreLink,
  title,
  children,
  id
}) => {
  return (
    <Box id={id} mb="3.75rem">
      <Container pb="1rem">
        {title && (
          <div>
            <CategorySectionHeader
                title={title}
                seeMoreLink={seeMoreLink}
                iconName={iconName}
            />
          </div>
        )}

        {children}
      </Container>
    </Box>
  );
};

export default CategorySectionCreator;
