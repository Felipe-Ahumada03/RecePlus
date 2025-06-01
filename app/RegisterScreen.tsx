import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './UserContext';

// Cambia esta IP por la de tu PC en la red local
const BACKEND_URL = '192.168.56.1:3000'; // <-- pon aquí tu IP local

export default function RegisterScreen({ navigation }: any) {
  const router = useRouter();
  const { setUser } = useUser();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      alert('Completa todos los campos');
      return;
    }
    if (password !== confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const id = email;
    try {
      const res = await fetch(`${BACKEND_URL}/usuarios/insertar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nombre: name })
      });
      if (res.ok) {
        setUser({ id, nombre: name, email });
        router.replace('/dashboard');
      } else {
        alert('No se pudo crear el usuario.');
      }
    } catch (e) {
      alert('Error de conexión con el backend.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity 
            onPress={() => router.push('/')} 
            style={styles.logoLink}
            activeOpacity={1}
          >
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/chef-hat.png' }} style={styles.logo} />
            <Text style={styles.brand}>RecePlus</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.main}>
        <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/4CAF50/chef-hat.png' }} style={styles.icon} />
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para descubrir recetas personalizadas</Text>
        <View style={styles.formBox}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan Pérez"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#bdbdbd"
          />
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="nombre@ejemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#bdbdbd"
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#bdbdbd"
          />
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholderTextColor="#bdbdbd"
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
          </TouchableOpacity>
          <Text style={styles.legalText}>
            Al registrarte, aceptas nuestros{' '}
            <Text style={styles.linkLegal}>términos de servicio</Text> y{' '}
            <Text style={styles.linkLegal}>política de privacidad</Text>.
          </Text>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => router.replace('/LoginScreen')}>
              <Text style={styles.loginText}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 35,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  logo: { width: 28, height: 28, marginRight: 8 },
  brand: { fontWeight: 'bold', fontSize: 20, color: '#22c55e' },
  logoLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: { padding: 6 },
  menuIcon: { fontSize: 22, color: '#222' },
  main: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  icon: { 
    width: 40, 
    height: 40, 
    marginBottom: 12, 
    marginTop: 0 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#222', 
    marginBottom: 4, 
    textAlign: 'center' 
  },
  subtitle: { 
    color: '#666', 
    fontSize: 13, 
    marginBottom: 12, 
    textAlign: 'center' 
  },
  formBox: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    alignSelf: 'center',
  },
  label: { 
    fontWeight: 'bold', 
    color: '#222', 
    marginBottom: 2, 
    fontSize: 13 
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    color: '#222',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 13,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  legalText: {
    color: '#888',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 2,
  },
  linkLegal: { color: '#22c55e', textDecorationLine: 'underline' },
  bottomRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  bottomText: { color: '#444', fontSize: 14 },
  loginText: { color: '#22c55e', fontWeight: 'bold', fontSize: 14 },
});
