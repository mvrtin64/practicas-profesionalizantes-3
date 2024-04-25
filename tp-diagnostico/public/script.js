document.addEventListener('DOMContentLoaded', function() {
    const provinciaSelect = document.getElementById('provincia');
    const departamentoSelect = document.getElementById('departamento');
    const localidadSelect = document.getElementById('localidad');

    // cargar las provincias desde la API
    function cargarProvincias() {
        fetch('/api/provincias')
            .then(response => response.json())
            .then(data => {
                data.forEach(provincia => {
                    const option = document.createElement('option');
                    option.value = provincia.provincia_id;
                    option.textContent = provincia.name;
                    provinciaSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar las provincias:', error));
    }

    // cargar los departamentos/municipios según la provincia seleccionada
    function cargarDepartamentos(provincia_id) {
        const columna_fk = 'provincia_provincia_id'; 
        fetch(`/api/departamentos/${provincia_id}`)         // /api/departamentos pone la lista completa 
            .then(response => response.json())
            .then(data => {
                // limpio opciones anteriores
                departamentoSelect.innerHTML = '';
                console.log(data);
                
                data.forEach(departamento => {
                    const option = document.createElement('option');
                    option.value = departamento.deparamento_id;
                    option.textContent = departamento.name;
                    departamentoSelect.appendChild(option);
                });
                // cargo los municipios asociados a los departamentos 
                if (data.length > 0) {
                const primerDepartamentoId = data[0].deparamento_id; // Tomar el primer departamento por defecto
                cargarMunicipios(primerDepartamentoId); // cargo los municipios asociados al primer departamento
            }
            })
            .catch(error => console.error('Error al cargar los departamentos:', error));
    }


    // cargo los municipios asociados al departamento seleccionado
    function cargarMunicipios(departamento_deparamento_id) {
    // obtengo municipios asociados al departamento seleccionado
    fetch(`/api/municipios/${departamento_deparamento_id}`)
        .then(response => response.json())
        .then(data => {
            municipioSelect.innerHTML = '';

            // agrego opciones de municipios
            data.forEach(municipio => {
                const option = document.createElement('option');
                option.value = municipio.muncipio_id;
                option.textContent = municipio.name;
                municipioSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los municipios:', error));
}
    function cargarLocalidades(municipio_id) {
    // obtengo localidades asociadas al municipio seleccionado
    fetch(`/api/nombres/${municipio_id}`)
        .then(response => response.json())
        .then(data => {
            localidadSelect.innerHTML = '';

            // agrego opciones de localidades
            data.forEach(nombre => {
                const option = document.createElement('option');
                option.value = nombre.name_id;
                option.textContent = nombre.name;
                localidadSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar las localidades:', error));
    }

    // Evento al seleccionar una provincia
    provinciaSelect.addEventListener('change', function() {
        const provincia_id = this.value;
        cargarDepartamentos(provincia_id);
    });

    // Evento al seleccionar un departamento/municipio
    departamentoSelect.addEventListener('change', function() {
        const departamento_deparamento_id = this.value;
        cargarLocalidades(departamento_deparamento_id);
    });

    // Cargar las provincias al cargar la página
    cargarProvincias();
});
