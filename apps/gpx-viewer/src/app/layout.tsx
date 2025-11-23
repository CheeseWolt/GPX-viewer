import 'bulma/css/bulma.min.css';
import './global.css';
import { GpxProvider } from './providers';

export const metadata = {
  title: 'GPX Visualizer',
  description: 'Visualize your running tracks',
};

export default function RootLayout({
  children,
  map,
  stats,
}: {
  children: React.ReactNode;
  map: React.ReactNode;
  stats: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GpxProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)' }}>
            <nav className="navbar is-transparent" role="navigation" aria-label="main navigation" style={{ backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.3)' }}>
              <div className="navbar-brand">
                <a className="navbar-item has-text-primary has-text-weight-bold is-size-4 neon-text" href="#">
                  GPX Visualizer
                </a>
              </div>
            </nav>

            <div className="section" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="container is-fluid" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Upload Control Area (children) */}
                <div className="mb-5">
                  {children}
                </div>

                {/* Dashboard Grid */}
                <div className="dashboard-grid" style={{ flex: 1 }}>
                  <div className="map-area" style={{ height: '100%', minHeight: '400px' }}>
                    {map}
                  </div>
                  <div className="stats-area" style={{ height: '100%' }}>
                    {stats}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </GpxProvider>
      </body>
    </html>
  );
}
