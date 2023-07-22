import React, {useState} from 'react';
import { Button, Container } from "react-bootstrap";

import MethodOneField from "./MethodOneField";


const MarkMethodOne = ({navFunc, initMarks, addNewMarks}) => {
    const [marks, setMarks] = useState({parents: initMarks.parents, friends: initMarks.friends, myself: initMarks.myself, classmates: initMarks.classmates, professors: initMarks.professors})
    const next = () => {
        navFunc()
        addNewMarks(marks)
        console.log(marks)
    }
    return (
        <Container>
            <div>
                <p style={{marginBottom: "4px"}}>Представьте, что существует лестница из тринадцати ступеней. Где первая ступень - низшая, а тринадцатая - высшая.</p>
                <p style={{marginBottom: "4px"}}>Ниже приведен список лиц, предполжите, на какую ступень каждое из них поставило бы Вас.</p>
                <p style={{marginBottom: "20px"}}>Если какие-то из строк не являются для Вас актуальными, просто оставьте номер ступени равным нулю.</p>
            </div>
            <MethodOneField mark={marks.parents} addMarkValue={(mark) => setMarks({...marks, parents: mark})} title={"Родители"}/>
            <MethodOneField mark={marks.friends} addMarkValue={(mark) => setMarks({...marks, friends: mark})} title={"Друзья"}/>
            <MethodOneField mark={marks.myself} addMarkValue={(mark) => setMarks({...marks, myself: mark})} title={"Я"}/>
            <MethodOneField mark={marks.classmates} addMarkValue={(mark) => setMarks({...marks, classmates: mark})} title={"Одногруппники"}/>
            <MethodOneField mark={marks.professors} addMarkValue={(mark) => setMarks({...marks, professors: mark})} title={"Преподаватели"}/>
            <Button style={{float: "right"}} onClick={next}>Далее</Button>
        </Container>
    );
};

export default MarkMethodOne;