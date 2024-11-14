// AddPasswordScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { encrypt } from 'react-native-simple-encryption';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPasswordScreen = ({ navigation }) => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[\W_]/.test(password)) strength += 1;

    if (strength <= 2) return 'Weak';
    if (strength === 3) return 'Moderate';
    return 'Strong';
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    const strength = calculatePasswordStrength(text);
    setPasswordStrength(strength);
  };

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let generatedPassword = '';
    for (let i = 0; i < 12; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
    setPasswordStrength(calculatePasswordStrength(generatedPassword));
  };

  const savePassword = async () => {
    if (website && username && password) {
      if (passwordStrength !== 'Strong') {
        setError('Password strength must be Strong to save.');
        return;
      }

      try {
        const encryptionKey = "my-secret-key";
        const encryptedPassword = encrypt(encryptionKey, password);

        await addDoc(collection(db, 'passwords'), {
          website,
          username,
          password: encryptedPassword,
        });

        alert("Password saved successfully");
        navigation.navigate('PasswordManager');
      } catch (err) {
        console.error('Failed to save password:', err);
        setError('Failed to save password.');
      }
    } else {
      setError('All fields are required');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Website, App or Label"
        style={styles.input}
        value={website}
        onChangeText={setWebsite}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {password ? (
        <Text style={styles.strengthText}>Password Strength: {passwordStrength}</Text>
      ) : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={generateStrongPassword}>
        <Text style={styles.buttonText}>Generate Strong Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={savePassword}>
        <Text style={styles.buttonText}>Save Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15, 
    backgroundColor: '#f5f5f5'  // Lighter background for clean look
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 8, 
    backgroundColor: '#fff', 
    fontSize: 16, 
    borderColor: '#ccc' 
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: '#f5f5f5', 
    backgroundColor: '#f5f5f5', 
    padding: 10
  },
  icon: { 
    marginLeft: 10 
  },
  strengthText: { 
    color: 'green', 
    marginBottom: 10, 
    fontSize: 14 
  },
  error: { 
    color: 'red', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  button: { 
    backgroundColor: '#007AFF', 
    borderRadius: 8, 
    paddingVertical: 10, 
    marginBottom: 15 
  },
  saveButton: {
    backgroundColor: '#34C759'
  },
  buttonText: { 
    textAlign: 'center', 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});

export default AddPasswordScreen;
