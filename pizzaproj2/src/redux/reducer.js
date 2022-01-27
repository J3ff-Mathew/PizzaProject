
const cartCount = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "update": let total = JSON.parse(localStorage.getItem('cart')).length;
            return { count: total };
        default: return state;
    }
}
export default cartCount;
