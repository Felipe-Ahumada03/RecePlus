# Árbol de decisión para usuarios y endpoints en Python
class NodoDecision:
    def __init__(self, tipo, usuario=None, izquierda=None, derecha=None):
        self.tipo = tipo  # 'root', 'gratis', 'premium', 'admin', etc.
        self.usuario = usuario  # Diccionario con info del usuario
        self.izquierda = izquierda
        self.derecha = derecha

class ArbolDecisionUsuarios:
    def __init__(self):
        self.raiz = None

    def insertar(self, usuario):
        if not self.raiz:
            self.raiz = NodoDecision(usuario['tipo'], usuario)
        else:
            self._insertar(self.raiz, usuario)

    def _insertar(self, nodo, usuario):
        if usuario['tipo'] < nodo.tipo:
            if nodo.izquierda:
                self._insertar(nodo.izquierda, usuario)
            else:
                nodo.izquierda = NodoDecision(usuario['tipo'], usuario)
        else:
            if nodo.derecha:
                self._insertar(nodo.derecha, usuario)
            else:
                nodo.derecha = NodoDecision(usuario['tipo'], usuario)

    def buscar_por_tipo(self, tipo):
        return self._buscar_por_tipo(self.raiz, tipo)

    def _buscar_por_tipo(self, nodo, tipo):
        if not nodo:
            return []
        resultados = []
        if nodo.tipo == tipo:
            resultados.append(nodo.usuario)
        resultados += self._buscar_por_tipo(nodo.izquierda, tipo)
        resultados += self._buscar_por_tipo(nodo.derecha, tipo)
        return resultados

    def todos_los_usuarios(self):
        return self._inorden(self.raiz)

    def _inorden(self, nodo):
        if not nodo:
            return []
        return self._inorden(nodo.izquierda) + ([nodo.usuario] if nodo.usuario else []) + self._inorden(nodo.derecha)

# Ejemplo de uso:
if __name__ == "__main__":
    arbol = ArbolDecisionUsuarios()
    arbol.insertar({'nombre': 'Juan', 'tipo': 'gratis'})
    arbol.insertar({'nombre': 'Ana', 'tipo': 'premium'})
    arbol.insertar({'nombre': 'Luis', 'tipo': 'gratis'})
    arbol.insertar({'nombre': 'Sofía', 'tipo': 'admin'})
    print("Usuarios premium:", arbol.buscar_por_tipo('premium'))
    print("Todos los usuarios:", arbol.todos_los_usuarios())

# Para endpoints: puedes usar Flask y este árbol para exponer rutas como /usuarios, /usuarios/gratis, /usuarios/premium, etc.
