export function formatTime(input: Date): string {
    const inputTime = new Date(input);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const inputDate = inputTime.toDateString();
    const todayDate = today.toDateString();
    const yesterdayDate = yesterday.toDateString();

    if (inputDate === todayDate) {
        // Return the time in "HH:mm" format
        const hours = String(inputTime.getHours()).padStart(2, "0");
        const minutes = String(inputTime.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    } else if (inputDate === yesterdayDate) {
        return "yesterday";
    } else {
        // Return the date in "MM-DD-YYYY" format
        const month = String(inputTime.getMonth() + 1).padStart(2, "0");
        const day = String(inputTime.getDate()).padStart(2, "0");
        const year = inputTime.getFullYear();
        return `${month}-${day}-${year}`;
    }
}
export function formatTag(input: Date): string {
    const inputTime = new Date(input);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const inputDate = inputTime.toDateString();
    const todayDate = today.toDateString();
    const yesterdayDate = yesterday.toDateString();

    if (inputDate === todayDate) {
        return "today";
    } else if (inputDate === yesterdayDate) {
        return "yesterday";
    } else {
        // Return the date in "MM-DD-YYYY" format
        const month = String(inputTime.getMonth() + 1).padStart(2, "0");
        const day = String(inputTime.getDate()).padStart(2, "0");
        const year = inputTime.getFullYear();
        return `${month}-${day}-${year}`;
    }
}
export const getTime = (time: Date) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
    }${minutes}`;
};

export const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

export const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
};
