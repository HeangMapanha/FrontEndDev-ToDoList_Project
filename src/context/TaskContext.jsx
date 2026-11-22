import { createContext, useState } from "react";

export const TaskContext = createContext(null)

export function TaskProvider ({children}) {
    const [task, setTask] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(tasks));
    }, [tasks]);


    console.log(error)
    // const login = (email, password) => {
    //     setError(null);
    //     if (email === "test@gmail.com" && password === "12345") {
    //         setUser({email})
    //         console.log(user)
    //     }
        
    //     else {
    //         setError("Invalid Email or password")
    //     }

    // }

    // const logout = () => setUser(null)

    const addTask = () => {}
    const deleteTask = () => {}
    const editTask = () => {}
    const toggleTask = () => {}
    const removeTagFromTasks = (tagId) =>
        setTasks((prev) =>
        prev.map((t) => ({ ...t, tagIds: t.tagIds.filter((id) => id !== tagId) }))
        );
    const clearComplete = () => {}

    const value = {task, error}

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )

}

