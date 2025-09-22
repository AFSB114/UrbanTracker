import { RouteProvider } from "./context/RouteContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RouteProvider>{children}</RouteProvider>;
}
