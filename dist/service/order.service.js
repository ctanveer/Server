import axios from "axios";
export const prepareForSkeleton = async (orderData) => {
    //   const allMenuItemsWithAdditionalDetails = await getMenuItemsByRestaurant(
    //     orderData.cartItems[0].resId
    //   );
    const headers = {
        "Content-Type": "application/json",
        Authorization: process.env.SKELETON_TOKEN,
    };
    const response = await axios.get(`${process.env.MENU_ITEMS}${orderData.cartItems[0].resId}`, { headers });
    const allMenuItemsWithAdditionalDetails = response.data;
    //   console.log(allMenuItemsWithAdditionalDetails);
    const addAdditionalDetails = await addDetailsToRestaurants(orderData, allMenuItemsWithAdditionalDetails);
    return {
        _id: orderData._id,
        restaurantId: parseInt(orderData.cartItems[0].resId),
        ...addAdditionalDetails,
    };
};
const addDetailsToRestaurants = async (orderData, allMenuItemsWithAdditionalDetails) => {
    //   console.log(orderData);
    const itemsWithDetails = orderData.cartItems.map((cartItem) => {
        const menuItem = allMenuItemsWithAdditionalDetails.filter((item) => {
            return item._id === cartItem._id;
        })[0];
        const addons = cartItem.addon?.map((item) => {
            return {
                ingredientName: item.name,
                _id: item._id,
                quantity: cartItem.quantity,
            };
        });
        const no = cartItem.no?.map((item) => {
            return {
                ingredientName: item.name,
                _id: item._id,
                quantity: cartItem.quantity,
            };
        });
        return {
            _id: cartItem._id,
            restaurantId: parseInt(cartItem.resId),
            categoryId: menuItem.categoryId,
            categoryName: menuItem.categoryName,
            mealTimeId: menuItem.mealTimeId,
            item: {
                _id: menuItem.item._id,
                itemId: 72,
                itemName: menuItem.item.itemName,
                itemImage: menuItem.item.itemImage,
                itemDescription: menuItem.item.itemDescription,
                itemQuantity: cartItem.quantity,
                itemPreparationTime: menuItem.item.itemPreparationTime,
                itemPackingType: menuItem.item.itemPackingType,
                itemLastingTime: menuItem.item.itemLastingTime,
                itemPortionSize: menuItem.item.itemPortionSize,
                ingredients: { ...menuItem.item.ingredients },
                options: menuItem.item.options,
                chosenOptions: {
                    add: addons,
                    no: no,
                    _id: "65b5044ebb8664a60a98dce2",
                },
                optionalNotes: "No salt please",
                itemPrice: menuItem.item.itemPrice,
                itemCalories: menuItem.item.itemCalories,
                timeOfDay: menuItem.item.timeOfDay,
                itemProfileTastyTags: menuItem.item.itemProfileTastyTags,
                typeOfFoods: menuItem.item.typeOfFoods,
                servingTemperature: menuItem.item.servingTemperature,
                itemDietaryRestrictions: menuItem.item.itemDietaryRestrictions,
                itemPackingDimension: menuItem.item.itemPackingDimension,
            },
        };
    });
    return {
        type: orderData.delivery ? "delivery" : "pickup",
        bill: orderData.subtotal,
        unit: "USD",
        status: "pending",
        vipCustomer: false,
        items: itemsWithDetails,
        createdAt: "",
    };
};
export const sendToSkeleton = async (preparedOrder) => {
    console.log(JSON.stringify(preparedOrder));
    const res = await axios.post(process.env.CREATE_ORDER, { order: preparedOrder }, { headers: { Authorization: process.env.SKELETON_TOKEN } });
    return res.data;
};
//# sourceMappingURL=order.service.js.map