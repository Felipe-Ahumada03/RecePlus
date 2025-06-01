import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router, usePathname } from 'expo-router';

// Cambia esta IP por la de tu PC en la red local
const BACKEND_URL = 'http://192.168.1.100:3000'; // <-- pon aquí tu IP local

export default function Recipes() {
  const pathname = usePathname();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/recetas`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Cargando recetas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {justifyContent: 'flex-start'}]}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => router.push('/')} activeOpacity={0.8} style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/chef-hat.png' }} style={styles.logo} />
            <Text style={styles.logoTitle}>RecePlus</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Recetas</Text>
        {recipes.length === 0 && <Text>No hay recetas disponibles.</Text>}
        {recipes.map((receta) => (
          <View key={receta.id} style={styles.recipeCard}>
            <Text style={styles.recipeName}>{receta.nombre}</Text>
            <Text style={styles.recipeIngredients}>Ingredientes: {receta.ingredientes?.join(', ')}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 32, height: 32, marginRight: 10 },
  logoTitle: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#2e7d32' },
  recipeCard: { backgroundColor: '#e8f5e9', borderRadius: 10, padding: 16, marginBottom: 12 },
  recipeName: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  recipeIngredients: { fontSize: 14, color: '#444', marginTop: 4 },
});
