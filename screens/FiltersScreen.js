import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from "react-native";
import { Switch } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from "../store/actions/meals";
const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer} >
            <Text>{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
            />
        </View>
    )
}

const FiltersScreen = (props) => {
    const { navigation } = props
    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)
    const dispatch = useDispatch()
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }
        dispatch(setFilters(appliedFilters))
        // return appliedFilters;
    }, [isGlutenFree, isVegetarian, isVegan, isLactoseFree])

    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters])
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Gluten-free"
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch
                label="Lactose-free"
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label="Vegan-free"
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch
                label="Vegetarian-free"
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />

        </View>
    );
}
FiltersScreen.navigationOptions = navData => {
    return {
        title: 'Filter Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title="Save" iconName='ios-save' onPress={navData.navigation.getParam('save')} />
        </HeaderButtons>    
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        margin: 20,
        textAlign: "center"
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        marginVertical: 15
    }
})

export default FiltersScreen;