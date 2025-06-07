export default function ExploreLoading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  spinner: {
    width: '80px',
    height: '80px',
    border: '4px solid #cfd0d1',
    borderTop: '4px solid #3b82f6', // blue
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  } as React.CSSProperties,
};

// Inject global keyframes for spin animation
if (typeof window === 'undefined') {
  // Server-side: inject once during SSR
  const css = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  // Add to <head> using Next.js Head or <style> inside the component if needed
}
