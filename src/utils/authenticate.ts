export const authenticate = () => {
    return !!sessionStorage.getItem("token");
}