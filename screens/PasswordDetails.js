// screens/PasswordDetails.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'; // Import for biometric authentication
import { db } from '../firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { decrypt, encrypt } from 'react-native-simple-encryption';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

const PasswordDetails = ({ route, navigation }) => {
  const { passwordId } = route.params;
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchPasswordDetails = async () => {
      try {
        const docRef = doc(db, 'passwords', passwordId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const encryptionKey = "my-secret-key";
          setWebsite(data.website);
          setUsername(data.username);
          setPassword(decrypt(encryptionKey, data.password));
        } else {
          Alert.alert("Error", "No such document!");
        }
      } catch (err) {
        console.error('Error fetching document:', err);
      }
    };

    fetchPasswordDetails();
  }, [passwordId]);

  const authenticateAndShowPassword = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Error", "Biometric authentication is not available on this device.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to view password',
      fallbackLabel: 'Enter device password'
    });

    if (result.success) {
      setShowPassword(!showPassword);
    } else {
      Alert.alert("Authentication failed", "You could not be authenticated.");
    }
  };

  const saveChanges = async () => {
    try {
      const encryptionKey = "my-secret-key";
      const encryptedPassword = encrypt(encryptionKey, password);

      const docRef = doc(db, 'passwords', passwordId);
      await updateDoc(docRef, {
        website: website,
        username: username,
        password: encryptedPassword,
      });

      Alert.alert("Success", "Changes saved successfully.");
      navigation.goBack(); // Navigate back after saving
    } catch (err) {
      console.error('Error updating password:', err);
      Alert.alert("Error", "Failed to save changes.");
    }
  };

  const deletePassword = async () => {
    try {
      await deleteDoc(doc(db, 'passwords', passwordId));
      Alert.alert("Success", "Password deleted successfully.");
      navigation.goBack();
    } catch (err) {
      console.error('Error deleting password:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Website"
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
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={authenticateAndShowPassword}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={deletePassword}>
        <Text style={styles.deleteButtonText}>Delete Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '600', 
    marginLeft: 10, 
    color: '#333' 
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 8, 
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  icon: { 
    padding: 10 
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  saveButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF3B30',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});

export default PasswordDetails;
