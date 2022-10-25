import { Text,StyleSheet,View,FlatList, TouchableOpacity,Alert} from "react-native"
import { useRoute } from "@react-navigation/native";


export default function Floor(){
    const onPress = () => 1;
    const route = useRoute();

    const {floors,location} = route.params;

    const notificationActive = ()=>{
        Alert.alert("Notification","You will be notified once crowd is less")
    }
    
    return(
        
        <View style={styles.container}>
            <Text style={styles.location}>
                {location}
            </Text>
            <FlatList
                data={floors}
                
                renderItem={({item})=>(
                        <View style={[styles.card,styles.shadowProp]}>
                            <Text style={styles.head}>{item.floor_no}</Text>
                            <Text style={styles.crowd}>Estimated crowd: {item.total_people}</Text>
                            <View style={styles.bar}>
                                <View style={{...styles.barVal,width:`${(item.total_people/item.total_capacity)*100}%`}}>
                                </View>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"center"}}>
                              <TouchableOpacity onPress={notificationActive}
                                style={styles.button}> 
                                <Text style={{color:'white',fontSize:15}}>Notify me</Text>
                              </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                keyExtractor={item => item.id}
            />
     </View>       
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      
    },
    card:{
        backgroundColor: "white",
        width:"90%",
        height:240,
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
        marginTop:20,
        fontSize:45,
        fontWeight:'bold',
        alignSelf:'center',
        color:'#7b03fc'
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
      marginTop:25,
      marginHorizontal:20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#7b03fc',
    },
  });
  