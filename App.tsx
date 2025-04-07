import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CardData {
  id: number;
  image: any;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleLike = (cardId: number): void => {
    setLikedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const handleShare = (title: string): void => {
    Alert.alert('Share', `Sharing ${title}`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };

  const cardsData: CardData[] = [
  
    {
      id: 2,
      image: require('./images/tokyo.png'),
      title: 'Tokyo',
      description: 'Another beautiful view',
    },
    {
      id: 3,
      image: require('./images/paris.png'),
      title: 'Paris',
      description: 'Nighttime Eiffel Tower. City of Love and Lights.',
    },
  ];

  const isDark = darkMode;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#1a1a1a' : '#fff' },
      ]}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Toggle Button */}
      <TouchableOpacity onPress={() => setDarkMode(!darkMode)} style={styles.toggleButton}>
        <Icon name={darkMode ? 'sun-o' : 'moon-o'} size={24} color={isDark ? '#fff' : '#111'} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {cardsData.map((card: CardData) => (
          <View
            key={card.id}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? '#2d2d2d' : '#fff',
                borderColor: isDark ? '#fff' : '#000',
              },
            ]}
          >
            <Image source={card.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>
                {card.title}
              </Text>
              <Text style={[styles.description, { color: isDark ? '#eee' : '#111' }]}>
                {card.description}
              </Text>
              <Text style={[styles.footer, { color: isDark ? '#ccc' : '#111' }]}>
                Posted by: Tejaswini Shet
              </Text>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => toggleLike(card.id)}>
                  <Icon
                    name={likedCards[card.id] ? 'heart' : 'heart-o'}
                    size={24}
                    color={likedCards[card.id] ? '#ff4444' : (isDark ? '#ccc' : '#666')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare(card.title)}>
                  <Icon name="share" size={24} color={isDark ? '#ccc' : '#666'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 15,
    marginTop: 20, // ⬅️ moved icon slightly down
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1.5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  footer: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
