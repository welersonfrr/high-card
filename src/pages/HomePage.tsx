import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardData, DeckData, Result } from "../interfaces";
import CardCover from "../assets/playing-card-cover.jpg";
import {
  BalanceStatus,
  BetTime,
  PrepTime,
  Chip,
  BetButton,
  HistoryBoard,
} from "../components";
import { handleValue } from "../utils";

const HomePage = () => {
  const [deckData, setDeckData] = useState<DeckData>({});
  const [tableCards, setTableCards] = useState<CardData[]>([]);
  const [timerEffect, setTimerEffect] = useState(false);
  const [balance, setBalance] = useState<number>(100);
  const [seconds, setSeconds] = useState(0);
  const [cBet, setCBet] = useState(5);
  const [lBet, setLBet] = useState(0);
  const [rBet, setRBet] = useState(0);
  const [winner, setWinner] = useState("");
  const [historic, setHistoric] = useState<Result[]>([]);

  //   Get a new Deck from Deck of Cards API and set his data to a variable
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

  // Draw two cards of the deck previously stored.
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
    }
  };

  //   reset variables
  const betTimer = () => {
    setLBet(0);
    setRBet(0);
    setTimerEffect(true);
    setWinner("");
    setTableCards([]);
    setSeconds(5);
  };

  //   Handle results od the two cards drawed from the deck
  const handleResult = async (tableCards: CardData[]) => {
    const lCard = handleValue(tableCards[0]?.value);
    const rCard = handleValue(tableCards[1]?.value);

    if (lCard > rCard) {
      setWinner("L");
      setHistoric([...historic, { side: "L", color: "bg-blue-700" }]);
      setBalance(balance + lBet * 1.5);
    } else if (lCard < rCard) {
      setWinner("R");
      setHistoric([...historic, { side: "R", color: "bg-red-700" }]);
      setBalance(balance + rBet * 1.5);
    } else {
      setWinner("D");
      setHistoric([...historic, { side: "D", color: "bg-gray-700" }]);
      setBalance(balance);
    }

    setTimeout(() => {
      betTimer();
    }, 5000);
  };

  //   Handle the values of bets
  const handlePlaceBet = (side: string) => {
    if (timerEffect) {
      if (side === "L") {
        if (cBet <= balance) {
          setLBet(lBet + cBet);
          setBalance(balance - cBet);
        }
      }
      if (side === "R") {
        if (cBet <= balance) {
          setRBet(rBet + cBet);
          setBalance(balance - cBet);
        }
      }
    }
  };

  //   udeEffect to control bet time
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

  //   get a new deck and start game
  useEffect(() => {
    getNewDeck();
    setSeconds(3);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <BalanceStatus balance={balance} />
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
      <div className="mt-4">
        {seconds <= 0 ? (
          <PrepTime />
        ) : (
          <BetTime timerEffect={timerEffect} seconds={seconds} />
        )}
      </div>
      <div className="m-4 flex flex-row gap-5">
        <Chip
          cBet={cBet}
          clickFunction={() => setCBet(5)}
          value={5}
          bgColor="bg-slate-400"
        />
        <Chip
          cBet={cBet}
          clickFunction={() => setCBet(10)}
          value={10}
          bgColor="bg-pink-400"
        />
        <Chip
          cBet={cBet}
          clickFunction={() => setCBet(25)}
          value={25}
          bgColor="bg-green-400"
        />
        <Chip
          cBet={cBet}
          clickFunction={() => setCBet(50)}
          value={50}
          bgColor="bg-blue-400"
        />
      </div>

      <BetButton
        timerEffect={timerEffect}
        lBet={lBet}
        rBet={rBet}
        leftClickFunction={() => handlePlaceBet("L")}
        rightClickFunction={() => handlePlaceBet("R")}
      />

      <HistoryBoard historic={historic} />
    </div>
  );
};

export default HomePage;
