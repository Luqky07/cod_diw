$(document).ready(fullLoad);

function fullLoad() {
    $("#signupform").validate({
        rules: {
            firstname: { required: true, maxlength: 100 },
            lastname: { required: true, maxlength: 100 },
            origin: { required: true, minlength: 3, maxlength: 100 },
            dateSalida: { required: true },
            destino: { required: true, minlength: 3, maxlength: 100 },
            dateLlegada: { required: true },
            email: { required: true, email: true }
        },
        messages: {
            firstname: { required: "Rellena el campo Nombre", maxlength: "Nombre demasiado largo" },
            lastname: { required: "Rellena el campo Apellidos", maxlength: "Apellido demasiado largo" },
            origin: { required: "Rellena el campo Origen", minlength: "Lugar de origen demasiado corto", maxlength: "Lugar de origen demasiado largo" },
            dateSalida: { required: "Rellena el campo Fecha de salida" },
            destino: { required: "Rellena el campo Destino", minlength: "Lugar de destino demasiado corto", maxlength: "Lugar de destino demasiado largo" },
            dateLlegada: { required: "Rellena este el campo Llegada" },
            email: { required: "Rellena el campo Email", email: "Introduce un correo válido" }
        },
        errorElement: "span"
    });
}