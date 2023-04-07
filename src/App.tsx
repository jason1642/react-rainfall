import Rain from './components/Rain/Rain'

interface AppProps {
  numDrops?: number;
}

const App: React.FunctionComponent<AppProps> = ({numDrops = 60})=>{

  return (
    <Rain 
      numDrops={numDrops}
    />
  );  
}

export default App;
