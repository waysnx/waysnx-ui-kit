import React from "react";
import "./PageHeader.css";
export interface PageHeaderProps { 
  children: React.ReactNode;
  label?: string;
}

export function PageHeader({ children, label }: PageHeaderProps) {
  return <header className="wx-page-header" role="banner" aria-label={label}>{children}</header>;
}
