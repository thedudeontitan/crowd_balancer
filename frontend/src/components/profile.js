import { Text,StyleSheet,Image,View,ScrollView,FlatList } from "react-native"


const DATA = [
  {
    id: 1,
    location: 'LIBRARY',
    crowd: 80,
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

export default function Profile(){
    return(
        // <ScrollView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.location}>
                LOCATIONS
            </Text>

            <FlatList
                data={DATA}
                renderItem={({item})=>(
                        <View style={[styles.card,styles.shadowProp]}>
                            <Text style={styles.head}>{item.location}</Text>
                            <View style={styles.bar}>
                                <View style={styles.barVal}>
                                </View>
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
        shadowColor:'#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity:0.3,
        width:"90%",
        shadowRadius: 3,
        height:200,
        margin: 15
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    location:{
        marginTop:10,
        margin:10,
        fontSize:40,
        fontWeight:'bold',
        alignSelf:'center'
    },
    head:{
        fontSize:30,
        fontWeight:'bold',
        padding:15,
        color:'black'
    },
    bar:{
        
        flex:3,
        bottom: 20,
        alignSelf:"center",
        width:"80%",
        height:20,
        backgroundColor:"red",
    },
    barVal:{
        height:"100%",
        
    },
  });
  