import * as React from "react";
import { Envelop } from "../__generated__/graphql-react";

type Poly = {
  id: string;
  envelop: Envelop;
  value?: number;
};

type PolygonProps = {
  poly: Poly;
  fillColor?: string;
  className?: string;
};

const Polygon = ({ poly, fillColor, className }: PolygonProps) => {
  const st = {
    fill: fillColor || "red",
    fillOpacity: fillColor ? 1 : 0,
  };

  let comp = <p>Polygon is not defined</p>;

  if (poly) {
    comp = (
      <polygon
        className={className}
        key={poly.id}
        data-value={poly.value}
        points={poly?.envelop?.vertices
          ?.map((v) => [v?.x, v?.y].join(","))
          .join(" ")}
        style={st}
      />
    );
  }
  return comp;
};

export default Polygon;
