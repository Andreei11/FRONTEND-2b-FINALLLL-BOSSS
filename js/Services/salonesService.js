const API_URL = "http://localhost:8080/api/salon";

export async function getSalones() {
    const respuesta = await fetch(`${API_URL}/${ver}`);
    if(!respuesta.ok) throw new Error("Error al obtener los salones");
    return await respuesta.json();
}

export async function getSalon(id) {
    const respuesta = await fetch(`${API_URL}/${ver}/${id}`);                                                                                              
    if(!respuesta.ok) throw new Error("Error al obtener el Salon");
    return await respuesta.json();
}

///Dimas