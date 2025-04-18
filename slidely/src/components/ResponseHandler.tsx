import { useEffect, useState } from "react";
import FlashCardHandler from "./FlashCardHandler";

type card = {
  id: number;
  frontHTML: string;
  backHTML: string;
};

type response = {
  response: string | null;
};

// Function to extract the dictionary
const extractTerms = (jsonString: string): card[] => {
  const termsString = jsonString.split("{");
  console.log("here", termsString);
  let terms: card[] = [];

  for (let i = 1; i < termsString.length; i++) {
    const index = termsString[i].split("definition");
    const key = index[0].slice(
      index[0].indexOf(":") + 3,
      index[0].indexOf(",") - 1
    );
    const value = index[1].slice(
      index[1].indexOf(":") + 3,
      index[1].indexOf("[")
    );

    const card: card = {
      id: i,
      frontHTML: key,
      backHTML: value,
    };
    terms.push(card);
  }

  return terms;
};

export default function ResponseHandler({ response }: response) {
  const [cards, setCards] = useState<card[]>([]);

  useEffect(() => {
    if (response) {
      setCards(extractTerms(response));
    }
  }, [response]);

  return <FlashCardHandler cards={cards} />;
}
