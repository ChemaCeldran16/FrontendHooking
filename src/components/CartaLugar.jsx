import { Rate } from "antd";

const CartaLugar = ({ nombre, direccion, valoracion, imagen, onClick }) => (
  <>
    <div className="flex flex-row w-full space-x-16 p-8 items-center justify-center shadow-2xl bg-blanco-gris rounded-2xl sm:p-4 sm:space-x-4" onClick={() => onClick(nombre)}>
      <div className="sm:w-1/2 xl:w-3/5 xl:pl-12 ">
        <img src={`http://127.0.0.1:8000/${imagen}`} alt={nombre} className="w-48 h-48 object-cover rounded-2xl xl:w-64 xl:h-56 2xl:w-80 " />
      </div>
      <div className="flex flex-col justify-center sm:w-1/2 xl:w-2/5 ">
        <h4 className=" text-large font-permanentMarker lg:text-xl 2xl:text-2xl text-gray-900">{nombre}</h4>
        <h4 className="font-bold text-md font-fredoka  2xl:text-lg">{direccion}</h4>
        <Rate allowHalf disabled value={valoracion} autoFocus className="sm:text-md sm:whitespace-nowrap xl:text-2xl "/>
      </div>
    </div>
  </>
);

export default CartaLugar;
