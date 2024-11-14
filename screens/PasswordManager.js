// screens/PasswordManager.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const PasswordManager = ({ navigation }) => {
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState('');

  const fetchPasswords = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'passwords'));
      const passwordList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPasswords(passwordList.sort((a, b) => a.website.localeCompare(b.website)));
    } catch (error) {
      console.error('Failed to load passwords:', error.message);
      setError('Failed to load passwords.');
    }
  };

  useEffect(() => {
    fetchPasswords();
    const intervalId = setInterval(fetchPasswords, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getWebsiteIcon = (website) => {
    const site = website.toLowerCase();
  
    if (site.includes('google')) {
      return <Ionicons name="logo-google" size={24} color="#DB4437" />;
    } else if (site.includes('facebook')) {
      return <Ionicons name="logo-facebook" size={24} color="#4267B2" />;
    } else if (site.includes('twitter')) {
      return <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />;
    } else if (site.includes('apple')) {
      return <Ionicons name="logo-apple" size={24} color="#333333" />;
    } else if (site.includes('linkedin')) {
      return <Ionicons name="logo-linkedin" size={24} color="#0077B5" />;
    } else if (site.includes('github')) {
      return <Ionicons name="logo-github" size={24} color="#333" />;
    } else if (site.includes('amazon')) {
      return <Ionicons name="logo-amazon" size={24} color="#FF9900" />;
    } else if (site.includes('instagram')) {
      return <Ionicons name="logo-instagram" size={24} color="#E1306C" />;
    } else if (site.includes('snapchat')) {
      return <Ionicons name="logo-snapchat" size={24} color="#FFFC00" />;
    } else if (site.includes('whatsapp')) {
      return <Ionicons name="logo-whatsapp" size={24} color="#25D366" />;
    } else if (site.includes('youtube')) {
      return <Ionicons name="logo-youtube" size={24} color="#FF0000" />;
    } else if (site.includes('microsoft')) {
      return <Ionicons name="logo-microsoft" size={24} color="#737373" />;
    } else if (site.includes('paypal')) {
      return <Ionicons name="logo-paypal" size={24} color="#00457C" />;
    } else if (site.includes('slack')) {
      return <Ionicons name="logo-slack" size={24} color="#4A154B" />;
    } else if (site.includes('dropbox')) {
      return <Ionicons name="logo-dropbox" size={24} color="#0061FF" />;
    } else if (site.includes('netflix')) {
      return <Ionicons name="logo-netflix" size={24} color="#E50914" />;
    } else if (site.includes('spotify')) {
      return <Ionicons name="logo-spotify" size={24} color="#1DB954" />;
    } else if (site.includes('reddit')) {
      return <Ionicons name="logo-reddit" size={24} color="#FF4500" />;
    } else if (site.includes('pinterest')) {
      return <Ionicons name="logo-pinterest" size={24} color="#E60023" />;
    } else if (site.includes('tiktok')) {
      return <Ionicons name="logo-tiktok" size={24} color="#000000" />;
    } else if (site.includes('airbnb')) {
      return <Ionicons name="logo-airbnb" size={24} color="#FF5A5F" />;
    } else if (site.includes('ebay')) {
      return <Ionicons name="logo-ebay" size={24} color="#E53238" />;
    } else if (site.includes('adobe')) {
      return <Ionicons name="logo-adobe" size={24} color="#FF0000" />;
    } else if (site.includes('salesforce')) {
      return <Ionicons name="logo-salesforce" size={24} color="#00A1E0" />;
    } else if (site.includes('uber')) {
      return <Ionicons name="car-outline" size={24} color="#000000" />;
    } else if (site.includes('zoom')) {
      return <Ionicons name="videocam-outline" size={24} color="#2D8CFF" />;
    } else if (site.includes('shopify')) {
      return <Ionicons name="storefront-outline" size={24} color="#96BF48" />;
    } else if (site.includes('medium')) {
      return <Ionicons name="logo-medium" size={24} color="#12100E" />;
    } else if (site.includes('lpulive') && (site.includes('live')) ) {
      return <Ionicons name="chatbubble-outline" size={24} color="#FF8C00" />;
    } else if (site.includes('bing')) {
      return <Ionicons name="logo-microsoft" size={24} color="#008373" />;
    } else if (site.includes('yahoo')) {
      return <Ionicons name="globe-outline" size={24} color="#6001D2" />;
    } else if (site.includes('bbc')) {
      return <Ionicons name="globe-outline" size={24} color="#FF0000" />;
    } else if (site.includes('cnn')) {
      return <Ionicons name="globe-outline" size={24} color="#CC0000" />;
    } else if (site.includes('walmart')) {
      return <Ionicons name="cart-outline" size={24} color="#0071CE" />;
    } else if (site.includes('tesla')) {
      return <Ionicons name="car-outline" size={24} color="#CC0000" />;
    } else if (site.includes('stackoverflow')) {
      return <Ionicons name="code-outline" size={24} color="#FE7A16" />;
    } else if (site.includes('quora')) {
      return <Ionicons name="globe-outline" size={24} color="#B92B27" />;
    } else if (site.includes('netgear')) {
      return <Ionicons name="wifi-outline" size={24} color="#1A1A1A" />;
    } else if (site.includes('booking')) {
      return <Ionicons name="bed-outline" size={24} color="#003580" />;
    } else if (site.includes('expedia')) {
      return <Ionicons name="airplane-outline" size={24} color="#003F62" />;
    } else if (site.includes('tripadvisor')) {
      return <Ionicons name="globe-outline" size={24} color="#34E0A1" />;
    } else if (site.includes('hulu')) {
      return <Ionicons name="videocam-outline" size={24} color="#3DBB3D" />;
    } else if (site.includes('disney')) {
      return <Ionicons name="videocam-outline" size={24} color="#113CCF" />;
    } else if (site.includes('lyft')) {
      return <Ionicons name="car-outline" size={24} color="#FF00BF" />;
    } else if (site.includes('skype')) {
      return <Ionicons name="logo-skype" size={24} color="#00AFF0" />;
    } else if (site.includes('oracle')) {
      return <Ionicons name="cloud-outline" size={24} color="#F80000" />;
    } else if (site.includes('ibm')) {
      return <Ionicons name="globe-outline" size={24} color="#054ADA" />;
    } else if (site.includes('intel')) {
      return <Ionicons name="hardware-chip-outline" size={24} color="#0071C5" />;
    } else if (site.includes('amd')) {
      return <Ionicons name="hardware-chip-outline" size={24} color="#ED1C24" />;
    } else if (site.includes('nvidia')) {
      return <Ionicons name="hardware-chip-outline" size={24} color="#76B900" />;
    } else if (site.includes('lg')) {
      return <Ionicons name="tv-outline" size={24} color="#A50034" />;
    } else if (site.includes('samsung')) {
      return <Ionicons name="phone-portrait-outline" size={24} color="#1428A0" />;
    } else if (site.includes('oneplus')) {
      return <Ionicons name="phone-portrait-outline" size={24} color="#EB0029" />;
    } else if (site.includes('sony')) {
      return <Ionicons name="tv-outline" size={24} color="#000000" />;
    }else if (site.includes('lpu')) {
      return <Ionicons name="school-outline" size={24} color="#FF8C00" />;
    } else {
      return <Ionicons name="globe-outline" size={24} color="#777" />; // Default icon for other websites
    }
  };
  

  const getWebsiteShortName = (website) => {
    const site = website.toLowerCase();

    if (site.includes('google')) {
        return 'Google';
    } else if (site.includes('facebook')) {
        return 'Facebook';
    } else if (site.includes('twitter')) {
        return 'Twitter';
    } else if (site.includes('apple')) {
        return 'Apple';
    } else if (site.includes('linkedin')) {
        return 'LinkedIn';
    } else if (site.includes('github')) {
        return 'GitHub';
    } else if (site.includes('amazon')) {
        return 'Amazon';
    } else if (site.includes('instagram')) {
        return 'Instagram';
    } else if (site.includes('snapchat')) {
        return 'Snapchat';
    } else if (site.includes('whatsapp')) {
        return 'WhatsApp';
    } else if (site.includes('youtube')) {
        return 'YouTube';
    } else if (site.includes('microsoft')) {
        return 'Microsoft';
    } else if (site.includes('paypal')) {
        return 'PayPal';
    } else if (site.includes('slack')) {
        return 'Slack';
    } else if (site.includes('dropbox')) {
        return 'Dropbox';
    } else if (site.includes('netflix')) {
        return 'Netflix';
    } else if (site.includes('spotify')) {
        return 'Spotify';
    } else if (site.includes('reddit')) {
        return 'Reddit';
    } else if (site.includes('pinterest')) {
        return 'Pinterest';
    } else if (site.includes('tiktok')) {
        return 'TikTok';
    } else if (site.includes('airbnb')) {
        return 'Airbnb';
    } else if (site.includes('ebay')) {
        return 'eBay';
    } else if (site.includes('adobe')) {
        return 'Adobe';
    } else if (site.includes('salesforce')) {
        return 'Salesforce';
    } else if (site.includes('uber')) {
        return 'Uber';
    } else if (site.includes('zoom')) {
        return 'Zoom';
    } else if (site.includes('shopify')) {
        return 'Shopify';
    } else if (site.includes('medium')) {
        return 'Medium';
    }  else if (site.includes('bing')) {
        return 'Bing';
    } else if (site.includes('yahoo')) {
        return 'Yahoo';
    } else if (site.includes('bbc')) {
        return 'BBC';
    } else if (site.includes('cnn')) {
        return 'CNN';
    } else if (site.includes('walmart')) {
        return 'Walmart';
    } else if (site.includes('tesla')) {
        return 'Tesla';
    } else if (site.includes('stackoverflow')) {
        return 'Stack Overflow';
    } else if (site.includes('quora')) {
        return 'Quora';
    } else if (site.includes('netgear')) {
        return 'Netgear';
    } else if (site.includes('booking')) {
        return 'Booking';
    } else if (site.includes('expedia')) {
        return 'Expedia';
    } else if (site.includes('tripadvisor')) {
        return 'Tripadvisor';
    } else if (site.includes('hulu')) {
        return 'Hulu';
    } else if (site.includes('disney')) {
        return 'Disney';
    } else if (site.includes('lyft')) {
        return 'Lyft';
    } else if (site.includes('skype')) {
        return 'Skype';
    } else if (site.includes('oracle')) {
        return 'Oracle';
    } else if (site.includes('ibm')) {
        return 'IBM';
    } else if (site.includes('intel')) {
        return 'Intel';
    } else if (site.includes('amd')) {
        return 'AMD';
    } else if (site.includes('nvidia')) {
        return 'NVIDIA';
    } else if (site.includes('lg')) {
        return 'LG';
    } else if (site.includes('samsung')) {
        return 'Samsung';
    } else if (site.includes('oneplus')) {
        return 'OnePlus';
    } else if (site.includes('sony')) {
        return 'Sony';
    } else if (site.includes('lpulive') && site.includes('live')) {
        return 'LPU Live';
    } else if (site.includes('lpu')) {
        return 'LPU';
    } else {
        return 'Website'; // Default name for other websites
    }
};


  const renderPasswordItem = ({ item }) => (
    <TouchableOpacity
      style={styles.passwordCard}
      onPress={() => navigation.navigate('PasswordDetails', { passwordId: item.id })}
    >
      <View style={styles.cardContent}>
        {getWebsiteIcon(item.website)}
        <View style={styles.textContainer}>
          {/* Display short name instead of full website */}
          <Text style={styles.website}>{getWebsiteShortName(item.website)}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Passwords</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddPassword')}>
          <Ionicons name="add-circle-outline" size={30} color="#007AFF" />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={passwords}
        keyExtractor={(item) => item.id}
        renderItem={renderPasswordItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: { fontSize: 24, fontWeight: '600', color: '#333' },
  passwordCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: { flex: 1, marginLeft: 12 },
  website: { fontSize: 16, fontWeight: '500', color: '#333' },
  username: { fontSize: 14, color: '#777' },
  error: { color: 'red', textAlign: 'center', marginVertical: 10 },
  list: { paddingVertical: 10 },
});

export default PasswordManager;
