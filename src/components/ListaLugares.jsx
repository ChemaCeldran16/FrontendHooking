import React from 'react';
import { List } from 'antd';
import CartaLugar from './CartaLugar';

const ListaLugares = ({ locales, currentPage, itemsPerPage,onClick }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLocales = locales.slice(startIndex, endIndex);

  return (
    <List>
      {paginatedLocales.map((local) => (
        <List.Item key={local.id}>
          <CartaLugar
            nombre={local.nombreLocal}
            direccion={local.nombre_pueblo_ciudad}
            valoracion={local.valoracion}
            imagen={local.fotos[0].imagen} 
            onClick={onClick}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ListaLugares;