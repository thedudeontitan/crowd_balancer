import { Text,StyleSheet,Image,View,ScrollView,FlatList,Button,Pressable, TouchableOpacity } from "react-native"
import locationform from "../locationform";

export default function Profile(){
  // const onPress = () => <locationform/>;
  const About = () => <locationform/>;
  profilename = ""
    return(
      
      <View style={styles.container}>
        <View style={[styles.card,styles.shadowProp]}>
                            <Text style={styles.head}>Name: {profilename}</Text>
                            <Text style={styles.crowd}></Text>
                            <View style={{flexDirection:"row",justifyContent:"center",top:470,left:40}}>
                              <TouchableOpacity onpress={About}
                                style={styles.button}> 
                                <Text style={{color:'white',fontSize:15}}>Create New location</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
      </View>       
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CDB4DB',
      
    },
    card:{
      alignSelf:'auto',
        backgroundColor: "white",
        width:"90%",
        height:"95%",
        margin: 15,
        borderRadius: 10
    },
    shadowProp: {
        elevation:5,
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.8,
        shadowRadius: 100,
      },
    location:{
        marginTop:10,
        margin:10,
        fontSize:40,
        fontWeight:'bold',
        alignSelf:'center'
    },
    head:{
        alignSelf:'center',
        fontSize:30,
        fontWeight:'bold',
        padding:15,
        color:'black'
    },
    crowd:{
        alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
        paddingBottom:15,
        color:'black'
    },
    bar:{
        
        alignSelf:"center",
        width:"80%",
        height:30,
        backgroundColor:"#A2D2FF",
        borderRadius: 90
    },
    barVal:{
        backgroundColor:"#FFC8DD",
        height:"100%",
        width:"80%",
        alignSelf:'flex-start',
        borderTopLeftRadius:90,
        borderBottomLeftRadius:90
    },
    button:{
      marginTop:15,
      marginHorizontal:20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#CDB4DB',
    },
  });
  