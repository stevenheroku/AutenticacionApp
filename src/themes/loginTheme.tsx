import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer:{
        flex:1,
        paddingHorizontal:30,
        justifyContent:'center',
        height:600,
        marginBottom:50,
        backgroundColor:'#5856D6'
    },
    title:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        marginTop:20

    },
    label:{
        marginTop:25,
        color:'white',
        fontWeight:'bold'
    },
    inputField:{
        color:'white',
        fontSize:20,
        borderBottomColor:'white',
        borderBottomWidth:2
    },
    buttonContainer:{
        alignItems:'center',
        marginTop:50
    },
    button:{
        borderWidth:2,
        borderColor:'white',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:5
    },
    buttonText:{
        fontSize:18,
        color:'white'
    },
    newUserContainer:{
        alignItems:'flex-end',
        marginTop:10
    },
    buttonSalir:{
        position:'absolute',
        top:-650,
        left:-5,
        borderWidth:2,
        borderColor:'white',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:100,

    }
    
});