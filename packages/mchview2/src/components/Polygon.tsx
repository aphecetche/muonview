import * as React from "react";
import { Envelop } from "../__generated__/graphql-react";

type Poly = {
  id: string;
  envelop: Envelop;
  value?: number;
};

type PolygonProps = {
  poly: Poly;
  className?: string;
};

const Polygon = ({ poly, className }: PolygonProps) => {

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
      />
    );
  }
  return comp;
};

export default Polygon;
