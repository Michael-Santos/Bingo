import DrawTable from '../components/DrawTable';
import NumberList from '../components/NumberList';
import '../App.css';

function Jogos() {
  return (
    <div className="Jogos">
      <h1>Bingo Game</h1>
      <DrawTable />
      <NumberList drawnNumbers={[]} />
    </div>
  );
}

export default Jogos;