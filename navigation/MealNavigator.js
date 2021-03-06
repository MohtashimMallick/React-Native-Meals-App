import React from "react";
import { createAppContainer } from "react-navigation";
import { Platform, Text } from "react-native"
import { createStackNavigator } from "react-navigation-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealScreen from "../screens/CategoryMealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/Colors";
// import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import FavoritesScreen from "../screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "react-navigation-drawer"
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === "android" ? 'white' : Colors.primaryColor

}

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealScreen,
    },
    MealDetail: MealDetailScreen,

}, {
    defaultNavigationOptions: defaultStackNavOption
})

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOption
})
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel : <Text style={{fontFamily:"open-sans-bold"}} >Meals</Text>
        },
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor

        }
    }
}
const MealsFavTabNavigator = Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
    })
    : createBottomTabNavigator(
        tabScreenConfig, {
        tabBarOptions: {
            labelStyle:{
                fontFamily:"open-sans"
            },
            activeTintColor: Colors.accentColor,
        }
    });
const FilterNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    // navigationOptions:{

    // },
    defaultNavigationOptions: defaultStackNavOption
})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FilterNavigator,
        navigationOptions: {
            drawerLabel: "Filters"
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: "open-sans-bold"
        }
    }
})

export default createAppContainer(MainNavigator);