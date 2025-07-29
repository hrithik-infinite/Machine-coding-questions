import useMeasure from 'react-use/lib/useMeasure';

import Calendar from './Calendar.jsx';

export default function App() {
  const [containerRef, { width }] = useMeasure();

  return (
    <div className="App" ref={containerRef}>
      <Calendar />
    </div>
  );
}
