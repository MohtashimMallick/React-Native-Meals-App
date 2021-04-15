import React from 'react';
import { FlatList } from "react-native";
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from "../data/dummy-data";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';


const CategoriesScreen = (props) => {


    const renderGridItem = (itemData) => {
        return <CategoryGridTile
            imageUrl={itemData.item.imgUrl}
            title={itemData.item.title}
            color={itemData.item.color}
            onSelect={() => {
                props.navigation.navigate({
                    routeName: "CategoryMeals", params: {
                        categoryId: itemData.item.id
                    }
                })
            }} />
    }
    return (
        <FlatList keyExtractor={(item) => item.id} numColumns={2} data={CATEGORIES} renderItem={renderGridItem} />
    );
}

CategoriesScreen.navigationOptions = (navData) => {
    return {
        title: 'Meal Categories',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    }
};



export default CategoriesScreen;