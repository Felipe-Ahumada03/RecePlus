from flask import Flask, jsonify, request
from arbol import ArbolDecisionUsuarios
import json
import os
from datetime import datetime

app = Flask(__name__)
arbol = ArbolDecisionUsuarios()
USUARIOS_FILE = 'usuarios.json'
RECETAS_FILE = 'recetas.json'

# --- Utilidades de persistencia ---
def guardar_usuarios():
    with open(USUARIOS_FILE, 'w', encoding='utf-8') as f:
        json.dump(arbol.todos_los_usuarios(), f, ensure_ascii=False)

def cargar_usuarios():
    if os.path.exists(USUARIOS_FILE):
        with open(USUARIOS_FILE, 'r', encoding='utf-8') as f:
            for usuario in json.load(f):
                arbol.insertar(usuario)

# --- Inicializar usuarios al arrancar ---
cargar_usuarios()

# --- Endpoints de usuarios ---
@app.route('/usuarios', methods=['POST'])
def agregar_usuario():
    data = request.json
    if not data or 'nombre' not in data or 'tipo' not in data:
        return jsonify({'error': 'Faltan datos'}), 400
    # Guardar fecha de registro, edad, email, país, y datos de suscripción si vienen
    usuario = {
        'nombre': data['nombre'],
        'tipo': data['tipo'],
        'fecha_registro': data.get('fecha_registro', datetime.now().isoformat()),
        'edad': data.get('edad'),
        'tiempo_uso': data.get('tiempo_uso', 0),
        'email': data.get('email'),
        'pais': data.get('pais'),
        'suscripcion': data.get('suscripcion', {
            'plan': data.get('tipo'),
            'fecha_inicio': data.get('fecha_registro', datetime.now().isoformat()),
            'fecha_fin': data.get('fecha_fin'),
            'estado': data.get('estado', 'activa' if data.get('tipo') != 'gratis' else 'inactiva'),
            'metodo_pago': data.get('metodo_pago')
        })
    }
    arbol.insertar(usuario)
    guardar_usuarios()
    return jsonify({'mensaje': 'Usuario agregado'}), 201

@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    return jsonify(arbol.todos_los_usuarios())

@app.route('/usuarios/<tipo>', methods=['GET'])
def obtener_usuarios_tipo(tipo):
    return jsonify(arbol.buscar_por_tipo(tipo))

@app.route('/usuarios/suscripciones/<estado>', methods=['GET'])
def usuarios_por_estado_suscripcion(estado):
    usuarios = arbol.todos_los_usuarios()
    filtrados = [u for u in usuarios if u.get('suscripcion', {}).get('estado') == estado]
    return jsonify(filtrados)

# --- Endpoints de estadísticas ---
@app.route('/estadisticas/plan-mas-adquirido', methods=['GET'])
def plan_mas_adquirido():
    usuarios = arbol.todos_los_usuarios()
    conteo = {}
    for u in usuarios:
        t = u['tipo']
        conteo[t] = conteo.get(t, 0) + 1
    if not conteo:
        return jsonify({'plan': None, 'cantidad': 0})
    plan = max(conteo, key=conteo.get)
    return jsonify({'plan': plan, 'cantidad': conteo[plan]})

@app.route('/estadisticas/rango-edades', methods=['GET'])
def rango_edades():
    usuarios = arbol.todos_los_usuarios()
    edades = [u['edad'] for u in usuarios if u.get('edad') is not None]
    if not edades:
        return jsonify({'min': None, 'max': None})
    return jsonify({'min': min(edades), 'max': max(edades)})

@app.route('/estadisticas/tiempo-uso-promedio', methods=['GET'])
def tiempo_uso_promedio():
    usuarios = arbol.todos_los_usuarios()
    tiempos = [u.get('tiempo_uso', 0) for u in usuarios]
    if not tiempos:
        return jsonify({'promedio': 0})
    return jsonify({'promedio': sum(tiempos) / len(tiempos)})

@app.route('/estadisticas/suscripcion-mas-adquirida', methods=['GET'])
def suscripcion_mas_adquirida():
    usuarios = arbol.todos_los_usuarios()
    conteo = {}
    for u in usuarios:
        plan = u.get('suscripcion', {}).get('plan')
        if plan:
            conteo[plan] = conteo.get(plan, 0) + 1
    if not conteo:
        return jsonify({'plan': None, 'cantidad': 0})
    plan = max(conteo, key=conteo.get)
    return jsonify({'plan': plan, 'cantidad': conteo[plan]})

@app.route('/estadisticas/suscripciones-activas', methods=['GET'])
def suscripciones_activas():
    usuarios = arbol.todos_los_usuarios()
    activas = [u for u in usuarios if u.get('suscripcion', {}).get('estado') == 'activa']
    return jsonify({'cantidad': len(activas), 'usuarios': activas})

# --- Recetas: para receta más buscada ---
def guardar_receta_busqueda(nombre):
    data = {}
    if os.path.exists(RECETAS_FILE):
        with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    data[nombre] = data.get(nombre, 0) + 1
    with open(RECETAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

@app.route('/recetas/buscar', methods=['POST'])
def buscar_receta():
    data = request.json
    nombre = data.get('nombre')
    if not nombre:
        return jsonify({'error': 'Falta el nombre de la receta'}), 400
    guardar_receta_busqueda(nombre)
    return jsonify({'mensaje': f'Receta {nombre} registrada como buscada'})

@app.route('/estadisticas/receta-mas-buscada', methods=['GET'])
def receta_mas_buscada():
    if not os.path.exists(RECETAS_FILE):
        return jsonify({'receta': None, 'busquedas': 0})
    with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    if not data:
        return jsonify({'receta': None, 'busquedas': 0})
    receta = max(data, key=data.get)
    return jsonify({'receta': receta, 'busquedas': data[receta]})

@app.route('/recetas', methods=['GET'])
def obtener_recetas():
    if not os.path.exists(RECETAS_FILE):
        return jsonify([])
    with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/recetas', methods=['POST'])
def agregar_receta():
    data = request.json
    if not data or 'nombre' not in data or 'categoria' not in data or 'ingredientes' not in data:
        return jsonify({'error': 'Faltan datos'}), 400
    receta = {
        'nombre': data['nombre'],
        'categoria': data['categoria'],
        'ingredientes': data['ingredientes'],
        'tiempo_preparacion': data.get('tiempo_preparacion'),
        'dificultad': data.get('dificultad'),
        'popularidad': data.get('popularidad', 0)
    }
    recetas = []
    if os.path.exists(RECETAS_FILE):
        with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
            recetas = json.load(f)
    recetas.append(receta)
    with open(RECETAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(recetas, f, ensure_ascii=False)
    return jsonify({'mensaje': 'Receta agregada'}), 201

@app.route('/recetas/<nombre>', methods=['GET'])
def obtener_receta_por_nombre(nombre):
    if not os.path.exists(RECETAS_FILE):
        return jsonify({'error': 'No hay recetas'}), 404
    with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
        recetas = json.load(f)
    for receta in recetas:
        if receta['nombre'].lower() == nombre.lower():
            return jsonify(receta)
    return jsonify({'error': 'Receta no encontrada'}), 404

@app.route('/estadisticas/receta-mas-popular', methods=['GET'])
def receta_mas_popular():
    if not os.path.exists(RECETAS_FILE):
        return jsonify({'receta': None, 'popularidad': 0})
    with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
        recetas = json.load(f)
    if not recetas:
        return jsonify({'receta': None, 'popularidad': 0})
    receta = max(recetas, key=lambda r: r.get('popularidad', 0))
    return jsonify({'receta': receta['nombre'], 'popularidad': receta.get('popularidad', 0)})

@app.route('/estadisticas/receta-mas-preparada', methods=['GET'])
def receta_mas_preparada():
    # Usamos el mismo archivo de búsquedas de recetas
    if not os.path.exists(RECETAS_FILE):
        return jsonify({'receta': None, 'veces_preparada': 0})
    with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
        recetas = json.load(f)
    # Si el archivo es una lista, no hay datos de preparación, devolvemos None
    if isinstance(recetas, list):
        return jsonify({'receta': None, 'veces_preparada': 0})
    if not recetas:
        return jsonify({'receta': None, 'veces_preparada': 0})
    receta = max(recetas, key=recetas.get)
    return jsonify({'receta': receta, 'veces_preparada': recetas[receta]})

@app.route('/estadisticas/top-recetas-populares', methods=['GET'])
def top_recetas_populares():
    top = int(request.args.get('top', 5))
    if not os.path.exists(RECETAS_FILE):
        return jsonify([])
    with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
        recetas = json.load(f)
    if not recetas or not isinstance(recetas, list):
        return jsonify([])
    ranking = sorted(recetas, key=lambda r: r.get('popularidad', 0), reverse=True)[:top]
    return jsonify(ranking)

@app.route('/estadisticas/top-recetas-preparadas', methods=['GET'])
def top_recetas_preparadas():
    top = int(request.args.get('top', 5))
    if not os.path.exists(RECETAS_FILE):
        return jsonify([])
    with open(RECETAS_FILE, 'r', encoding='utf-8') as f:
        recetas = json.load(f)
    # Si es lista, no hay datos de preparación
    if isinstance(recetas, list):
        return jsonify([])
    # recetas es un dict: {nombre: veces_preparada}
    ranking = sorted(recetas.items(), key=lambda x: x[1], reverse=True)[:top]
    return jsonify([{'nombre': nombre, 'veces_preparada': veces} for nombre, veces in ranking])

@app.route('/estadisticas/top-tiempo-uso', methods=['GET'])
def top_tiempo_uso():
    top = int(request.args.get('top', 5))
    usuarios = arbol.todos_los_usuarios()
    ranking = sorted(
        [u for u in usuarios if u.get('tiempo_uso') is not None],
        key=lambda u: u.get('tiempo_uso', 0),
        reverse=True
    )[:top]
    return jsonify(ranking)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
