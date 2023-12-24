import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, Feather, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";

const index = () => {
  return (
    <ScrollView>
      <LinearGradient colors={["#7F7FD5", "E9E4F0"]} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Feather name="bar-chart" size={24} color="red" />
            <Text style={{ color: "white", fontSize: 16, fontWeight: 600 }}>
              Employee Management System
            </Text>
            <Entypo name="lock" color="red" size={24} />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Pressable
              onPress={() => router.push("/(home)/employees")}
              style={{
                backgroundColor: "#D3CCE3",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ios-people-sharp" size={30} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Employee List
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(home)/markattendance")}
              style={{
                backgroundColor: "#D3CCE3",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ios-people-sharp" size={30} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Mark Attendance
              </Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 7,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#BE93C5",
              borderRadius: 6,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                padding: 7,
                width: 45,
                height: 45,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="newspaper-outline" size={24} color="black" />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                flex: 1,
              }}
            >
              Attendance Report
            </Text>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(home)/summary")}
            style={{
              backgroundColor: "#BE93C5",
              borderRadius: 6,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                padding: 7,
                width: 45,
                height: 45,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Octicons name="repo-pull" size={24} color="black" />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                flex: 1,
              }}
            >
              Summary Report
            </Text>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#BE93C5",
              borderRadius: 6,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                padding: 7,
                width: 45,
                height: 45,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Octicons name="report" size={24} color="black" />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                flex: 1,
              }}
            >
              All Generate Reports
            </Text>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#BE93C5",
              borderRadius: 6,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                padding: 7,
                width: 45,
                height: 45,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="people" size={24} color="black" />
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                flex: 1,
              }}
            >
              Overtime Employees
            </Text>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              backgroundColor: "#f79d00",
              borderRadius: 6,
              padding: 12,
              alignItems: "center",

              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="guy-fawkes-mask"
                size={24}
                color="black"
              />
            </View>
            <Text style={{ marginTop: 7 }}>Attendance Criteria</Text>
          </View>
          <View
            style={{
              backgroundColor: "#ABCABA",
              borderRadius: 6,
              padding: 12,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="bar-chart" size={24} color="black" />
            </View>
            <Text style={{ marginTop: 7 }}>Increased Workflow</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              backgroundColor: "#D3CCE3",
              borderRadius: 6,
              padding: 12,
              alignItems: "center",

              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="guy-fawkes-mask"
                size={24}
                color="black"
              />
            </View>
            <Text style={{ marginTop: 7 }}>Cost Savings</Text>
          </View>
          <View
            style={{
              backgroundColor: "#bdc3c7",
              borderRadius: 6,
              padding: 12,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 7,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="bar-chart" size={24} color="black" />
            </View>
            <Text style={{ marginTop: 7 }}>Employee Performance</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
