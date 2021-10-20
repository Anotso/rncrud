import React, { useContext, useState } from "react"
import { Text, TextInput, View, StyleSheet, Button } from 'react-native'
import UsersContext from "../context/Userscontext"

export default ({route, navigation}) => {
    const [user, setUser] = useState(route.params ? route.params : {})
    const { dispatch } = useContext(UsersContext)

    return (
        <Text>
            <View style={style.form}>
                <Text>Nome</Text>
                <TextInput
                    style={style.input}
                    onChangeText={name=> setUser({...user, name})}
                    placeholder='Informe o nome'
                    value={user.name}
                />
                <Text>E-mail</Text>
                <TextInput
                    style={style.input}
                    onChangeText={email=> setUser({...user, email})}
                    placeholder='Informe o e-mail'
                    value={user.email}
                />
                <Text>URL do Avatar</Text>
                <TextInput
                    style={style.input}
                    onChangeText={avatarUrl=> setUser({...user, avatarUrl})}
                    placeholder='Informe o e-mail'
                    value={user.avatarUrl}
                />
                <Button
                    title='Salvar'
                    onPress={()=>{
                        dispatch({
                            type:user.id ? 'updateUser' : 'createUser',
                            payload: user,
                        })
                        navigation.goBack()
                    }}
                />
            </View>
        </Text>
    )
}

const style = StyleSheet.create({
    form:{
        padding:12
    },
    input:{
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    }
})