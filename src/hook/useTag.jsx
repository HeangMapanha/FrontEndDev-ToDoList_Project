import { useContext } from "react";
import { TagContext } from "../context/TagContext";

export function useTag() {
    const ctx = useContext(TagContext)

    if (!ctx) {
        throw new Error("useAuth must be inside tagContext.Provider") 
    } 

    return ctx
}