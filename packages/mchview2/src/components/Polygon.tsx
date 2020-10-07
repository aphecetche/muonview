import * as React from "react";

// type Vertex = {
//     x?: number
//     y?: number
// }
//
// type Envelop = {
//   __typename?: 'Envelop';
//   id: Scalars['ID'];
//   center?: Maybe<Vertex>;
//   size?: Maybe<Dim2D>;
//   vertices?: Maybe<Array<Maybe<Vertex>>>;
// };
//
// type PolygonProps = {
//    envelop: Envelop
//    fillColor?: string
//    className?: string
//    value?: number
// }

const Polygon = ({ id, poly, fillColor, className }:PolygonProps) => {

  const st = {
    fill: fillColor || "red",
    fillOpacity: fillColor ? 1 : 0,
  };

  let comp = <p>Polygon is not defined</p>;

  if (poly) {
    comp = (
      <polygon
        className={classname}
        key={id}
        data-value={poly.value}
        points={poly.vertices.map((v) => [v.x, v.y].join(","))}
        style={st}
      />
    );
  }
  return comp;
};

export default Polygon;
