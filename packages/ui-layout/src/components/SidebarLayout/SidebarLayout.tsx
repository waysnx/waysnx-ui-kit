import React from "react";
import "./SidebarLayout.css";
export interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  sidebarWidth?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  children: React.ReactNode;
  sidebarLabel?: string;
  contentLabel?: string;
}

export function SidebarLayout({
  sidebar,
  orientation = "vertical",
  sidebarWidth = 280,
  collapsible = false,
  collapsed = false,
  children,
  sidebarLabel = "Sidebar",
  contentLabel = "Main content",
}: SidebarLayoutProps) {
  const isCollapsed = collapsible && collapsed;
  const sidebarStyle =
    orientation === "vertical"
      ? { width: isCollapsed ? 0 : sidebarWidth }
      : { height: isCollapsed ? 0 : sidebarWidth };
  return (
    <div className={`wx-sidebar-layout wx-sidebar-${orientation}`}>
      {!isCollapsed && (
        <aside 
          className="wx-sidebar" 
          style={sidebarStyle}
          role="complementary"
          aria-label={sidebarLabel}
        >
          {sidebar}
        </aside>
      )}
      <div className="wx-sidebar-content" role="main" aria-label={contentLabel}>
        {children}
      </div>
    </div>
  );
}
