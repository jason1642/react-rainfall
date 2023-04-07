import Rain from './Rain'
import './App.css';

function App({numDrops = 12}: {numDrops: number}) {
  return (
    <Rain 
      numDrops={numDrops}
    />
  );  
}

export default App;
