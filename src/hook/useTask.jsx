import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export function useTask() {
    const ctx = useContext(TaskContext)

    if (!ctx) {
        throw new Error("useAuth must be inside TaskContext.Provider") 
    } 

    return ctx
}