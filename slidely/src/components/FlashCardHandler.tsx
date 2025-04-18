import { FlashcardArray } from "react-quizlet-flashcard";

type card = {
  id: number;
  frontHTML: string;
  backHTML: string;
};

type props = {
  cards: card[];
};

const frontContentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const backContentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  paddingLeft: "2em",
  paddingRight: "2em",
};

export default function FlashCardHandler(props: props) {
  return (
    <FlashcardArray
      cards={props.cards}
      frontContentStyle={frontContentStyle}
      backContentStyle={backContentStyle}
    ></FlashcardArray>
  );
}
