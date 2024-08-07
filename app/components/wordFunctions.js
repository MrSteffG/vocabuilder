"use client";

//Fetches a random word
const fetchWord = async () => {
  const urlRandWord = "https://api.api-ninjas.com/v1/randomword";
  try {
    const response = await fetch(urlRandWord, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_NINJAS_KEY,
      },
    });
    const json = await response.json();
    const wordString = await json.word.toString();
    setRandomWord(wordString);
    console.log(`Random word is ${randomWord}`);
  } catch (error) {
    console.error(error);
  }
};

//Fetches the definition of the randomWord and sets the word and definition to defObj with an id
const fetchDef = async (word) => {
  const urlDefinition = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const response = await fetch(urlDefinition);
    const defJson = await response.json();
    const definition = await defJson[0].meanings[0].definitions[0].definition;
    setDefObj({
      id: Math.floor(Math.random() * 100),
      word: defJson[0].word,
      def: definition,
    });
    setWordArr([...wordArr, defObj]);
    console.log(wordArr);
  } catch (error) {
    console.log(error);
  }
};

//fetches random word then fetches the definition
const fetchWhole = async () => {
  fetchWord().then(fetchDef(randomWord));
};

const previousWord = () => {
  setDefObj(wordArr[wordArr.length - 1]);
};
