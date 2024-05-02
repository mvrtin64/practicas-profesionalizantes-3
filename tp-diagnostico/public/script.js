document.addEventListener('DOMContentLoaded', function() {
    const provinciaSelect = document.getElementById('provincia');
    const departamentoSelect = document.getElementById('departamento');
    const municipioSelect = document.getElementById('municipio');
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

    function cargarDepartamentos() {
        const provincia_provincia_id = document.getElementById('provincia').value;
        if (!provincia_provincia_id) return;
    
        fetch(`/api/departamentos/?provincia_id=${provincia_provincia_id}`)
            .then(response => response.json())
            .then(data => {
                const selectDepartamento = document.getElementById('departamento');
                selectDepartamento.innerHTML = '';
                data.forEach(departamento => {
                // Compara la provincia_provincia_id del departamento con la provincia_id seleccionada
                if (departamento.provincia_provincia_id.toString() === provincia_provincia_id.toString()) {
                    const option = document.createElement('option');
                    option.value = departamento.deparamento_id;
                    option.text = departamento.name;
                    selectDepartamento.appendChild(option);
                }
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function cargarMunicipios() {
        const departamentoSeleccionado = document.getElementById('departamento').value;
        if (!departamentoSeleccionado) return;
    
        fetch(`/api/municipios/?departamento_deparamento_id=${departamentoSeleccionado}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const selectMunicipio = document.getElementById('municipio');
                selectMunicipio.innerHTML = '';
                data.forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = municipio.muncipio_id;
                    option.text = municipio.name;
                    selectMunicipio.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }
    
    
    function cargarLocalidades(municipio_id) {
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

    provinciaSelect.addEventListener('change', cargarDepartamentos);
    

    departamentoSelect.addEventListener('change', function() {
        const departamento_deparamento_id = this.value;
        /* cargarLocalidades(departamento_deparamento_id); */
    });

    municipioSelect.addEventListener('change', cargarMunicipios())

    // cargar las provincias al cargar la página
    cargarProvincias();
});
