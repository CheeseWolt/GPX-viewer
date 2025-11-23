'use client';

import { useGpx } from './providers';

export default function Index() {
  const { uploadGpx } = useGpx();

  return (
    <div className="level mb-5">
      <div className="level-left">
        <div className="level-item">
          <div className="file is-primary">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept=".gpx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const text = e.target?.result as string;
                      uploadGpx(text);
                    };
                    reader.readAsText(file);
                  }
                }}
              />
              <span className="file-cta glass-panel" style={{ border: '1px solid var(--neon-primary)', boxShadow: '0 0 10px rgba(0, 209, 178, 0.2)' }}>
                <span className="file-label has-text-primary has-text-weight-bold">
                  Importer un fichier GPX
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
