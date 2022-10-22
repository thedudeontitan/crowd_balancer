import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#434C5E',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  
});
