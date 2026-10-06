const API_URL = "http://localhost:8080/api/evento";

export async function getEventos() {
    const respuesta = await fetch(`${API_URL}/${ver}`);
    if(!respuesta.ok) throw new Error("Error al obtener los eventos");
    return await respuesta.json();
}

export async function getEvento(id) {
    const respuesta = await fetch(`${API_URL}/${ver}/${id}`);                                                                                              
    if(!respuesta.ok) throw new Error("Error al obtener el evento");
    return await respuesta.json();
}

export async function createEvento(evento) {
    const respuesta = await fetch(`${API_URL}/${agregar}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(evento)
    });
    if(!respuesta.ok) throw new Error("Error al crear el evento");
    return await respuesta.json();
}

export async function updateEvento(id, evento) {
    const respuesta = await fetch(`${API_URL}/${actualizar}/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(evento)
    });
    if(!respuesta.ok) throw new Error("Error al actualizar el evento");
    return await respuesta.json();
}

export async function deleteEvento(id) {
    const respuesta = await fetch(`${API_URL}/${eliminar}/${id}`,{method: "DELETE"});
    if(!respuesta.ok) throw new Error("Error al eliminar el evento");
    return true;
}

///Dimas