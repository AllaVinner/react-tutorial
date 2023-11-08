import SwitchList from '../SwitchList'
import React, {useState } from "react";
import './styles.css'

function App() {
    const [leftList, setLeftList] = useState([1, 2, 3]);
    const [rightList, setRightList] = useState(['a', 'b', 'c']);

    return (
        <div className="app">
            <SwitchList
                leftList={leftList} setLeftList={setLeftList}
                rightList={rightList} setRightList={setRightList}
            />
        </div>
    );
}

export default App;