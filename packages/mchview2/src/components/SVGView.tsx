import React, { useRef, useState } from "react";
import Target from "./Target";
import * as Types from "../__generated__/graphql-react";

const viewBoxString = (v: Types.BoundingBox): string => {
  const width = v.xmax - v.xmin;
  const height = v.ymax - v.ymin;
  return `${v.xmin} ${v.ymin} ${width} ${height}`;
};

const svgPoint = (x: number, y: number, svg: SVGSVGElement) => {
  const point = svg.createSVGPoint();
  point.x = x;
  point.y = y;
  return point.matrixTransform(svg?.getScreenCTM()?.inverse());
};

const limitZoomRange = (z: number) => Math.min(Math.max(0.1, z), 10);

type SVGViewProps = {
  boundingBox: Types.BoundingBox;
  initialOffset?: Types.Offset;
  initialZoom?: number;
  children?: React.ReactNode;
  className?: string;
};

type Point = {
  x: number;
  y: number;
};

const SVGView = ({
  boundingBox,
  children,
  initialOffset = { x: 0, y: 0 },
  initialZoom = 1,
  className=""
}: SVGViewProps) => {
  const [point, setPoint] = useState<Point | null>(null);
  const [panStart, setPanStart] = useState<Point | null>(null);
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [translation, setTranslation] = useState<Types.Offset>(initialOffset);
  const svgRef = useRef<SVGSVGElement>(null!);

  const isPanning = () => panStart != null;

  const transform = `translate(${translation.x},${translation.y}) scale(${zoom})`;

  return (
    <svg
      className={className}
      ref={svgRef}
      viewBox={viewBoxString(boundingBox)}
      onWheel={(event) => {
        if (isPanning()) {
          return;
        }
        if (!point) {
          return;
        }
        let newZoom = zoom + event.deltaY * -0.01;
        newZoom = limitZoomRange(newZoom);
        setTranslation(({ x, y }) => ({
          x: point.x - (newZoom * (point.x - x)) / zoom,
          y: point.y - (newZoom * (point.y - y)) / zoom,
        }));
        setZoom(newZoom);
      }}
      onMouseLeave={() => setPoint(null)}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        if (!point) return;
        setPanStart({
          x: point.x - translation.x,
          y: point.y - translation.y,
        });
      }}
      onMouseUp={(event) => {
        event.preventDefault();
        setPanStart(null);
      }}
      onMouseMove={(event) => {
        event.preventDefault();
        const p = svgPoint(event.clientX, event.clientY, svgRef.current);
        setPoint(p);
        if (!isPanning()) {
          return;
        }
        if (p) {
          if (panStart) {
            setTranslation({
              x: p.x - panStart?.x,
              y: p.y - panStart?.y,
            });
          }
        }
      }}
    >
      <g transform={transform}>{children}</g>
      {point ? (
        <Target x={point.x} y={point.y} scale={2.0} color="yellow" />
      ) : null}
    </svg>
  );
};

export default SVGView;
