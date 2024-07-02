import { Language } from "../types/Language";

type Config = {
  numOptions?: number;
  showCurrentWordAsLastSuggestion?: boolean;
  lang?: Language;
};

export const getTransliterateSuggestions = async (
  word: string,
  customApiURL: string,
  config?: Config,
): Promise<string[] | undefined> => {
  const { showCurrentWordAsLastSuggestion, lang } = config || {
    numOptions: 5,
    showCurrentWordAsLastSuggestion: true,
    lang: "hi",
  };
  // fetch suggestion from api
  // const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${word}`;
  // let myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
  };

  try {
    const res = await fetch(
      customApiURL +
        `${lang}/${
          word === "." || word === ".."
            ? " " + word.replace(".", "%2E")
            : encodeURIComponent(word).replace(".", "%2E")
        }`,
      requestOptions,
    );
    let data = await res.json();
    console.log("library data", data);
    if(!customApiURL.includes("xlit-api")){
      data.result = data.output[0].target;
    }
    if (data && data.result.length > 0) {
      const found = showCurrentWordAsLastSuggestion
        ? [...data.result, word]
        : data.result;
      return found;
    } else {
      if (showCurrentWordAsLastSuggestion) {
        return [word];
      }
      return [];
    }
  } catch (e) {
    // catch error
    console.error("There was an error with transliteration", e);
    return [];
  }
};