import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {getDefaultHeaderHeight} from '@react-navigation/elements';
import {IconArrowBackUp} from 'tabler-icons-react-native';
import tw from '../utils/tailwind';
import { TextBasic } from './main';

export const MainNavbar = ({
  backButton = true,
  navigation,
  title,
  titleStyle,
  customTitle,
  customRight = null,
  customStyle,
}) => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View
      style={[
        tw`bg-hgSB flex-row items-center px-5 border-b-2 border-hgB`,
        {
          paddingTop: insets.top,
          height: headerHeight,
        },
        customStyle,
      ]}>
      {/* left side */}
      {backButton ? (
        <TouchableOpacity
          style={[tw`flex-1`]}
          onPress={() => navigation.goBack()}>
          <IconArrowBackUp size={23} color="#12646a" />
        </TouchableOpacity>
      ) : null}

      {/* middle side */}
      {customTitle ? (
        customTitle
      ) : (
        <TextBasic
          style={[
            tw`flex-5 text-center text-white font-metroSB text-base`,
            titleStyle,
          ]}>
          {title}
        </TextBasic>
      )}

      {/* right side */}
      {customRight ? customRight : <View style={tw`flex-1`} />}
    </View>
  );
};

export const BigNavbar = ({
  backButton = true,
  navigation,
  title,
  customTitle,
  customRight = null,
  customStyle,
}) => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return (
    <View
      style={[
        tw`flex-row items-center px-5 border-mainSB`,
        {height: headerHeight * 1.5, paddingTop: insets.top},
        customStyle,
      ]}>
      {/* left side */}
      {backButton ? (
        <TouchableOpacity
          style={tw`px-2 py-3`}
          onPress={() => navigation.goBack()}>
          <IconArrowBackUp size={28} color="#000" />
        </TouchableOpacity>
      ) : null}

      {/* middle side */}
      {customTitle ? (
        customTitle
      ) : (
        <Text style={[tw`flex-1 font-metroSB text-left text-black text-2xl`]}>
          {title}
        </Text>
      )}

      {/* right side */}
      {customRight ? customRight : <View style={tw`flex-1`} />}
    </View>
  );
};
