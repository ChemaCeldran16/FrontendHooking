import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Rate } from "antd";

export default function LocalCard({ nombre, valoracion, imagen }) {
  return (
    <Card className="py-4 sm:w-full bg-blanco-gris transition-transform hover:scale-110">
      <CardHeader className="pb-0 pt-2 px-4 sm:px-2  flex-col items-center">
        <p className="uppercase text-gray-900  font-permanentMarker sm:text-sm sm:break-words sm:max-w-[9rem]  2xl:text-xl 2xl:max-w-[18rem]">{nombre}</p>
        <Rate allowHalf disabled value={valoracion} autoFocus className="sm:text-md md:text-md xl:text-2xl "/>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image alt={nombre} className="object-cover w-48 h-48 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:w-56 2xl:h-56 " src={imagen} />
      </CardBody>
    </Card>
  );
}
