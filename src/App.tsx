import Rain from './Rain'

function App({numDrops = 12}: {numDrops: number}) {
  return (
    <Rain 
      numDrops={numDrops}
    />
  );  
}

export default App;
