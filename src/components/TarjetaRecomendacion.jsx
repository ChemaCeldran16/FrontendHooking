import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Rate } from "antd";

export default function LocalCard({ nombre, valoracion, imagen }) {
  return (
    <Card className="py-4 sm:w-full">
      <CardHeader className="pb-0 pt-2 px-4 sm:px-2  flex-col items-center">
        <p className="uppercase md:font-bold">{nombre}</p>
        <Rate allowHalf disabled value={valoracion} />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image alt={nombre} className="object-cover w-48 h-48 sm:w-28 sm:h-28 lg:w-32 lg:h-32" src={imagen} />
      </CardBody>
    </Card>
  );
}
