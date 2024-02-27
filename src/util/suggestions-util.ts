import { Language } from "../types/Language";
import { DHRUVA_URL } from "../constants/Urls";

type Config = {
  numOptions?: number;
  showCurrentWordAsLastSuggestion?: boolean;
  lang?: Language;
};

export const getTransliterateSuggestions = async (
  word: string,
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

  if (word == '.' || word == '..') {
    word = ' ' + word;
  }
  word = encodeURIComponent(word);

  const body = {
    input: [
      {
        source: word,
      },
    ],
    config: {
      serviceId: "ai4bharat/indicxlit--gpu-t4",
      language: {
        sourceLanguage: "en",
        sourceScriptCode: "",
        targetLanguage: lang,
        targetScriptCode: ""
      },
      isSentence: false,
      numSuggestions: 5,
    },
    controlConfig: {
      dataTracking: true,
    },
  };

  try {
    const res = await fetch(DHRUVA_URL, {
      method: "post",
      body: JSON.stringify(body),
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization:
          "uOQOvZAkdKQpaeZa5-K03k9SIXOtZFEIkdj995-lTz_bozcijCNgVye2jEGIRFQG",
      })
    });

    const result = await res.json();
    console.log("library data", result);
    const data = result["output"][0];
    if (data && data.result.length > 0) {
      const found = showCurrentWordAsLastSuggestion
        ? [...data.target, word]
        : data.target;
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
