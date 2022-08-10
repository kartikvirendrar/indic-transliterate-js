import { LangObject } from "../types/LangObject";
import { BASE_URL } from "../constants/Urls";

export const getTransliterationLanguages = async(): Promise<LangObject[] | undefined> => {
    const apiURL = `${BASE_URL}languages`
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: 'GET',
    };
  
    try {
    //  console.log("try ");
      const res = await fetch(apiURL,requestOptions);
      const data = await res.json();
      // console.log("library data", data);
      return data;
    } catch (e) {
      // catch error
      console.error("There was an error with transliteration", e);
      return [];
    }
};