import React, { useEffect, useState } from "react";

function RangeSlider2D({
    point1X, setPoint1X,
    point1Y, setPoint1Y,
    point2X, setPoint2X,
    point2Y, setPoint2Y,
    ...props
}) {

    let gridWidth = props.gridWidth ? props.gridWidth : 500;
    let gridHeight = props.gridHeight ? props.gridHeight : 500;

    let gridMinX = props.gridMinX ? props.gridMinX : -2.
    let gridMinY = props.gridMinY ? props.gridMinY : -2.
    let gridMaxX = props.gridMaxX ? props.gridMaxX : 2.
    let gridMaxY = props.gridMaxY ? props.gridMaxY : 2.

    let pointRadius = props.pointRadius ? props.pointRadius : 10
    let includeAxis = typeof props.includeAxis == "boolean" ? props.includeAxis : true
    let axisThickness = props.axisThickness ? props.axisThickness : 1

    let [point1Left, setPoint1Left] = useState(xToLeft(point1X))
    let [point1Top, setPoint1Top] = useState(yToTop(point1Y))
    let [point2Left, setPoint2Left] = useState(xToLeft(point2X))
    let [point2Top, setPoint2Top] = useState(yToTop(point2Y))

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

    let point1Style = {
        height: 2 * pointRadius + "px",
        width: 2 * pointRadius + "px",
        borderRadius: "50%",
        display: "inline-block",
        position: "absolute",
        left: point1Left - pointRadius + "px",
        top: point1Top - pointRadius + "px"
    }

    let point2Style = {
        height: 2 * pointRadius + "px",
        width: 2 * pointRadius + "px",
        borderRadius: "50%",
        display: "inline-block",
        position: "absolute",
        left: point2Left - pointRadius + "px",
        top: point2Top - pointRadius + "px"
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

    let boxStyle = {
        width: point2Left - point1Left + "px",
        height: point1Top - point2Top + "px",
        position: "absolute",
        left: point1Left + "px",
        top: point2Top + "px"
    }

    function handlePointMouseDown1(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = (e2) => elementDrag1(e2);
    }

    function handlePointMouseDown2(e) {
        e.preventDefault();
        document.onmouseup = closeDragElement;
        document.onmousemove = (e2) => elementDrag2(e2);
    }


    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function elementDrag1(e) {
        e.preventDefault();

        // calculate the new cursor position:
        // set the element's new position:
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
        if (nextTop < point2Top) {
            nextTop = point2Top
            closeDragElement()
        }
        if (nextLeft > point2Left) {
            nextLeft = point2Left
            closeDragElement()
        }

        setPoint1X(leftToX(nextLeft))
        setPoint1Y(topToY(nextTop))
    }

    useEffect(() => {
        setPoint1Left(xToLeft(point1X))
        setPoint1Top(yToTop(point1Y))
    }, [point1X, point1Y]
    )


    function elementDrag2(e) {
        e.preventDefault();

        // calculate the new cursor position:
        // set the element's new position:
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

        if (nextLeft < 0) {
            nextLeft = 0
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

        if (nextTop > point1Top - pointRadius) {
            nextTop = point1Top - pointRadius
            closeDragElement()
        }
        if (nextLeft < point1Left + pointRadius) {
            nextLeft = point1Left + pointRadius
            closeDragElement()
        }
        setPoint2X(leftToX(nextLeft))
        setPoint2Y(topToY(nextTop))
    }

    useEffect(() => {
        console.log("update point 2", point2X)
        setPoint2Left(xToLeft(point2X))
        setPoint2Top(yToTop(point2Y))
    }, [point2X, point2Y]
    )


    return <div className="range-slider-2d">
        <div className="grid" style={gridStyle}>
            {includeAxis && <div className="axis axis-x" style={xaxisStyle}></div>}
            {includeAxis && <div className="axis axis-y" style={yaxisStyle}></div>}
            <div className="box" style={boxStyle}></div>
            <div className="point point-1" style={point1Style} onMouseDown={handlePointMouseDown1}></div>
            <div className="point point-2" style={point2Style} onMouseDown={handlePointMouseDown2}></div>
        </div>
    </div>
}

export default RangeSlider2D;

