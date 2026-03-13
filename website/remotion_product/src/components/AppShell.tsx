import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { colors } from "../theme";

interface AppShellProps {
  breadcrumbs: string[];
  rightContent?: React.ReactNode;
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  breadcrumbs,
  rightContent,
  children,
  sidebarCollapsed = true,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: colors.bg.primary,
      }}
    >
      <Sidebar collapsed={sidebarCollapsed} />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopBar breadcrumbs={breadcrumbs} rightContent={rightContent} />
        <div style={{ flex: 1, overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
};
