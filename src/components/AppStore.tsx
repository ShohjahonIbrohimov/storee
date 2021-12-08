import React from "react";
import Box from "./Box";
import FlexBox from "./FlexBox";
import Icon from "./icon/Icon";
import Typography from "./Typography";

const AppStore: React.FC = () => {
  return (
    <FlexBox flexWrap="wrap" m="-0.5rem">
      {appList.map((item) => (<a href="/" key={item.title} target="_blank" rel="noreferrer noopener">
          <Box
            display="flex"
            alignItems="center"

            borderRadius="5px"
            bg="#0C2A4D"
            color="white"
            p="3px 10px"
            cursor="pointer"
            m="0.5rem"
            style={{width:"140px"}}
          >
            <Icon defaultcolor="auto" size="24px">
              {item.iconName}
            </Icon>
            <Box ml="8px">
              <Typography fontSize="8px" fontWeight="600" lineHeight="1">
                {item.subtitle}
              </Typography>
              <Typography fontSize="14px" fontWeight="900">
                {item.title}
              </Typography>
            </Box>
          </Box>
        </a>
      ))}
    </FlexBox>
  );
};

const appList = [
  {
    iconName: "play-store",
    title: "Google Play",
    subtitle: "Загрузите в",
    url: "#",
  },
  {
    iconName: "app-store",
    title: "App Store",
    subtitle: "Загрузите на",
    url: "#",
  },
    {
    iconName: "telegram",
    title: "Telegram",
    subtitle: "Запустите",
    url: "#",
  },
];

export default AppStore;
