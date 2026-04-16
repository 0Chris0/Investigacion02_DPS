import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Animated
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { getSensorData } from '../services/ApiService'; // IMPORTANTE

export default function Screen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [modoAR, setModoAR] = useState(false);
  const [cargando, setCargando] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [datos, setDatos] = useState({
    temperatura: 0,
    humedad: 0,
    dispositivo: "CARGANDO...",
    lugar: "BUSCANDO UBICACIÓN...",
    estado: "CONECTANDO...",
    ultimaSincro: "--:--:--"
  });

  // FUNCIÓN CORREGIDA: Llama a la API real de Open-Meteo
  const actualizarDatos = async () => {
    setCargando(true);
    const resultado = await getSensorData(); 

    if (resultado) {
      setDatos({
        temperatura: resultado.temperatura,
        humedad: resultado.humedad,
        dispositivo: resultado.dispositivo,
        lugar: resultado.ubicacion,
        estado: resultado.estado,
        ultimaSincro: resultado.ultimaSincro
      });
    } else {
      setDatos(prev => ({ ...prev, estado: "ERROR DE RED" }));
    }
    
    setTimeout(() => setCargando(false), 600);
  };

  useEffect(() => {
    actualizarDatos();
    const intervalo = setInterval(actualizarDatos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (modoAR) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [modoAR]);

  const BarraNivel = ({ valor, maximo }) => (
    <View style={styles.contenedorBarra}>
      <View style={[styles.barraProgreso, { width: `${(valor / maximo) * 100}%` }]} />
    </View>
  );

  const manejarEntradaAR = async () => {
    const status = await requestPermission();
    if (status.granted) {
      setModoAR(true);
    }
  };

  if (modoAR && permission?.granted) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <CameraView style={StyleSheet.absoluteFill} />

        <View style={styles.cabeceraAR}>
          <Text style={[styles.tituloDispositivo, { color: '#FFF' }]}>
            {datos.dispositivo}
          </Text>
        </View>

        <Animated.View style={[styles.panelAR, { opacity: fadeAnim }]}>
          <Text style={styles.etiquetaLugarAR}> {datos.lugar}</Text>
          <Text style={[styles.valorDato, { color: '#FFF' }]}>🌡 {datos.temperatura}°C</Text>
          <BarraNivel valor={datos.temperatura} maximo={50} />
          <Text style={[styles.valorDato, { color: '#FFF', marginTop: 15 }]}>💧 {datos.humedad}%</Text>
          <BarraNivel valor={datos.humedad} maximo={100} />
          <Text style={{ color: '#AAA', marginTop: 10 }}>{datos.ultimaSincro}</Text>
        </Animated.View>

        <TouchableOpacity
          style={[styles.boton, { position: 'absolute', bottom: 110, left: 25, right: 25 }]}
          onPress={actualizarDatos}
        >
          {cargando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textoBoton}>ACTUALIZAR</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, { position: 'absolute', bottom: 40, left: 25, right: 25, backgroundColor: '#333' }]}
          onPress={() => setModoAR(false)}
        >
          <Text style={styles.textoBoton}>SALIR DE AR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.contenedorPrincipal}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.cabecera}>
        <Text style={styles.tituloDispositivo}>{datos.dispositivo}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contenidoScroll}>
        <View style={styles.tarjeta}>
          <Text style={styles.etiquetaLugar}>{datos.lugar}</Text>
          <Text style={styles.valorDato}>{datos.temperatura}°C</Text>
          <BarraNivel valor={datos.temperatura} maximo={50} />
          <Text style={[styles.valorDato, { marginTop: 20 }]}>{datos.humedad}%</Text>
          <BarraNivel valor={datos.humedad} maximo={100} />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.boton} onPress={actualizarDatos}>
        <Text style={styles.textoBoton}>ACTUALIZAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.boton, { backgroundColor: '#1a1a2e' }]}
        onPress={manejarEntradaAR}
      >
        <Text style={styles.textoBoton}>VER EN AR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: { flex: 1, backgroundColor: '#F8F9FA' },
  cabecera: { paddingTop: 60, padding: 20, backgroundColor: '#FFF' },
  cabeceraAR: { paddingTop: 60, padding: 20, backgroundColor: 'rgba(0,0,0,0.5)' },
  tituloDispositivo: { fontSize: 18, fontWeight: 'bold' },
  contenidoScroll: { padding: 20 },
  tarjeta: { backgroundColor: '#FFF', borderRadius: 15, padding: 25 },
  etiquetaLugar: { color: '#999' },
  etiquetaLugarAR: { color: '#AAA' },
  valorDato: { fontSize: 30, fontWeight: '300' },
  contenedorBarra: { height: 6, backgroundColor: '#EEE', borderRadius: 3, marginTop: 5 },
  barraProgreso: { height: '100%', backgroundColor: '#000' },
  panelAR: {
    position: 'absolute',
    bottom: 230,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  boton: {
    backgroundColor: '#000',
    marginHorizontal: 25,
    marginBottom: 10,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBoton: { color: '#FFF', fontWeight: 'bold' }
});