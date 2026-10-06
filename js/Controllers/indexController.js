import { getEvento, getEventos, createEvento, updateEvento, deleteEvento } from "../Services/eventosService";

import { getClientes } from "../Services/clientesService";
import { getSalones } from "../Services/salonesService";

const tablaEventos = document.getElementById("tablaEventos");
const frmEvento = document.getElementById("frmEvento");
const tituloForm = document.getElementById("tituloForm");
const idEvento = document.getElementById("idEvento");
const selCliente = document.getElementById("selCliente");
const selSalon = document.getElementById("selSalon");
const txtNombreEvento = document.getElementById("txtNombreEvento");
const txtFechaEvento = document.getElementById("txtFechaEvento");
const txtCantidadPersonas = document.getElementById("txtCantidadPersonas");
const txtCantidadHoras = document.getElementById("txtCantidadHoras");
const selEstado = document.getElementById("selEstado");
const txtTotalPago = document.getElementById("txtTotalPago");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");

let Clientes = [];
let Salones = [];


/// Cargar los selects dimas
async function cargarSelects() {
    Clientes = await getClientes();
    Salones = await getSalones();

    selCliente.innerHTML=`<option value="" disabled selected> Selecciones un cliente </option>`;
    Clientes.forEach((c) => {
        selCliente.innerHTML += `<option value="${c.id}"> ${c.nombre} ${c.apellido} </option>`;
    });

    selCliente.innerHTML=`<option value="" disabled selected> Selecciones un salon </option>`;
    Salones.forEach((s) => {
        selSalon.innerHTML += `<option value="${s.id}"> ${s.nombreSalon} (max, ${s.capacidad}) </option>`;
    });
}

///Buscar nombre a partir del ID dimas
function nombreCliente(id){
    const c = Clientes.find((x)=> x.id == id );
    return c ? `${c.nombre} ${c.apellido}` : id;
}

function nombreSalon(id){
    const s = Salones.find((x)=> x.id == id );
    return s ? s.nombreSalon : id;
}

function calcularTotal(){
    const salon = Salones.find((s) => s.id == selSalon.value);
    const horas = Number(txtCantidadHoras.value);
    txtTotalPago.value = salon && horas > 0 ? (salon.precioRenta * horas).toFixed(2) : "";
}
selSalon.addEventListener("change", calcularTotal);
txtCantidadHoras.addEventListener("input", calcularTotal);


///Dimas
async function mostrarEventos() {
    try{
        const eventos = await getEventos();
        tablaEventos.innerHTML = "";
        eventos.forEach((ev) => {
            tablaEventos.innerHTML += `
            <tr>
            <td>${ev.id}</td>
            <td>${ev.nombreEvento}</td>
            <td>${nombreCliente(ev.idCliente)}</td>
            <td>${nombreSalon(ev.idSalon)}</td>
            <td>${ev.fechaEvento}</td>
            <td>${ev.cantidadPersonas}</td>
            <td>${ev.cantidadHoras}</td>
            <td>${ev.estado}</td>
            <td>${Number(ev.totalPago).toFixed(2)}</td>
            <td>
                <button class = "btn btn-warning btn-sm" onclick = "ColocarDatosFormulario(${ev.id})">Editar</button>
                <button class = "btn btn-danger btn-sm" onclick = "borrarEvento(${ev.id})">Eliminar</button>
            </td>
            </tr>
            `
        });
    }catch(error){
        alert("Error al mostrar los eventos"+error.message);
    }
}

document.addEventListener("DOMContentLoaded",async()=>{
    try{
        await cargarSelects();
    }catch(error){
        alert("Error"+error.message)
    }
    await mostrarEventos();
})


/// GUARDAR EVENTO sebas
frmEvento.addEventListener("submit", async (e) => {
    e.preventDefault();
    CalcularTotal();
    const id = idEvento.value.trim();
    const evento = {
        idCliente:Number(selCliente.value),
        idSalon:Number(selSalon.value),
        nombreEvento:txtNombreEvento.value.trim(),

        fechaEvento:txtFechaEvento.value.trim(),
        cantidadPersonas:Number(txtCantidadPersonas.value.trim()),
        cantidadHoras:Number(txtCantidadHoras.value.trim()),
        estado:selEstado.value.trim(),
        totalPago:Number(txtTotalPago.value.trim())
    };

    
    if(!evento.idCliente || !evento.idSalon || !evento.nombreEvento || !evento.fechaEvento || !evento.cantidadPersonas || !evento.cantidadHoras || !evento.estado || !evento.totalPago){
        alert("El salon ${Salon.nombreSalon} no puede superar la capacidad máxima de ${Salon.capacidad} personas.");
        return;

    }

    try{
        if(id){
            await updateEvento(id, evento);
            alert("Evento actualizado");
        }else{
            await createEvento(evento);
            alert("Evento creado");
        }
        limpiarFormulario();
        await mostrarEventos();
    }catch (error){
        alert("Error al guardar el evento" + error.message);

    }
});


///Editar evento sebas
async function colocarDatosFormulario(id){
    try{
        const evento = await getEvento(id);
        idEvento.value = evento.id;
        selCliente.value = evento.idCliente;
        selSalon.value = evento.idSalon;
        txtNombreEvento.value = evento.nombreEvento;
        txtFechaEvento.value = evento.fechaEvento;
        txtCantidadPersonas.value = evento.cantidadPersonas;
        txtCantidadHoras.value = evento.cantidadHoras;
        selEstado.value = evento.estado;
        txtTotalPago.value = evento.totalPago;
    }catch (error){
        alert("Error al cargar los datos del evento" + error.message);
    }
}
       
function limpiarFormulario(){
    frmEvento.reset();
    idEvento.value="";
    selCliente.value="";
    selSalon.value="";
    txtTotalPago.value="";
    tituloForm.textContent="Registrar Evento";
    btnGuardar.textContent="Guardar Evento";
    btnCancelar.classList.add("d-none");
}
btnCancelar.addEventListener("click", limpiarFormulario);


async function borrarEvento(id) {
    if(!confirm("¿Desea eliminar este evento?")) return;
    try{
        await deleteEvento(id);
        alert("Evento eliminado");
        limpiarFormulario();
        await mostrarEventos();
    }catch (error){
        alert("Error al eliminar el evento" + error.message);
    } 
}

window.colocarDatosFormulario = colocarDatosFormulario;
window.borrarEvento = borrarEvento;
