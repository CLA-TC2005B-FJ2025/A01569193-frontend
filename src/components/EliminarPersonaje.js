import React, { useState, useEffect } from 'react';
import { deletePersonaje, getAllPersonajes } from '../api';

function EliminarPersonaje() {
    const [idEliminar, setIdEliminar] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(null);
    const [personajes, setPersonajes] = useState([]);

    useEffect(() => {
        const fetchPersonajes = async () => {
            try {
                const data = await getAllPersonajes();
                setPersonajes(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPersonajes();
    }, []);

    const handleChange = (e) => {
        setIdEliminar(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await deletePersonaje(idEliminar);
            setMensaje(response.message);
            setError(null);
            setIdEliminar('');
            const data = await getAllPersonajes();  // Actualiza la lista
            setPersonajes(data);
        } catch (error) {
            setError(error.message);
            setMensaje('');
        }
    };

    return (
        <div>
            <h2>Eliminar Personaje</h2>

            <div>
                <h3>Lista de Personajes</h3>
                {error && <p style={{ color: 'red' }}>Error al cargar personajes: {error}</p>}
                {personajes.length > 0 ? (
                    <ul>
                        {personajes.map(personaje => (
                            <li key={personaje.id}>
                                ID: {personaje.id}, Nombre: {personaje.name}, Email: {personaje.email}, Whatsapp: {personaje.whatsapp}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay personajes registrados.</p>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID del Personaje a Eliminar:</label>
                    <input type="number" value={idEliminar} onChange={handleChange} required />
                </div>
                <button type="submit">Eliminar Personaje</button>
            </form>

            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        </div>
    );
}

export default EliminarPersonaje;
