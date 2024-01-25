import { getAllDeliveryRestaurant, createRestaurant, searchAllDeliveryRestaurant, getRestaurantById, getAllRestaurantsByCuisine } from "../models/restaurant/query.js";
import { getCuisines, getFilteredRestaurants } from "../service/restaurant.service.js";
export const getAllDeliveryRestaurantController = async (req, res) => {
    try {
        const deliveryRestaurants = await getAllDeliveryRestaurant();
        res.status(200).json(deliveryRestaurants);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export const getFilteredRestaurantsController = async (req, res) => {
    try {
        const mode = req.query.mode;
        const searchTerm = req.query.searchTerm;
        const cuisine = req.query.cuisine;
        const restaurants = await getFilteredRestaurants(mode, searchTerm, cuisine);
        res.status(200).json(restaurants);
        // res.status(200).json(req.query);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export const getCuisinesController = async (req, res) => {
    try {
        const cuisines = await getCuisines();
        res.json({ cuisines });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const createRestaurantController = async (req, res) => {
    try {
        const restaurantInfo = { ...req.body };
        const createdRestaurant = await createRestaurant(restaurantInfo);
        res.status(201).json(createdRestaurant);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
// Define the controller function
export const searchAllDeliveryRestaurantsController = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const results = await searchAllDeliveryRestaurant(searchTerm);
        res.json(results);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.restaurant_id;
        const restaurant = await getRestaurantById(restaurantId);
        if (restaurant) {
            res.status(200).json(restaurant);
        }
        else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
export const getAllRestaurantsByCuisineController = async (req, res) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await getAllRestaurantsByCuisine(cuisine);
        if (restaurants) {
            res.status(200).json(restaurants);
        }
        else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
//# sourceMappingURL=restaurant.controller.js.map