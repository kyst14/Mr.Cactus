import { useContext } from "react";
import { StatusContext } from './StatusContext';

export function useStatus() {
    const ctx = useContext(StatusContext);
    if (!ctx) {
        throw new Error("useStatus must be used inside StatusProvider");
    }
    
    return ctx;
}