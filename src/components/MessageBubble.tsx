import { useMemo } from "react";


export default function MessageBubble({ type, text, timestamp }: {
    type: string;
    text: string;
    timestamp: string;
}) {
    const messageTime = useMemo(() => {
        const date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes()}`
    }, [timestamp]);
    return (
        <div className={`p-2 max-w-[90%] min-w-16 rounded-md font-normal text-[18px] ${type === "sender" ? "self-end bg-secondary-default-200 rounded-bl-0 mt-2" : "self-start bg-primary-default-600 text-black rounded-br-0 mt-1"}`}>
            {text}
            <div className={`text-[12px] ${type === "sender" ? "text-secondary-default-500" : "text-gray-200"}`}>{messageTime}</div>
        </div>
    )
}