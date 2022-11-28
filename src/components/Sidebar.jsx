import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const Sidebar = (props) => {
  const sidebarData = props.sideData;
  const { t } = useTranslation();
  return (
    <ul>
      {sidebarData.map((item) => {
        return (
          <li>
            <NavLink key={item.id}>{t(`${item.title}`)}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};
