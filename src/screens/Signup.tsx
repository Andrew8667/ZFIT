import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Background from "../components/Background";
import CustomText from "../components/CustomText";
import UserInfo from "../components/UserInfo";
import CustomButton from "../components/CustomButton";
import { signUpWithEmail } from "../lib/auth";

/**
 * This is the screen for the Signup page
 * @param param0 contains navigation to the other screens outlined in app.tsx
 * @returns a Signup screen
 */
const Signup = function Signup({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Background extraStyle={{ alignItems: "center" }}>
      <CustomText
        text="ZFIT"
        textStyle={{
          fontWeight: 700,
          fontSize: 50,
          color: "#FFFFFF",
          marginTop: 260,
        }}
      ></CustomText>
      <UserInfo
        email={email}
        password={password}
        loading={loading}
        setEmail={setEmail}
        setPassword={setPassword}
        setLoading={setLoading}
      ></UserInfo>
      <CustomButton
        text="Signup"
        extraBtnDesign={{
          backgroundColor: "#F79633",
          width: 284,
          height: 56,
          marginTop: 35,
        }}
        extraTxtDesign={{ fontSize: 16, fontWeight: 600 }}
        action={async () => {
          await signUpWithEmail(setLoading, email, password, navigation);
        }}
      ></CustomButton>
      <CustomText
        text="Have an account? Login"
        textStyle={{ marginTop: 11, fontWeight: 600, color: "#FFFFFF" }}
        action={() => navigation.navigate("Login")}
      ></CustomText>
    </Background>
  );
};

export default Signup;
