import * as React from "react";
import { Envelop } from "../__generated__/graphql-react";
import { useCurrentElement } from "contexts/CurrentElementContext";
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
  const { setCurrentElement } = useCurrentElement()
  const ref = React.useRef<SVGPolygonElement>(null!);

  let comp = <p>Polygon is not defined</p>;

  if (poly) {
    comp = (
      <polygon
        ref={ref}
        className={className}
        key={poly.id}
        data-value={poly.value}
        points={poly?.envelop?.vertices
          ?.map((v) => [v?.x, v?.y].join(","))
          .join(" ")}
        onMouseEnter={() => {
          setCurrentElement({ ...poly});
        }}
        onMouseOut={() => {
          setCurrentElement(null);
        }}
      />
    );
  }
  return comp;
};

export default Polygon;
