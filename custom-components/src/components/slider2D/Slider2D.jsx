import React, { useEffect, useState } from "react";


function Slider2D({
    pointX, setPointX,
    pointY, setPointY,
    ...props
}) {
    // Handle props
    let gridWidth = props.gridWidth ? props.gridWidth : 500;
    let gridHeight = props.gridHeight ? props.gridHeight : 500;

    let gridMinX = props.gridMinX ? props.gridMinX : -2.
    let gridMinY = props.gridMinY ? props.gridMinY : -2.
    let gridMaxX = props.gridMaxX ? props.gridMaxX : 2.
    let gridMaxY = props.gridMaxY ? props.gridMaxY : 2.

    let pointRadius = props.pointRadius ? props.pointRadius : 10
    let includeAxis = typeof props.includeAxis == "boolean" ? props.includeAxis : true
    let axisThickness = props.axisThickness ? props.axisThickness : 1

    // Create local Variables
    let [pointLeft, setPointLeft] = useState(xToLeft(pointX))
    let [pointTop, setPointTop] = useState(yToTop(pointY))


    function xToLeft(x) {
        return (x - gridMinX) / (gridMaxX - gridMinX) * gridWidth
    }

    function yToTop(y) {
        return (gridMaxY - y) / (gridMaxY - gridMinY) * gridHeight
    }

    function leftToX(left) {
        return left / gridWidth * (gridMaxX - gridMinX) + gridMinX
    }

    function topToY(top) {
        return gridMaxY - top / gridHeight * (gridMaxY - gridMinY)
    }

    let gridStyle = {
        height: gridHeight + "px",
        width: gridWidth + "px",
        position: "relative"
    }

    let pointStyle = {
        height: 2 * pointRadius + "px",
        width: 2 * pointRadius + "px",
        borderRadius: "50%",
        display: "inline-block",
        position: "absolute",
        left: pointLeft - pointRadius + "px",
        top: pointTop - pointRadius + "px"
    }

    let xaxisStyle = {
        width: gridWidth + "px",
        height: axisThickness + "px",
        position: "absolute",
        left: "0",
        top: yToTop(0) + "px"
    }

    let yaxisStyle = {
        width: axisThickness + "px",
        height: gridHeight + "px",
        position: "absolute",
        left: xToLeft(0) + "px",
        top: "0"
    }


    function handlePointMouseDown(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = (e2) => elementDrag(e2);
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }


    function elementDrag(e) {
        e.preventDefault();

        let nextLeft = e.target.offsetLeft
        let nextTop = e.target.offsetTop
        if (!e.target.offsetParent) {
            closeDragElement()
            return
        }

        if (e.target.offsetParent.className == 'grid') {
            nextLeft = e.pageX - e.target.offsetParent.offsetLeft
            nextTop = e.pageY - e.target.offsetParent.offsetTop
        } else {
            nextLeft = e.offsetX
            nextTop = e.offsetY
        }

        if (nextLeft < pointRadius) {
            nextLeft = pointRadius
            closeDragElement()
        }
        if (nextLeft > gridWidth - pointRadius) {
            nextLeft = gridWidth - pointRadius
            closeDragElement()
        }
        if (nextTop < pointRadius) {
            nextTop = pointRadius
            closeDragElement()
        }
        if (nextTop > gridHeight - pointRadius) {
            nextTop = gridHeight - pointRadius
            closeDragElement()
        }
        setPointX(leftToX(nextLeft))
        setPointY(topToY(nextTop))
    }

    useEffect(() => {
        setPointLeft(xToLeft(pointX))
        setPointTop(yToTop(pointY))
    }, [pointX, pointY]
    )


    return <div className="slider-2d">
        <div className="grid" style={gridStyle}>
            {includeAxis && <div className="axis x" style={xaxisStyle}></div>}
            {includeAxis && <div className="axis y" style={yaxisStyle}></div>}
            <div className="point" style={pointStyle} onMouseDown={handlePointMouseDown}></div>
        </div>
    </div>
}

export default Slider2D;

