export const getXSRFToken = () => {
    return decodeURIComponent(
        document.cookie
            .split("; ")
            .find(row => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1] || ""
    );
}