import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Colors, theme} from '../../config/colors';
import CustomIcon from '../../component/CustomIcon';
import CacheImageComponent from '../../component/CacheImageComponent';
import FastImage from 'react-native-fast-image';
interface ProductProps {
  productName: string;
  imageUrl: string;
  productQuantity: string;
  onIncrementPress?: () => void;
  onDecrementPress?: () => void;
  onUploading?: boolean;
  quantity?: 0;
  onDeletePress?: () => void;
  onOrder?: boolean;
  isAdmin?: boolean;
  onEditPress?: () => void;
}

const ProductCard = ({
  productName,
  imageUrl,
  productQuantity,
  onIncrementPress,
  onDecrementPress,
  onUploading = false,
  quantity = 0,
  onDeletePress,
  onOrder = false,
  isAdmin = false,
  onEditPress,
}: ProductProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.imageContainer]}>
        <CacheImageComponent
          url={imageUrl}
          styles={[styles.imageStyle]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={[styles.bodyContainer]}>
        <View style={[styles.subtitleContainer]}>
          <Text
            style={[
              styles.productName,
              {
                color: Colors.black,
              },
            ]}
            numberOfLines={2}>
            {productName}
          </Text>
          {isAdmin ? (
            <TouchableOpacity
              style={[
                styles.actionButtonContainer,
                {backgroundColor: 'transparent'},
              ]}
              onPress={onEditPress}>
              <CustomIcon
                name={'ic_feather'}
                size={RFValue(15)}
                color={Colors.blue}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={[styles.subtitleContainer]}>
          <Text
            style={[
              // styles.productName,
              {
                color: Colors.lightBlack,
                opacity: 0.6,
                fontSize: RFValue(12),
                width: '60%',
              },
            ]}
            numberOfLines={2}>
            {productQuantity}
          </Text>
          <View style={[styles.actionContainer, {width: '40%'}]}>
            {onUploading ? (
              <ActivityIndicator size="small" color={theme.primaryColor} />
            ) : onOrder ? null : (
              <>
                {quantity !== 0 && (
                  <TouchableOpacity
                    style={[
                      styles.actionButtonContainer,
                      {backgroundColor: 'transparent', marginHorizontal: 5},
                    ]}
                    onPress={onDeletePress}>
                    <CustomIcon
                      name={'ic_bin'}
                      size={RFValue(18)}
                      color={Colors.blue}
                    />
                  </TouchableOpacity>
                )}
                {quantity !== 0 && (
                  <TouchableOpacity
                    style={styles.actionButtonContainer}
                    onPress={onDecrementPress}>
                    <CustomIcon
                      name={'ic_minus'}
                      size={RFValue(13)}
                      color={Colors.blue}
                    />
                  </TouchableOpacity>
                )}
                {quantity !== 0 && (
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: RFValue(15),
                      color: Colors.black,
                    }}>
                    {quantity}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.actionButtonContainer}
                  onPress={onIncrementPress}>
                  <CustomIcon
                    name={'ic_plus'}
                    size={RFValue(13)}
                    color={Colors.blue}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        {onOrder ? (
          <View style={[styles.subtitleContainer]}>
            <Text
              style={[
                styles.productName,
                {
                  color: Colors.black,
                  opacity: 0.8,
                  fontSize: RFValue(12),
                },
              ]}
              numberOfLines={1}>
              Quantity: {quantity}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    width: '98%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  imageContainer: {
    width: '25%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    width: '75%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-around',
  },
  productName: {
    fontSize: RFValue(13),
    width: '92%',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButtonContainer: {
    backgroundColor: Colors.lightPurple,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  actionButtonText: {
    color: Colors.blue,
    // backgroundColor: 'red',
    position: 'absolute',
    textAlign: 'center',
  },
  imageStyle: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
  },
});
export default React.memo(ProductCard);
