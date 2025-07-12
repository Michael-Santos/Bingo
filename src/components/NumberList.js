const NumberList = ({ drawnNumbers }) => {
  return (
    <div>
      <h2>Drawn Numbers</h2>
      <ul>
        {drawnNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

export default NumberList;