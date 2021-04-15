import React from 'react';
import MealList from '../components/MealList';
import { CATEGORIES } from "../data/dummy-data";
import { useSelector } from "react-redux";
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = (props) => {
    const availableMeals = useSelector(state => state.meals.filteredMeals)

    const catId = props.navigation.getParam('categoryId')
    const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

    if (displayMeals.length === 0 || !displayMeals) {
        return <View style={styles.content}>
            <DefaultText>No meals found. maybe check your filters?</DefaultText>
        </View>
    }
    return <MealList listData={displayMeals} navigation={props.navigation} />
}

CategoryMealScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
    return {
        title: selectedCategory.title
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})
export default CategoryMealScreen;