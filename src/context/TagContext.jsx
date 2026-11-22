import { createContext, useState } from "react";

export const TagContext = createContext(null)

export function TagProvider ({children}) {
    const [tag, setTag] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem("tags", JSON.stringify(tasks));
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

    const addTag = () => {}
    const deleteTag = () => {}
    const editTag = () => {}
    const toggleTag = () => {}

    const value = {task, error}

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )

}

