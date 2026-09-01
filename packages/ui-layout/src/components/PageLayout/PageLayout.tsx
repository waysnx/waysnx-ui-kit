import React from "react";
import "./PageLayout.css";
export interface PageLayoutProps { 
  children: React.ReactNode;
  label?: string;
}

export function PageLayout({ children, label }: PageLayoutProps) {
  return <div className="wx-page-layout" aria-label={label}>{children}</div>;
}
