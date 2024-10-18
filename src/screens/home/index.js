import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import StatusBarNew from '../../components/statusbars';
import { MainNavbar } from '../../components/navbars';
import tw from '../../utils/tailwind';
import { TextBasic } from '../../components/main';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this is a valid icon

const Home = ({ navigation }) => {
  const [listProject] = useState([
    {
      projectName: 'Inventory Table',
      developerName: 'Allegra',
      navigation: 'Table',
    },
  ]);

  return (
    <View style={tw`flex-1 pb-16`}>
      <StatusBarNew />
      <MainNavbar
        navigation={navigation}
        backButton={false}
        customTitle={
          <View style={tw`flex-1 justify-center`}>
            <Image
              source={require('../../../assets/logo1.png')}
              style={[tw`h-7 w-40`]}
            />
          </View>
        }
      />

      <ScrollView nestedScrollEnabled={true} style={tw`bg-mainSB flex-1`}>
        <View>
          {listProject.map((item) => (
            <TouchableOpacity
              key={item.projectName}
              onPress={() => item.navigation ? navigation.navigate(item.navigation) : null}
              style={tw`bg-white px-5 py-4 border-b border-gray-200`}
            >
              <View style={tw`flex-row items-center`}>
                <Icon name="code" size={28} color={'#2c58c2'} />
                <View style={tw`ml-3`}>
                  {/* Wrapping the text inside <Text> component */}
                  <TextBasic style={tw`font-metroSB text-black`}>
                    {item.projectName}
                  </TextBasic>
                  <TextBasic style={tw`text-xs2`}>
                    {item.developerName}
                  </TextBasic>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
