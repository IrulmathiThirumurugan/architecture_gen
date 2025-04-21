import Diagram from './components/Diagram';
import architecture from './data/architecture.json';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Architecture Diagram</h1>
      <Diagram architecture={architecture} />
    </div>
  );
}

export default App;
