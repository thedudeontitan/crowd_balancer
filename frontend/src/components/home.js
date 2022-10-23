import { Text,StyleSheet,Image,View,ScrollView,FlatList,Button,Pressable, TouchableOpacity } from "react-native"


const DATA = [
  {
    id: 1,
    location: 'LIBRARY',
    crowd: "80",
  },
  {
    id: 2,
    location: 'MESS',
    crowd: 60,
  },
  {
    id: 3,
    location: 'COMPUTER LAB',
    crowd: 50,
  },
  {
    id: 4,
    location: 'GROUND',
    crowd: 50,
  },
];

export default function Home(){
  const onPress = () => 1;
    return(
      
        <View style={styles.container}>
            <Text style={styles.location}>
                LOCATIONS
            </Text>
            <FlatList
                data={DATA}
                
                renderItem={({item})=>(
                        <View style={[styles.card,styles.shadowProp]}>
                            <Text style={styles.head}>{item.location}</Text>
                            <Text style={styles.crowd}>Estimated crowd: {item.crowd}</Text>
                            <View style={styles.bar}>
                                <View style={styles.barVal}>
                                </View>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"center"}}>
                              <TouchableOpacity onpress={onPress}
                                style={styles.button}> 
                                <Text style={{color:'white',fontSize:15}}>Notify me</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onpress={onPress} 
                                style={styles.button}> 
                                <Text style={{color:'white',fontSize:15}}>Details</Text>
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
      backgroundColor: '#CDB4DB',
      
    },
    card:{
        backgroundColor: "white",
        width:"90%",
        height:210,
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
  