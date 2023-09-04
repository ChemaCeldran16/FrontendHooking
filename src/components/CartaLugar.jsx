import { Rate } from "antd";

const CartaLugar = ({ nombre, direccion, valoracion, imagen, onClick }) => (
  <>
    <div className="flex flex-row w-full space-x-16 p-8 items-center justify-center shadow-2xl bg-orange-500 rounded-2xl" onClick={() => onClick(nombre)}>
      <div className="">
        <img src={`http://127.0.0.1:8000/${imagen}`} alt={nombre} className="w-48 h-48 object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="font-bold text-large">{nombre}</h4>
        <h4 className="font-bold text-md">{direccion}</h4>
        <Rate allowHalf defaultValue={valoracion} disabled />
      </div>
    </div>
  </>
);

export default CartaLugar;
