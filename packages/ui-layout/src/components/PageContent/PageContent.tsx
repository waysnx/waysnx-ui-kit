import React from "react";
import "./PageContent.css";
export interface PageContentProps { 
  children: React.ReactNode;
  label?: string;
}

export function PageContent({ children, label }: PageContentProps) {
  return <main className="wx-page-content" role="main" aria-label={label}>{children}</main>;
}
