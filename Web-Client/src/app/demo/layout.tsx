import { PanelProvider } from "components/panels/panel-context"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <PanelProvider>{children}</PanelProvider>
}
