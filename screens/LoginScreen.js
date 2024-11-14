import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricLogin = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        fallbackLabel: 'Use Passcode',
      });

      if (biometricAuth.success) {
        navigation.navigate('PasswordManager');
      } else {
        Alert.alert('Authentication Failed', 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Biometric authentication is not available on this device.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="lock-outline" size={80} color="#007AFF" />
        <Text style={styles.title}>Secure Login</Text>
      </View>

      {isBiometricSupported ? (
        <>
          <TouchableOpacity style={styles.button} onPress={handleBiometricLogin}>
            <Icon name="fingerprint" size={30} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Login with Biometrics</Text>
          </TouchableOpacity>
          <Text style={styles.infoText}>Use your fingerprint, Face ID or Passcode to login.</Text>
        </>
      ) : (
        <Text style={styles.errorText}>Biometric authentication is not supported on this device.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#007AFF', 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default LoginScreen;
