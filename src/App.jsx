import { useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState(0);

  const [housing, setHousing] = useState(0);
  const [transport, setTransport] = useState(0);
  const [subscriptions, setSubscriptions] = useState(0);
  const [food, setFood] = useState(0);
  const [other, setOther] = useState(0);

  const totalExpenses =
    housing + transport + subscriptions + food + other;

  const left = income - totalExpenses;
  const savingsRate = income > 0 ? (left / income) * 100 : 0;

  function score() {
    if (left < 0) return 10;
    if (savingsRate <= 5) return 9;
    if (savingsRate <= 10) return 8;
    if (savingsRate <= 15) return 7;
    if (savingsRate <= 20) return 6;
    if (savingsRate <= 25) return 5;
    if (savingsRate <= 30) return 4;
    if (savingsRate <= 35) return 3;
    if (savingsRate <= 40) return 2;
    return 1;
  }

  function interpretation() {
    const s = score();
    if (s >= 9)
      return "Du har i princip ingen ekonomisk marginal. En oväntad utgift kan snabbt bli ett problem.";
    if (s >= 7)
      return "Du klarar vardagen, men är känslig för förändringar i kostnader eller inkomst.";
    if (s >= 5)
      return "Du är relativt stabil, men har begränsad flexibilitet.";
    if (s >= 3)
      return "Du har god kontroll och klarar oväntade utgifter.";
    return "Du har stark marginal och mycket hög ekonomisk flexibilitet.";
  }

  function valueClass(value) {
    if (value < 0) return "bad";
    if (value > 0) return "good";
    return "neutral";
  }

  return (
    <main>
      <h1>Hur körd är jag?</h1>
      <p>En ärlig kalkyl för din privatekonomi.</p>

      <div className="card">
        <label>
          Lön efter skatt (kr/mån)
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="card">
        <h2>Utgifter</h2>

        <label>
          Boende (hyra / lån)
          <input
            type="number"
            value={housing}
            onChange={(e) => setHousing(Number(e.target.value))}
          />
        </label>

        <label>
          Transport (bil, bränsle, kollektivt)
          <input
            type="number"
            value={transport}
            onChange={(e) => setTransport(Number(e.target.value))}
          />
        </label>

        <label>
          Abonnemang & fasta avgifter
          <input
            type="number"
            value={subscriptions}
            onChange={(e) =>
              setSubscriptions(Number(e.target.value))
            }
          />
        </label>

        <label>
          Mat & vardag
          <input
            type="number"
            value={food}
            onChange={(e) => setFood(Number(e.target.value))}
          />
        </label>

        <label>
          Övrigt
          <input
            type="number"
            value={other}
            onChange={(e) => setOther(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="card result">
        <p>
          Totala utgifter:{" "}
          <strong className="bad">
            {totalExpenses} kr
          </strong>
        </p>

        <p>
          Kvar efter allt:{" "}
          <strong className={valueClass(left)}>
            {left} kr
          </strong>
        </p>

        <p>
          Sparandegrad:{" "}
          <strong className={valueClass(savingsRate)}>
            {savingsRate.toFixed(1)}%
          </strong>
        </p>

        <p className="score">
          Hur körd är du?{" "}
          <strong className={score() >= 7 ? "bad" : "good"}>
            {score()} / 10
          </strong>
        </p>

        <p className="interpretation">
          {interpretation()}
        </p>
      </div>

      <footer>
        Ingen data sparas. Inget spåras. Bara siffror och verklighet.
      </footer>
    </main>
  );
}

export default App;
