const fetchWord = async () => {
  const urlRandWord = "https://api.api-ninjas.com/v1/randomword";
  try {
    const response = await fetch(urlRandWord, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_NINJAS_KEY,
      } as any,
    });
    const json = await response.json();
    const wordString = await json.word.toString();
    console.log(`Random word is ${wordString}`);
    return wordString;
  } catch (error) {
    console.error(error);
  }
};

//fetchWord Eric - Read up on routing and migrate random word fetch back
/*
const fetchDef = async (word: string) => {
    const urlDefinition = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(urlDefinition, {
      cache: 'no-store'
    });
    const defJson = await response.json();
    const definition = defJson[0].meanings[0].definitions.find((def: any) => def.definition !== undefined)?.definition;
    if (definition !== undefined) {
      return {
        word: defJson[0].word,
        definition
      }
    }
  };
*/

//Fetches the definition of the randomWord
const fetchDef = async (word: string) => {
  const urlDefinition = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(urlDefinition, {
    cache: "no-store",
  });
  const defJson = await response.json();
  const definition = defJson[0].meanings[0].definitions.find(
    (def: any) => def.definition !== undefined,
  )?.definition;
  if (definition !== undefined) {
    return {
      word: defJson[0].word,
      definition,
    };
  }
};

//gets the random word which is passed into the function to fetch its definition
export const fetchWhole = async (): Promise<{
  word: string;
  definition: string;
}> => {
  try {
    const word = await fetchWord();
    console.log("fetchWord returns: " + word);
    const definition = await fetchDef(word);
    console.log(definition);
    return definition!;
  } catch (error: any) {
    if (error.title === "No Definitions Found") {
      // Generate a new word
      return await fetchWhole();
    } else {
      throw error;
    }
  }
};
