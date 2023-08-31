import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Rate } from "antd";

export default function LocalCard({ nombre, valoracion, imagen }) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
      <p className="uppercase font-bold">{nombre}</p>
      <Rate allowHalf disabled value={valoracion} />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={nombre}
          className="object-cover  w-48 h-48"
          src={imagen}
        />
      </CardBody>
    </Card>
  );
}