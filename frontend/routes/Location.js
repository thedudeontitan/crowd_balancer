import { Text,StyleSheet,View,FlatList, TouchableOpacity } from "react-native"


const DATA = [
    {
        "floors": [
            {
                "floor_no": "LIB_NO1",
                "id": 1,
                "total_capacity": 200,
                "total_people": 50
            },
            {
                "floor_no": "LIB_NO2",
                "id": 2,
                "total_capacity": 200,
                "total_people": 40
            },
            {
                "floor_no": "LIB_NO3",
                "id": 3,
                "total_capacity": 150,
                "total_people": 70
            }
        ],
        "id": 1,
        "name": "Library",
        "total_prople":90,
        "total_capacity":400
    },
    {
        "floors": [
            {
                "floor_no": "MESS_NO1",
                "id": 2,
                "total_capacity": 100,
                "total_people": 20
            }
        ],
        "id": 2,
        "name": "MESS",
        "total_prople":60,
        "total_capacity":100
    }
]
  



export default function Location({navigation}){


  // const [DATA,setData] = useState([]);

  const redirectFloor = (floors,location)=>{
    navigation.navigate("Floor",{floors:floors,location:location})
  }

    return(
      
        <View style={styles.container}>
            <Text style={styles.location}>
                LOCATIONS
            </Text>
            <FlatList
                data={DATA}
                style={{marginTop:30}}
                renderItem={({item})=>(
                        <View style={[styles.card,styles.shadowProp]}>
                            <Text style={styles.head}>{item.name}</Text>
                            <Text style={styles.crowd}>Estimated crowd: {item.total_prople}</Text>
                            <View style={styles.bar}>
                                <View style={{...styles.barVal,width:`${(item.total_prople/item.total_capacity)*100}%`}}>
                                </View>
                            </View>
                            <View style={{flexDirection:"row",justifyContent:"center"}}>
                              <TouchableOpacity 
                                style={styles.button}> 
                                <Text style={{color:'white',fontSize:15}}>Notify me</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={()=>{redirectFloor(item.floors,item.name)}} 
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
  