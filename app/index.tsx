import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, StatusBar} from 'react-native';
import { Link, router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const pathname = usePathname();
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => router.push('/')} style={{flexDirection:'row',alignItems:'center'}} activeOpacity={0.8}>
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/chef-hat.png' }} style={styles.logo} />
            <Text style={styles.title}>RecePlus</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.authButtons}>
          <Link href="/LoginScreen" style={styles.authButton}>
            <Text style={styles.authButtonText}>Iniciar Sesión</Text>
          </Link>
          <Link href="/RegisterScreen" style={[styles.authButton, styles.registerButton]}>
            <Text style={[styles.authButtonText, styles.registerButtonText]}>Registrarse</Text>
          </Link>
        </View>
      </View>

      {/* Contenido Principal */}
      <ScrollView>
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTag}>¡Descubre nuevas recetas!</Text>
            <Text style={styles.heroTitle}>
              Recetas personalizadas para <Text style={styles.highlight}>tus gustos</Text>
            </Text>
            <Text style={styles.heroDescription}>
              RecePlus te ayuda a encontrar recetas perfectas basadas en tus preferencias culinarias y los ingredientes que tienes disponibles.
            </Text>
            <View style={styles.heroButtons}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/preferences')}>
                <Text style={styles.buttonText}>Comenzar ahora</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/recipes')}>
                <Text style={styles.buttonText}>Explorar recetas</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={{ uri: 'https://www.bupasalud.com.mx/sites/default/files/inline-images/bupa_598072389.jpg' }}
            style={styles.heroImage}
          />
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={styles.sectionTag}>Cómo funciona</Text>
          <Text style={styles.sectionTitle}>Encuentra recetas en tres simples pasos</Text>
          <Text style={styles.sectionDescription}>
            RecePlus hace que encontrar recetas perfectas sea fácil y personalizado.
          </Text>
          <View style={styles.cardsContainerHowItWorks}>
            <View style={styles.cardHowItWorks}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>🔍</Text>
              </View>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitleHowItWorks}>1. <Text style={{fontWeight: 'bold'}}>Completa tus preferencias</Text></Text>
                <Text style={styles.cardDescriptionHowItWorks}>
                  Dinos qué alimentos te gustan, cuáles no, y cualquier restricción dietética que tengas.
                </Text>
              </View>
            </View>
            <View style={styles.cardHowItWorks}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>❤️</Text>
              </View>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitleHowItWorks}>2. <Text style={{fontWeight: 'bold'}}>Recibe recomendaciones</Text></Text>
                <Text style={styles.cardDescriptionHowItWorks}>
                  Nuestro sistema te sugerirá recetas personalizadas basadas en tus preferencias.
                </Text>
              </View>
            </View>
            <View style={styles.cardHowItWorks}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>🍽️</Text>
              </View>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitleHowItWorks}>3. <Text style={{fontWeight: 'bold'}}>Cocina y disfruta</Text></Text>
                <Text style={styles.cardDescriptionHowItWorks}>
                  Sigue las instrucciones detalladas y disfruta de deliciosas comidas adaptadas a tus gustos.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTag}>Características</Text>
          <Text style={styles.sectionTitleFeatures}>Todo lo que necesitas para descubrir nuevas recetas</Text>
          <Text style={styles.sectionDescriptionFeatures}>
            RecePlus ofrece herramientas poderosas para encontrar recetas que te encantarán.
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureRow}>
              <View style={styles.featureIconCircle}>
                <Text style={styles.featureIcon}>🔍</Text>
              </View>
              <View style={styles.featureTextBlock}>
                <Text style={styles.featureTitle}>Búsqueda por ingredientes</Text>
                <Text style={styles.featureDescription}>
                  Ingresa los ingredientes que tienes disponibles y encuentra recetas que puedes preparar ahora mismo.
                </Text>
              </View>
            </View>
            <View style={styles.featureRow}>
              <View style={styles.featureIconCircle}>
                <Text style={styles.featureIcon}>💚</Text>
              </View>
              <View style={styles.featureTextBlock}>
                <Text style={styles.featureTitle}>Recomendaciones personalizadas</Text>
                <Text style={styles.featureDescription}>
                  Recibe sugerencias de recetas basadas en tus preferencias y gustos culinarios.
                </Text>
              </View>
            </View>
            <View style={styles.featureRow}>
              <View style={styles.featureIconCircle}>
                <Text style={styles.featureIcon}>🟢</Text>
              </View>
              <View style={styles.featureTextBlock}>
                <Text style={styles.featureTitle}>Información detallada</Text>
                <Text style={styles.featureDescription}>
                  Conoce el tiempo de preparación, nivel de dificultad e ingredientes necesarios para cada receta.
                </Text>
              </View>
            </View>
            <View style={styles.featureRow}>
              <View style={styles.featureIconCircle}>
                <Text style={styles.featureIcon}>🟩</Text>
              </View>
              <View style={styles.featureTextBlock}>
                <Text style={styles.featureTitle}>Membresía premium</Text>
                <Text style={styles.featureDescription}>
                  Accede a funciones exclusivas y recetas premium con nuestra membresía de pago.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSectionCustom}>
          <Text style={styles.ctaTitleCustom}>¿Listo para descubrir nuevas recetas?</Text>
          <Text style={styles.ctaDescriptionCustom}>
            Regístrate hoy y comienza a explorar recetas personalizadas para ti.
          </Text>
          <TouchableOpacity style={styles.ctaButtonCustom} onPress={() => router.push('/RegisterScreen')}>
            <Text style={styles.ctaButtonTextCustom}>Crear cuenta gratis</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerColBrand}>
              <View style={styles.footerBrandRow}>
                <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/chef-hat.png' }} style={styles.footerLogo} />
                <Text style={styles.footerBrand}>RecePlus</Text>
              </View>
              <Text style={styles.footerText}>
                Tu asistente de recetas personalizado para descubrir nuevas delicias culinarias.
              </Text>
              <View style={styles.footerSocials}>
                <Image source={{ uri: 'https://img.icons8.com/ios-filled/24/4CAF50/facebook-new.png' }} style={styles.footerSocialIcon} />
                <Image source={{ uri: 'https://img.icons8.com/ios-filled/24/4CAF50/instagram-new.png' }} style={styles.footerSocialIcon} />
                <Image source={{ uri: 'https://img.icons8.com/ios-filled/24/4CAF50/twitter.png' }} style={styles.footerSocialIcon} />
              </View>
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>NAVEGACIÓN</Text>
              <TouchableOpacity onPress={() => router.push('/')}> <Text style={styles.footerLink}>Inicio</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/recipes')}> <Text style={styles.footerLink}>Recetas</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/preferences')}> <Text style={styles.footerLink}>Preferencias</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/membership')}> <Text style={styles.footerLink}>Membresía</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/contact')}> <Text style={styles.footerLink}>Contacto</Text> </TouchableOpacity>
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>LEGAL</Text>
              <Text style={styles.footerLink}>Política de privacidad</Text>
              <Text style={styles.footerLink}>Términos de servicio</Text>
              <Text style={styles.footerLink}>Política de cookies</Text>
            </View>
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>CONTACTO</Text>
              <TouchableOpacity onPress={() => router.push('/contact')}> <Text style={styles.footerLink}>Formulario de contacto</Text> </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}><Text style={styles.footerLink}>soporte@receplus.com</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {}}><Text style={styles.footerLink}>+1 (555) 123-4567</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerCopyright}>
            <Text style={styles.footerCopyrightText}>
              © 2025 RecePlus. Todos los derechos reservados.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, pathname === '/' && styles.activeNavItem]} 
          onPress={() => router.push('/')}
        >
          <Ionicons name="home-outline" size={24} color={pathname === '/' ? '#22c55e' : '#2e7d32'} />
          <Text style={[styles.navText, pathname === '/' && styles.activeNavText]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, pathname === '/recipes' && styles.activeNavItem]} 
          onPress={() => router.push('/recipes')}
        >
          <Ionicons name="book-outline" size={24} color={pathname === '/recipes' ? '#22c55e' : '#2e7d32'} />
          <Text style={[styles.navText, pathname === '/recipes' && styles.activeNavText]}>Recetas</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, pathname === '/dashboard' && styles.activeNavItem]} 
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="bar-chart-outline" size={24} color={pathname === '/dashboard' ? '#22c55e' : '#2e7d32'} />
          <Text style={[styles.navText, pathname === '/dashboard' && styles.activeNavText]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, pathname === '/preferences' && styles.activeNavItem]} 
          onPress={() => router.push('/preferences')}
        >
          <Ionicons name="settings-outline" size={24} color={pathname === '/preferences' ? '#22c55e' : '#2e7d32'} />
          <Text style={[styles.navText, pathname === '/preferences' && styles.activeNavText]}>Preferencias</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, pathname === '/membership' && styles.activeNavItem]} 
          onPress={() => router.push('/membership')}
        >
          <Ionicons name="person-outline" size={24} color={pathname === '/membership' ? '#22c55e' : '#2e7d32'} />
          <Text style={[styles.navText, pathname === '/membership' && styles.activeNavText]}>Membresía</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, pathname === '/contact' && styles.activeNavItem]} 
          onPress={() => router.push('/contact')}
        >
          <Ionicons name="mail-outline" size={24} color={pathname === '/contact' ? '#22c55e' : '#2e7d32'} />
          <Text style={[styles.navText, pathname === '/contact' && styles.activeNavText]}>Contacto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 0) + 10,
    paddingLeft: 20, // Añadido para mover el logo más a la izquierda
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  logo: {
    width: 32, 
    height: 32, 
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginLeft: 8,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    height: 40,
    marginTop: 14,
  },
  authButton: {
    paddingVertical: 6, // Reducido de 8
    paddingHorizontal: 10, // Reducido de 12
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 12, // Reducido de 14
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2e7d32',
  },
  registerButtonText: {
    color: '#2e7d32',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 100,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTag: {
    backgroundColor: '#a5d6a7',
    padding: 5,
    borderRadius: 5,
    color: '#2e7d32',
    fontSize: 14,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  highlight: {
    color: '#2e7d32',
  },
  heroDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 5,
  },
  secondaryButton: {
    backgroundColor: '#a5d6a7',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTag: {
    backgroundColor: '#a5d6a7',
    padding: 5,
    borderRadius: 5,
    color: '#2e7d32',
    fontSize: 14,
    alignSelf: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainerHowItWorks: {
    flexDirection: 'column',
    gap: 18,
    marginTop: 10,
  },
  cardHowItWorks: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e8fef3',
    borderRadius: 16,
    padding: 18,
    marginBottom: 0,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#d1fadf',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  iconEmoji: {
    fontSize: 26,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitleHowItWorks: {
    fontSize: 17,
    color: '#111',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  cardDescriptionHowItWorks: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  sectionTitleFeatures: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#111',
  },
  sectionDescriptionFeatures: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 18,
  },
  featuresList: {
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  featureIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#22c55e22',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  featureIcon: {
    fontSize: 22,
    color: '#22c55e',
  },
  featureTextBlock: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 19,
  },
  ctaSectionCustom: {
    padding: 28,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    borderRadius: 18,
    marginHorizontal: 18,
    marginVertical: 32,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaTitleCustom: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaDescriptionCustom: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 22,
  },
  ctaButtonCustom: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  ctaButtonTextCustom: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 32,
    paddingBottom: 80, // Aumentado para dar espacio a la barra de navegación
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 32,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 16,
    gap: 8,
  },
  footerColBrand: {
    flex: 1.2,
    minWidth: 180, // Reducido de 200
    maxWidth: 240, // Reducido de 260
    marginRight: 5, // Reducido de 10
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerLogo: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  footerBrand: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#22c55e',
  },
  footerText: {
    color: '#444',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 2,
  },
  footerSocials: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 2,
  },
  footerSocialIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  footerCol: {
    flex: 1,
    minWidth: 130, 
    maxWidth: 160, 
    marginRight: 5, 
  },
  footerColTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    color: '#222',
    letterSpacing: 1,
  },
  footerLink: {
    color: '#222',
    fontSize: 14,
    marginBottom: 6,
  },
  footerCopyright: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  footerCopyrightText: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8, // Reducido de 12
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 40 : 8, // Ajustado para iOS
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#2e7d32',
    marginTop: 4,
  },
  activeNavItem: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 4,
  },
  activeNavText: {
    color: '#22c55e',
    fontWeight: 'bold',
  }
});