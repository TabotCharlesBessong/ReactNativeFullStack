import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const UserProfile = ({ item, userId }) => {
  const [connectionSent, setConnectionSent] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 9,
        marginHorizontal: 16,
        borderColor: 16,
        borderWidth: 1,
        marginVertical: 10,
        justifyContent: "center",
        height: Dimensions.get("window").height / 4,
        width: (Dimensions.get("window").width - 80) / 2,
      }}
    >
      <View>
        <Image
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            resizeMode: "cover",
          }}
          source={{ uri: item?.profileImage }}
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}>
          {item?.name}
        </Text>
        <Text style={{ textAlign: "center", marginLeft: 1, marginTop: 2 }}>
          Engineer Graduate | Linkedin member
        </Text>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
