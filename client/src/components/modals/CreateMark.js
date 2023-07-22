import React, { useContext, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import { AppContext } from "../AppContext";
import { createMark } from "../../http/itemAPI";
import MarkMethodOne from "../MarkMethodOne";
import MarkMethodTwo from "../MarkMethodTwo";

const CreateMark = ({show, onHide}) => {
    const { user } = useContext(AppContext);
    const [firstPage, setFirstPage] = useState(true)
    const [marks, setMarks] = useState({parents: 0, friends: 0, myself: 0, classmates: 0, professors: 0})
    const [marksS, setMarksS] = useState({intellect: 50, character: 50, authority: 50, skillful: 50, appearance: 50, confidence: 50})
    const [goals, setGoals] = useState({intellect: 50, character: 50, authority: 50, skillful: 50, appearance: 50, confidence: 50})
    const LScale = [0, 3, 7, 10, 13]
    const DRScale = [0, 44, 59, 74, 100]
    const ResultScale = [1, 2, 3, 4]
    const ResultLingv = ["низкий", "средний", "высокий", "очень высокий"]

    const resultMarkCalc = (mark, scale) => {
        for (let i = 1; i < 5; i++) {
            if (mark <= scale[i])
                return (mark - scale[i-1]) / (scale[i] - scale[i-1]) + ResultScale[i-1]
        }
        return -1
    }

    const addResultMark = (marksSecond) => {
        const res1 = (Object.values(marks).reduce((s, v) => v!=0?s+v:s, 0) / Object.values(marks).reduce((c, v) => v!=0?c+1:c, 0))
        const res2 = ((Object.values(marksSecond).reduce((a, b) => a+b, 0) / 6))

        const resultMark = ((resultMarkCalc(res1, LScale) + resultMarkCalc(res2, DRScale)) / 2)

        const formData = new FormData()
        formData.append('mark', `${resultMark}`)
        formData.append('userId', user.id)
        createMark(formData).then(onHide())

        alert("На данный момент у Вас " + ResultLingv[Math.trunc(resultMark) - 1] + " уровень самооценки")
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} animation={false} scrollable={true} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title >Узнайте текущий уровень самооценки</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{width: "100%"}}>
                    <Form style={{width: "100%"}}>
                        {
                            firstPage
                            ? <MarkMethodOne navFunc={() => setFirstPage(false)} initMarks={marks} addNewMarks={(newMarks) => setMarks(newMarks)}/>
                            : <MarkMethodTwo navFunc={() => setFirstPage(true)} initMarks={marksS} initGoals={goals} addNewMarks={(newMarks) => setMarksS(newMarks)} addNewGoals={(newGoals) => setGoals(newGoals)} addResultMark={(marksSecond) => addResultMark(marksSecond)}/>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateMark;