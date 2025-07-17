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
import { signInWithEmail } from "../lib/auth";

/**
 * This is the screen for the login page
 * @param param0 contains navigation to the other screens outlined in app.tsx
 * @returns a login screen
 */
const Login = function Login({ navigation }: { navigation: any }) {
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
        text="Login"
        extraBtnDesign={{
          backgroundColor: "#F79633",
          width: 284,
          height: 56,
          marginTop: 35,
        }}
        extraTxtDesign={{ fontSize: 16, fontWeight: 600 }}
        action={async () => {
          await signInWithEmail(setLoading, email, password, navigation);
        }}
      ></CustomButton>
      <CustomText
        text="Don't have an account? Signup"
        textStyle={{ marginTop: 11, fontWeight: 600, color: "#FFFFFF" }}
        action={() => navigation.navigate("Signup")}
      ></CustomText>
    </Background>
  );
};

export default Login;
