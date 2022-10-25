import {View,StyleSheet,Text,Image,TouchableOpacity,Button} from 'react-native';
import WavyBackground from 'react-native-wavy-background';
import { FontAwesome,Ionicons} from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function Home(){

    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            
            <View style={styles.topWavyHeader}>
            <WavyBackground
                height={250}
                width={1100}
                amplitude={50}
                frequency={1}
                offset={150}
                color="#1F618D"
                top
            />
            </View>

            <View style={{marginTop:220,alignSelf:'center'}}>
                <Image 
                    source={require('../assets/logo.png')}  
                    style={{ width: 300, height: 150 }}
                />
            </View>

            {/* card listing all navigation */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={()=>navigation.navigate("ProfileUser")}>
                    <View style={styles.option}>
                        <FontAwesome name="user" size={40} color="#1F618D" />
                        <Text style={{fontSize:15,textAlign:'center'}}>Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Location")}>
                    <View style={styles.option}>
                        <Ionicons name="location" size={40} color="#1F618D" />
                        <Text style={{fontSize:15}}>Location</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.Logout}>
                <Button title='Log Out' onPress={()=>navigation.navigate('UserLogIn')}/>
            </View>
        </View>
    )

}


styles = StyleSheet.create({
    container:{
        flex:1
    },
    topWavyHeader:{
        position:'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    optionsContainer:{
        width:"90%",
        flexDirection:'row',
        height:200,
        alignSelf:'center',
        marginTop: 80,
        justifyContent:'space-around',
        alignItems:'center',
    },
    option:{
        width:90,
        height:90,
        borderColor:'#1F618D',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingTop:10,
        paddingBottom:10
    },
    Logout:{
        width:'80%',
        alignSelf:'center',
        marginTop:40   
    }
})