const fetchWord = async (): Promise<string> => {
  try {
    const response = await fetch(`/api/word`, {
      cache: 'no-store'
    });
    const { word } = await response.json();
    console.log(`Random word is ${word}`);
    return word
  } catch (error) {
    throw error;
  }
};

//Fetches the definition of the randomWord
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

//gets the random word which is passed into the function to fetch its definition
export const fetchWhole = async (): Promise<{ word: string, definition: string }> => {
  try {
    const word = await fetchWord();
    const definition = await fetchDef(word);
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
