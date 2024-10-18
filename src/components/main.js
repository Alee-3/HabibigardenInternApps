import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import tw from '../utils/tailwind';
import {IconX} from 'tabler-icons-react-native';

export const Container = ({children}) => {
  return (
    <View style={tw`flex-1 bg-mainSB pt-1`}>
      <View style={tw`flex-1 bg-white rounded-t-7 p-5 py-7`}>{children}</View>
    </View>
  );
};

export const ContainerScrollView = ({
  refreshControl,
  style,
  contentContainerStyle,
  header = null,
  children,
  headerStyle,
  childrenStyle,
  ref = null,
  onScroll = null,
  scrollEventThrottle = null,
}) => {
  return (
    <ScrollView
      ref={ref}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      style={[tw`flex-1 bg-mainSB pt-1`, style]}
      contentContainerStyle={
        contentContainerStyle ? [tw`grow`, contentContainerStyle] : null
      }
      refreshControl={refreshControl}>
      <View>
        {header ? (
          <View style={[tw`flex-1 bg-white rounded-7 p-5`, headerStyle]}>
            {header}
          </View>
        ) : null}
        <View style={[tw`flex-1 p-5 py-7`, childrenStyle]}>{children}</View>
      </View>
    </ScrollView>
  );
};

export const TextBasic = ({style, numberOfLines = 0, children}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={'tail'}
      style={[tw`font-metroM text-gray-500 leading-5`, style]}>
      {children}
    </Text>
  );
};

export const HeaderBasic = ({
  title,
  icon = null,
  onPress = null,
  customRight = null,
}) => {
  return (
    <View style={[tw`flex-1 py-3 pl-5 bg-mainSB flex-row`]}>
      <Text style={[tw`font-metroSB text-black flex-1`]}>{title}</Text>
      {icon ? (
        <TouchableOpacity
          disabled={!onPress}
          onPress={onPress}
          style={tw`justify-center mr-5`}>
          {icon}
        </TouchableOpacity>
      ) : null}
      {customRight}
    </View>
  );
};
