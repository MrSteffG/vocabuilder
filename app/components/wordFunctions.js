const fetchWord = async () => {
  const urlRandWord = "https://api.api-ninjas.com/v1/randomword";
  try {
    const response = await fetch(urlRandWord, {
      headers: {
        "x-api-key": "kOSm5RXchY0yvNn5T92DTA==NDQfoMYMJrnpymsK",
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

//Fetches the definition of the randomWord
const fetchDef = async (word) => {
  const urlDefinition = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const response = await fetch(urlDefinition);
    const defJson = await response.json();
    const definition = defJson[0].meanings[0].definitions[0].definition;
    if (definition != undefined) {
      setDef(definition);
      setWord(defJson[0].word);
    }
  } catch (error) {
    console.error(error);
    console.log("Undefined word");
  }
};

//gets the random word which is passed into the function to fetch its definition
const fetchWhole = async () => {
  fetchWord().then(fetchDef(randomWord));
};
