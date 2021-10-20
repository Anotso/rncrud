import React, { useContext } from "react"
import { View, FlatList, Alert } from 'react-native'
import { ListItem, Avatar, Button  } from "react-native-elements"
import UsersContext from "../context/Userscontext"
// import { Icon } from "react-native-vector-icons"
import users from '../data/users'

export default props => {

    const {state, dispatch} = useContext(UsersContext)

    function confirmUserDelete(user) {
        Alert.alert('Excluir usuário', `Deseja escluir o usuário ${user.name}?`,[
            {
                text: 'Sim',
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {text: 'Não'}
        ])
    }

    function getUserItem({ item: user }){
        return (
            <ListItem.Swipeable
                key={user.id}
                bottomDivider
                // onPress={()=>{
                //     props.navigation.navigate('UserForm')
                // }}
                leftContent={
                    <Button
                        title="Edit"
                        icon={{ name: 'edit', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'orange' }}
                        onPress={() => props.navigation.navigate('UserForm', user)}
                    />
                }
                rightContent={
                    <Button
                        title="Delete"
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                        onPress={() => confirmUserDelete(user)}
                    />
                }
            >
                <Avatar source={{uri: user.avatarUrl}} />
                <ListItem.Content>
                    <ListItem.Title>
                        {user.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        {user.email}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem.Swipeable>
        )
    }

    return (
        <View>
            <FlatList
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}