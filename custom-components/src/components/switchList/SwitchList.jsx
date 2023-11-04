import React, { useEffect, useState } from "react";

function SelectList({
    items,
    isSelected, setIsSelected
}) {

    function onSelectChange(index) {
        const nextIsSelected = [...isSelected]
        nextIsSelected[index] = !nextIsSelected[index]
        setIsSelected(nextIsSelected)
    }

    function renderList() {
        return items.map((x, i) => {
            let selectClass;
            if (isSelected[i]) {
                selectClass = 'checked'
            } else {
                selectClass = 'unchecked'
            }
            return { item: x, selectClass: selectClass };
        }).map((obj, i) => {
            return <button key={i} className={obj.selectClass} onClick={() => onSelectChange(i)}>{obj.item}</button>
        });
    }
    return <ul className="select-list">
        {renderList()}
    </ul>
}



function SwitchList({
    leftList, setLeftList,
    rightList, setRightList
}) {
    const [leftSelected, setLeftSelected] = useState([])
    const [rightSelected, setRightSelected] = useState([])

    useEffect(
        () => {
            setLeftSelected(Array(leftList.length).fill(false))
        },
        [leftList]
    )

    useEffect(
        () => {
            setRightSelected(Array(rightList.length).fill(false))
        },
        [rightList]
    )

    function handelToRight() {
        let selectedLeft = leftList.filter((v, i) => leftSelected[i]);
        let remainingLeft = leftList.filter((v, i) => !leftSelected[i]);
        let nextRightList = [...rightList].concat(selectedLeft)
        setLeftList(remainingLeft)
        setRightList(nextRightList)
    }

    function handelToLeft() {
        let selectedRight = rightList.filter((v, i) => rightSelected[i]);
        let remainingRight = rightList.filter((v, i) => !rightSelected[i]);
        let nextLeftList = [...leftList].concat(selectedRight)
        setRightList(remainingRight)
        setLeftList(nextLeftList)
    }

    return (
        <div className="switch-list">
            <div className="left-column">
                <SelectList items={leftList} isSelected={leftSelected} setIsSelected={setLeftSelected} />
            </div>
            <div className="control-column">
                <button onClick={handelToRight}>{'>'}</button>
                <button onClick={handelToLeft} >{'<'}</button>
            </div>
            <div className="right-column">
                <SelectList items={rightList} isSelected={rightSelected} setIsSelected={setRightSelected} />
            </div>
        </div>
    )
}

export default SwitchList;