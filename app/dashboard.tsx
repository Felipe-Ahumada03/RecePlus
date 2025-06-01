import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { usePathname, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from './UserContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const recipes = [
  {
    name: 'Pasta Carbonara',
    category: 'Italiana',
    ingredients: ['Pasta', 'Huevo', 'Panceta'],
  },
  {
    name: 'Tacos de Pollo',
    category: 'Mexicana',
    ingredients: ['Pollo', 'Tortilla', 'Salsa'],
  },
  {
    name: 'Ensalada Mediterránea',
    category: 'Mediterránea',
    ingredients: ['Atún', 'Tomate', 'Lechuga'],
  },
];

const categories = Array.from(new Set(recipes.map(r => r.category)));
const ingredientCount: Record<string, number> = {};
recipes.forEach(r => r.ingredients.forEach(i => {
  ingredientCount[i] = (ingredientCount[i] || 0) + 1;
}));
const topIngredients = Object.entries(ingredientCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3);

export default function Dashboard() {
  const pathname = usePathname(); 
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    router.replace('/LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/chef-hat.png' }} style={styles.logo} />
        <Text style={styles.title}>¡Bienvenido a RecePlus!</Text>
        {user && (
          <TouchableOpacity onPress={handleLogout} style={{ marginLeft: 'auto', backgroundColor: '#e8f5e9', padding: 8, borderRadius: 8 }}>
            <Text style={{ color: '#22c55e', fontWeight: 'bold' }}>Cerrar sesión</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.welcomeBox}>          <Text style={styles.welcomeTitle}>Tu dashboard culinario</Text>
          <Text style={styles.welcomeSubtitle}>Descubre tu progreso, estadísticas y recomendaciones personalizadas.</Text>
        </View>        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Ionicons name="book-outline" size={32} color="#22c55e" style={{marginBottom: 6}} />
            <Text style={styles.cardValue}>{recipes.length}</Text>
            <Text style={styles.cardLabel}>Recetas</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="grid-outline" size={32} color="#22c55e" style={{marginBottom: 6}} />
            <Text style={styles.cardValue}>{categories.length}</Text>
            <Text style={styles.cardLabel}>Categorías</Text>
          </View>
          <View style={styles.card}>
            <Ionicons name="star-outline" size={32} color="#22c55e" style={{marginBottom: 6}} />
            <Text style={styles.cardValue}>3</Text>
            <Text style={styles.cardLabel}>Favoritos</Text>
          </View>
        </View>
        <View style={styles.progressBox}>
          <Text style={styles.progressTitle}>Progreso semanal</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, {width: '60%'}]} />
          </View>
          <Text style={styles.progressText}>6 de 10 recetas cocinadas esta semana</Text>
        </View>
        <Text style={styles.sectionTitle}>Recetas por categoría</Text>
        <View style={styles.categoryList}>
          {categories.map(cat => (
            <View key={cat} style={styles.categoryItem}>
              <Ionicons name="restaurant-outline" size={20} color="#22c55e" style={{marginRight: 6}} />
              <Text style={styles.statLabel}>{cat}</Text>
              <Text style={styles.statValue}>{recipes.filter(r => r.category === cat).length}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Ingredientes más usados</Text>
        <View style={styles.ingredientList}>
          {topIngredients.map(([ing, count]) => (
            <View key={ing} style={styles.ingredientItem}>
              <Ionicons name="leaf-outline" size={20} color="#22c55e" style={{marginRight: 6}} />
              <Text style={styles.statLabel}>{ing}</Text>
              <Text style={styles.statValue}>{count}</Text>
            </View>
          ))}
        </View>
        {/* Footer Navegación, Legal y Contacto */}
        <View style={{marginTop: 40, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 24, paddingBottom: 80, paddingHorizontal: 10, backgroundColor: '#fff'}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8}}>
            <View style={{flex: 1, minWidth: 130, maxWidth: 160, marginRight: 5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: 8, color: '#222', letterSpacing: 1}}>NAVEGACIÓN</Text>
              <TouchableOpacity onPress={() => router.push('/')}> <Text style={styles.footerLink}>Inicio</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/recipes')}> <Text style={styles.footerLink}>Recetas</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/preferences')}> <Text style={styles.footerLink}>Preferencias</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/membership')}> <Text style={styles.footerLink}>Membresía</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/contact')}> <Text style={styles.footerLink}>Contacto</Text> </TouchableOpacity>
            </View>
            <View style={{flex: 1, minWidth: 130, maxWidth: 160, marginRight: 5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: 8, color: '#222', letterSpacing: 1}}>LEGAL</Text>
              <Text style={styles.footerLink}>Política de privacidad</Text>
              <Text style={styles.footerLink}>Términos de servicio</Text>
              <Text style={styles.footerLink}>Política de cookies</Text>
            </View>
            <View style={{flex: 1, minWidth: 130, maxWidth: 160, marginRight: 5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: 8, color: '#222', letterSpacing: 1}}>CONTACTO</Text>
              <TouchableOpacity onPress={() => router.push('/contact')}> <Text style={styles.footerLink}>Formulario de contacto</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}><Text style={styles.footerLink}>soporte@receplus.com</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {}}><Text style={styles.footerLink}>+1 (555) 123-4567</Text></TouchableOpacity>
            </View>
          </View>
          <View style={{borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, marginBottom: 20, alignItems: 'center', marginTop: 8}}>
            <Text style={{color: '#888', fontSize: 13, textAlign: 'center'}}>© 2025 RecePlus. Todos los derechos reservados.</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color={pathname === '/' ? '#22c55e' : '#2e7d32'} onPress={() => router.push('/')} />
        <Ionicons name="book-outline" size={24} color={pathname === '/recipes' ? '#22c55e' : '#2e7d32'} onPress={() => router.push('/recipes')} />
        <Ionicons name="bar-chart-outline" size={24} color={pathname === '/dashboard' ? '#22c55e' : '#2e7d32'} onPress={() => router.push('/dashboard')} />
        <Ionicons name="settings-outline" size={24} color={pathname === '/preferences' ? '#22c55e' : '#2e7d32'} onPress={() => router.push('/preferences')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  logo: { width: 32, height: 32, marginRight: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32' },
  content: { padding: 20 },
  welcomeBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  cardRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 2,
    elevation: 2,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e8f5e9',
  },
  cardValue: { fontSize: 28, fontWeight: 'bold', color: '#22c55e' },
  cardLabel: { fontSize: 14, color: '#2e7d32' },
  progressBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 10,
    padding: 16,
    marginBottom: 22,
    alignItems: 'center',
  },
  progressTitle: {
    fontWeight: 'bold',
    color: '#2e7d32',
    fontSize: 16,
    marginBottom: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 12,
    backgroundColor: '#22c55e',
    borderRadius: 8,
  },
  progressText: {
    color: '#444',
    fontSize: 13,
  },
  categoryList: {
    marginBottom: 18,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6fef9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e8f5e9',
  },
  ingredientList: {
    marginBottom: 18,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6fef9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e8f5e9',
  },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statLabel: { fontSize: 15, color: '#444' },
  statValue: { fontWeight: 'bold', color: '#22c55e' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', paddingVertical: 10, position: 'absolute', left: 0, right: 0, bottom: 0 },
  footerLink: { fontSize: 14, color: '#2e7d32', marginBottom: 6 },
});
