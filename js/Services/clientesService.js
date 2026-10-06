const API_URL = "http://localhost:8080/api/cliente";

export async function getClientes() {
    const respuesta = await fetch(`${API_URL}/${ver}`);
    if(!respuesta.ok) throw new Error("Error al obtener los clientes");
    return await respuesta.json();
}

export async function getCliente(id) {
    const respuesta = await fetch(`${API_URL}/${ver}/${id}`);                                                                                              
    if(!respuesta.ok) throw new Error("Error al obtener el cliente");
    return await respuesta.json();
}

export async function createCliente(cliente) {
    const respuesta = await fetch(`${API_URL}/${agregar}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    });
    if(!respuesta.ok) throw new Error("Error al crear el cliente");
    return await respuesta.json();
}

export async function updateCliente(id, cliente) {
    const respuesta = await fetch(`${API_URL}/${actualizar}/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente)
    });
    if(!respuesta.ok) throw new Error("Error al actualizar el cliente");
    return await respuesta.json();
}

export async function deleteCliente(id) {
    const respuesta = await fetch(`${API_URL}/${eliminar}/${id}`,{method: "DELETE"});
    if(!respuesta.ok) throw new Error("Error al eliminar el cliente");
    return true;
}

///Dimas