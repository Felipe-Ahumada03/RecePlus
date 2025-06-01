import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform, Image, StatusBar, Alert, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

export default function Contact() {
  const [checked, setChecked] = React.useState(''); // Cambiado de 'no' a ''
  const pathname = usePathname();

  const handleSend = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      Alert.alert('Mensaje enviado', 'Tu mensaje ha sido enviado correctamente.');
    }, 100);
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, {justifyContent: 'flex-start'}]}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => router.push('/')} style={{flexDirection:'row',alignItems:'center'}} activeOpacity={0.8}>
              <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/chef-hat.png' }} style={styles.logo} />
              <Text style={styles.logoTitle}>RecePlus</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Contacto</Text>
          <Text style={styles.subtitle}>
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </Text>

          {/* Información de contacto */}
          <View style={styles.contactInfoContainer}>
            <Text style={styles.contactInfoTitle}>Información de contacto</Text>
            <Text style={styles.contactInfoSubtitle}>Otras formas de ponerte en contacto con nosotros</Text>
            
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={24} color="#2e7d32" />
              <View style={styles.contactItemContent}>
                <Text style={styles.contactItemTitle}>Correo electrónico</Text>
                <Text style={styles.contactItemText}>soporte@receplus.com</Text>
                <Text style={styles.contactItemSubtext}>Respondemos antes de 24 horas hábiles</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={24} color="#2e7d32" />
              <View style={styles.contactItemContent}>
                <Text style={styles.contactItemTitle}>Teléfono</Text>
                <Text style={styles.contactItemText}>+1 (555) 123-4567</Text>
                <Text style={styles.contactItemSubtext}>Lunes a viernes, 8:00 AM - 6:00 PM (EST)</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={24} color="#2e7d32" />
              <View style={styles.contactItemContent}>
                <Text style={styles.contactItemTitle}>Dirección</Text>
                <Text style={styles.contactItemText}>123 Calle Culinaria</Text>
                <Text style={styles.contactItemText}>Ciudad Gastronómica, CG 12345</Text>
                <Text style={styles.contactItemText}>País de las Recetas</Text>
              </View>
            </View>
          </View>

          <Text style={styles.formTitle}>Formulario de contacto</Text>
          <Text style={styles.formSubtitle}>
            Completa el formulario para enviarnos un mensaje
          </Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <TextInput 
                  style={styles.input}
                  placeholder="Tu nombre"
                  placeholderTextColor="#666"
                />
              </View>
              <View style={styles.inputHalf}>
                <TextInput 
                  style={styles.input}
                  placeholder="Tu apellido"
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            <TextInput 
              style={styles.input}
              placeholder="tu@ejemplo.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
            />

            <TextInput 
              style={styles.input}
              placeholder="Selecciona un asunto"
              placeholderTextColor="#666"
            />

            <TextInput 
              style={[styles.input, styles.textArea]}
              placeholder="Escribe tu mensaje aquí..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.radioLabel}>¿Eres usuario de RecePlus?</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity 
                style={[
                  styles.radioOption, 
                  checked === 'si' && styles.radioOptionSelected
                ]}
                onPress={() => setChecked('si')}
              >
                <View style={styles.radioCircle}>
                  {checked === 'si' && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={checked === 'si' ? styles.radioTextSelected : styles.radioText}>Sí</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.radioOption, 
                  checked === 'no' && styles.radioOptionSelected
                ]}
                onPress={() => setChecked('no')}
              >
                <View style={styles.radioCircle}>
                  {checked === 'no' && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={checked === 'no' ? styles.radioTextSelected : styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.submitButton} 
              activeOpacity={0.7}
              onPress={handleSend}
            >
              <Text style={styles.submitButtonText}>Enviar mensaje</Text>
            </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputGroup: {
    gap: 15,
    paddingBottom: 100,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputHalf: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  radioLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    minWidth: 120,
    justifyContent: 'center',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2e7d32',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2e7d32',
  },
  radioOptionSelected: {
    borderColor: '#2e7d32',
  },
  radioText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  radioTextSelected: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 8,
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: Platform.OS === 'ios' ? 50 : (StatusBar.currentHeight ?? 0) + 10,
    paddingHorizontal: 15,
    paddingBottom: 15,
    elevation: 3, // Añadido para Android
    shadowColor: '#000', // Añadido para iOS
    shadowOffset: { width: 0, height: 2 }, // Añadido para iOS
    shadowOpacity: 0.1, // Añadido para iOS
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  logoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginLeft: 8,
  },
  contactInfoContainer: {
    marginBottom: 80,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
  },
  contactInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2e7d32',
  },
  contactInfoSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  contactItemContent: {
    marginLeft: 15,
    flex: 1,
  },
  contactItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactItemText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  contactItemSubtext: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
