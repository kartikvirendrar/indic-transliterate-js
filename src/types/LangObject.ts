import { Language } from "./Language"

export type LangObject = {
    "Author": String,
    "CompiledDate": String,
    "Direction": | "ltr" | "rtl",
    "DisplayName": String,
    "Identifier": Language,
    "IsStable": Boolean,
    "LangCode": Language
}