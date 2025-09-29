import { RouteProvider } from './routes/context/RouteContext';

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteProvider>
      {children}
    </RouteProvider>
  );
}