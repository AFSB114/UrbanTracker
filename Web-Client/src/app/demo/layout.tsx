
import { PanelActiveProvider } from "components/panels/panel-active-context";
import { PanelCollapseProvider } from "components/panels/panel-collapse-context";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelActiveProvider>
      <PanelCollapseProvider>
        {children}
      </PanelCollapseProvider>
    </PanelActiveProvider>
  );
}
