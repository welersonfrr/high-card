import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardData, DeckData } from "../interfaces";
import CardCover from "../assets/playing-card-cover.jpg";

const HomePage = () => {
  const [deckData, setDeckData] = useState<DeckData>({});
  const [tableCards, setTableCards] = useState<CardData[]>([]);
  const [timerEffect, setTimerEffect] = useState(false);
  const [saldo, setSaldo] = useState(100);
  const [seconds, setSeconds] = useState(0);
  const [cBet, setCBet] = useState(5);
  const [lBet, setLBet] = useState(0);
  const [rBet, setRBet] = useState(0);
  const [winner, setWinner] = useState("");

  const getNewDeck = async () => {
    try {
      const deckData = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeckData(deckData.data);
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  const drawCards = async () => {
    if (deckData.deck_id != undefined) {
      setTimerEffect(false);
      await axios
        .get(
          `https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=2`
        )
        .then((response) => {
          setTableCards(response.data.cards);
          handleResult(response.data.cards);
        })
        .catch((error) => console.log(error));
      // .finally(() => handleResult());
    }
  };

  const betTimer = () => {
    setTimerEffect(true);
    setWinner("");
    setTableCards([]);
    setSeconds(5);
  };

  const handleValue = (value: any) => {
    switch (value) {
      case "ACE":
        return 1;
      case "JACK":
        return 11;
      case "QUEEN":
        return 12;
      case "KING":
        return 13;
      default:
        return Number(value);
    }
  };

  const resetBet = () => {
    setLBet(0);
    setRBet(0);
  };

  const handleResult = async (tableCards: any) => {
    const lCard = handleValue(tableCards[0]?.value);
    const rCard = handleValue(tableCards[1]?.value);
    if (lCard > rCard) {
      setWinner("L");
      setSaldo(saldo + lBet * 1.5);
    } else if (lCard < rCard) {
      setWinner("R");
      setSaldo(saldo + rBet * 1.5);
    } else {
      console.log(lCard, rCard);
      setWinner("D");
    }

    resetBet();
    setTimeout(() => {
      betTimer();
    }, 5000);
  };

  const handlePlaceBet = (side: string) => {
    if (timerEffect) {
      if (side === "L") {
        if (cBet <= saldo) {
          setLBet(lBet + cBet);
          setSaldo(saldo - cBet);
        }
      }
      if (side === "R") {
        if (cBet <= saldo) {
          setRBet(rBet + cBet);
          setSaldo(saldo - cBet);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 800);
    if (seconds === 0) {
      setTimerEffect(false);
      drawCards();
    }

    return () => clearInterval(interval);
  }, [seconds]);

  //   get a new deck data
  useEffect(() => {
    getNewDeck();
    setSeconds(5);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed top-2 left-2 flex items-center justify-center bg-white border-2 rounded-lg w-auto min-w-[100px] h-12 font-bold">
        {"$ "}
        {saldo}
      </div>

      <div className="flex flex-row w-auto h-auto gap-2 mt-16">
        <img
          src={tableCards[0] === undefined ? CardCover : tableCards[0].image}
          alt="Card Cover"
          className={` ${winner === "L" ? "shadow-xl" : ""} ${
            timerEffect ? "animate-rotateCover" : "animate-rotateFront"
          } shadow-white w-[184.25px] h-64 rounded-lg`}
        />
        <img
          src={tableCards[1] === undefined ? CardCover : tableCards[1].image}
          alt="Card Cover"
          className={`${winner === "R" ? "shadow-xl" : ""} ${
            timerEffect ? "animate-rotateCover" : "animate-rotateFront"
          } shadow-white w-[184.25px] h-64 rounded-lg`}
        />
      </div>
      {seconds <= 0 ? (
        <div className="w-auto h-20 gap-3 flex flex-col items-center justify-center text-white font-bold text-[1rem]">
          <p>Aguarde! a Rodada de apostas começará em breve</p>
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className={` ${
            timerEffect && "animate-popup"
          } w-10 h-20 flex items-center justify-center text-white font-bold text-[1.5rem]`}
        >
          {seconds}
        </div>
      )}
      <div className="m-4 flex flex-row gap-5">
        <button
          className={` ${
            cBet === 5 ? " outline-dotted " : ""
          } bg-slate-400 text-white w-10 h-10 font-bold rounded-full shadow-md border-4 border-dashed`}
          onClick={() => setCBet(5)}
        >
          5
        </button>
        <button
          className={` ${
            cBet === 10 ? " outline-dotted " : ""
          }bg-pink-400 text-white w-10 h-10 font-bold rounded-full shadow-md border-4 border-dashed`}
          onClick={() => setCBet(10)}
        >
          10
        </button>
        <button
          className={` ${
            cBet === 25 ? " outline-dotted " : ""
          }bg-green-400 text-white w-10 h-10 font-bold rounded-full shadow-md border-4 border-dashed`}
          onClick={() => setCBet(25)}
        >
          25
        </button>
        <button
          className={` ${
            cBet === 50 ? " outline-dotted " : ""
          }bg-blue-400 text-white w-10 h-10 font-bold rounded-full shadow-md border-4 border-dashed`}
          onClick={() => setCBet(50)}
        >
          50
        </button>
      </div>
      <div className="w-[400px] h-[120px] flex flex-row">
        <div
          className={`h-full w-1/2 bg-blue-700 flex flex-col justify-start ${
            timerEffect === true ? "cursor-pointer" : " cursor-not-allowed"
          } rounded-l-2xl border-2 border-transparent hover:border-white`}
          onClick={() => handlePlaceBet("L")}
        >
          <p className="p-1 flex uppercase text-white font-semibold">LEFT</p>
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[1.5rem] text-white font-bold">
              {lBet > 0 ? lBet : ""}
            </p>
          </div>
        </div>
        <div
          className={`h-full w-1/2 bg-red-700  flex flex-col justify-end ${
            timerEffect === true ? "cursor-pointer" : " cursor-not-allowed"
          } rounded-r-2xl border-2 border-transparent hover:border-white`}
          onClick={() => handlePlaceBet("R")}
        >
          <p className="p-1 w-full flex justify-end uppercase text-white font-semibold">
            RIGHT
          </p>
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[1.5rem] text-white font-bold">
              {rBet > 0 ? rBet : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
